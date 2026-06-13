const crypto = require('crypto');
const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const multer = require('multer');

const jsonData = require('../../server/jdata');

const execFileAsync = promisify(execFile);
const DATA_ROOT = path.dirname(path.resolve(process.env.DATA_FILE || path.join(__dirname, '../../data/data.json')));
const RINGTONE_ROOT = path.join(DATA_ROOT, 'ringtones');
const SUPPORTED_TYPES = new Map([
    ['wideband', { extension: '.rwb', listFile: 'Ringlist-wb.xml', ffmpegFormat: 's16le', sampleRate: '16000', duration: '10.05' }],
    ['narrowband', { extension: '.raw', listFile: 'Ringlist.xml', ffmpegFormat: 'mulaw', sampleRate: '8000', duration: '2.01' }],
]);
const DIRECT_EXTENSIONS = new Set(['.rwb', '.raw']);
const CONVERTIBLE_EXTENSIONS = new Set(['.aac', '.flac', '.m4a', '.mp3', '.oga', '.ogg', '.opus', '.wav', '.webm']);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});

function requireLogin(req, res) {
    if (req.session.loggedIn === true) return true;
    res.status(401).json({ code: 1, message: 'Not logged in' });
    return false;
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function xmlEscape(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function safeName(value, maxLength = 25) {
    return String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9._ -]/g, '')
        .replace(/\s+/g, ' ')
        .slice(0, maxLength);
}

function isConvertibleExtension(extension) {
    return CONVERTIBLE_EXTENSIONS.has(extension);
}

function tempName(extension) {
    return path.join(os.tmpdir(), `cpm-ring-${crypto.randomUUID()}${extension}`);
}

async function convertRingtone(inputFile, outputFile, typeConfig) {
    await execFileAsync('ffmpeg', [
        '-hide_banner',
        '-loglevel', 'error',
        '-y',
        '-i', inputFile,
        '-map', '0:a:0',
        '-vn',
        '-ac', '1',
        '-ar', typeConfig.sampleRate,
        '-af', `apad=pad_dur=${typeConfig.duration},atrim=0:${typeConfig.duration}`,
        '-f', typeConfig.ffmpegFormat,
        outputFile,
    ], { timeout: 30000 });
}

function getRingtones(data) {
    if (!Array.isArray(data.ringtones)) data.ringtones = [];
    return data.ringtones;
}

function visibleRingtones() {
    return getRingtones(jsonData.get())
        .filter((ringtone) => ringtone.available !== false && ringtone.fileName && SUPPORTED_TYPES.has(ringtone.type));
}

function buildRingListXml(type) {
    const items = visibleRingtones()
        .filter((ringtone) => ringtone.type === type)
        .map((ringtone) => {
            return `  <Ring>\n    <DisplayName>${xmlEscape(ringtone.displayName)}</DisplayName>\n    <FileName>${xmlEscape(ringtone.fileName)}</FileName>\n  </Ring>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="utf-8"?>\n<CiscoIPPhoneRingList>\n${items}${items ? '\n' : ''}</CiscoIPPhoneRingList>\n`;
}

function publicRingtone(ringtone) {
    const typeConfig = SUPPORTED_TYPES.get(ringtone.type);
    return {
        uuid: ringtone.uuid,
        name: ringtone.name,
        displayName: ringtone.displayName,
        type: ringtone.type,
        listFile: typeConfig?.listFile,
        fileName: ringtone.fileName,
        fileUrl: `/${ringtone.fileName}`,
        originalFileName: ringtone.originalFileName,
        convertedFrom: ringtone.convertedFrom,
        createdAt: ringtone.createdAt,
        createdBy: ringtone.createdBy,
        available: ringtone.available !== false,
    };
}

module.exports = function (app) {
    app.get('/Ringlist-wb.xml', (req, res) => {
        res.type('application/xml').send(buildRingListXml('wideband'));
    });

    app.get('/Ringlist.xml', (req, res) => {
        res.type('application/xml').send(buildRingListXml('narrowband'));
    });

    app.get('/DistinctiveRingList.xml', (req, res) => {
        res.type('application/xml').send(buildRingListXml('narrowband'));
    });

    app.get(/^\/([a-zA-Z0-9._-]+\.(?:rwb|raw))$/, (req, res, next) => {
        const filename = path.basename(req.params[0]);
        res.sendFile(filename, { root: RINGTONE_ROOT }, (err) => {
            if (err) next();
        });
    });

    app.get('/api/ringtones', (req, res) => {
        if (!requireLogin(req, res)) return;
        res.json({
            code: 0,
            ringtones: visibleRingtones().map(publicRingtone),
        });
    });

    app.post('/api/ringtones', upload.single('ringtone'), async (req, res) => {
        if (!requireLogin(req, res)) return;

        const type = req.body.type || 'wideband';
        const typeConfig = SUPPORTED_TYPES.get(type);
        const file = req.file;
        const name = safeName(req.body.name) || 'Custom Ring';
        const originalExtension = path.extname(file?.originalname || '').toLowerCase();

        if (!typeConfig) {
            res.status(400).json({ code: 2, message: 'Unsupported ringtone type.' });
            return;
        }

        if (!file) {
            res.status(400).json({ code: 3, message: 'Ringtone file is required.' });
            return;
        }

        if (!DIRECT_EXTENSIONS.has(originalExtension) && !isConvertibleExtension(originalExtension)) {
            res.status(400).json({ code: 4, message: 'Upload a Cisco ringtone file or a common audio file such as WAV, MP3, FLAC, OGG, M4A, or WebM.' });
            return;
        }

        const uuid = crypto.randomUUID();
        const fileName = `ring-${uuid.slice(0, 12)}${typeConfig.extension}`;
        const targetFile = path.join(RINGTONE_ROOT, fileName);

        ensureDir(RINGTONE_ROOT);

        if (originalExtension === typeConfig.extension) {
            fs.writeFileSync(targetFile, file.buffer);
        } else if (DIRECT_EXTENSIONS.has(originalExtension)) {
            res.status(400).json({ code: 5, message: `A ${originalExtension} file cannot be used for ${type} ringtones. Select the matching phone family or upload common audio to convert.` });
            return;
        } else {
            const tempInput = tempName(originalExtension);
            try {
                fs.writeFileSync(tempInput, file.buffer);
                await convertRingtone(tempInput, targetFile, typeConfig);
            } catch (error) {
                if (fs.existsSync(targetFile)) fs.unlinkSync(targetFile);
                res.status(400).json({ code: 6, message: `Could not convert audio with ffmpeg: ${error.stderr || error.message}` });
                return;
            } finally {
                if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
            }
        }

        const data = jsonData.get();
        const ringtones = getRingtones(data);
        const entry = {
            uuid,
            name: req.body.name || name,
            displayName: name,
            type,
            fileName,
            originalFileName: file.originalname,
            convertedFrom: originalExtension === typeConfig.extension ? null : originalExtension.slice(1),
            createdBy: req.session.a_username || 'unknown',
            createdAt: new Date().toISOString(),
            available: true,
        };
        ringtones.push(entry);
        jsonData.save(data);

        res.json({ code: 0, ringtone: publicRingtone(entry) });
    });

    app.delete('/api/ringtones/:uuid', (req, res) => {
        if (!requireLogin(req, res)) return;

        const data = jsonData.get();
        const ringtones = getRingtones(data);
        const index = ringtones.findIndex((ringtone) => ringtone.uuid === req.params.uuid);

        if (index === -1) {
            res.status(404).json({ code: 5, message: 'Ringtone not found.' });
            return;
        }

        const ringtone = ringtones[index];
        ringtones.splice(index, 1);
        jsonData.save(data);

        if (ringtone.fileName) {
            const filePath = path.join(RINGTONE_ROOT, path.basename(ringtone.fileName));
            if (filePath.startsWith(RINGTONE_ROOT) && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.json({ code: 0 });
    });
};
