const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const jsonData = require('../../server/jdata');

const DATA_ROOT = path.dirname(path.resolve(process.env.DATA_FILE || path.join(__dirname, '../../data/data.json')));
const BACKGROUND_ROOT = path.join(DATA_ROOT, 'backgrounds');
const DEFAULT_RESOLUTION = '800x480x24';
const SUPPORTED_RESOLUTIONS = new Set([
    '320x196x4',
    '320x212x16',
    '320x212x12',
    '320x216x16',
    '240x320x24',
    '800x480x24',
    '640x480x24',
    '272x480x24',
]);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            cb(new Error('Only PNG and JPEG images are supported.'));
            return;
        }
        cb(null, true);
    }
});

function requireLogin(req, res) {
    if (req.session.loggedIn === true) return true;
    res.status(401).json({ code: 1, message: 'Not logged in' });
    return false;
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function safeName(value) {
    return String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9._ -]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 48);
}

function extensionFor(file) {
    return file.mimetype === 'image/jpeg' ? '.jpg' : '.png';
}

function getBackgrounds(data) {
    if (!Array.isArray(data.backgrounds)) data.backgrounds = [];
    return data.backgrounds;
}

function visibleBackgrounds() {
    return getBackgrounds(jsonData.get())
        .filter((bg) => bg.available !== false && bg.resolution && bg.imageFile);
}

function buildListXml(resolution) {
    const items = visibleBackgrounds()
        .filter((bg) => bg.resolution === resolution)
        .map((bg) => {
            const image = `/Desktops/${resolution}/${bg.imageFile}`;
            const thumbnail = `/Desktops/${resolution}/${bg.thumbnailFile || bg.imageFile}`;
            return `  <ImageItem Image="${thumbnail}" URL="${image}"/>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="utf-8"?>\n<CiscoIPPhoneImageList>\n${items}${items ? '\n' : ''}</CiscoIPPhoneImageList>\n`;
}

function publicBackground(bg) {
    return {
        uuid: bg.uuid,
        name: bg.name,
        resolution: bg.resolution,
        imageUrl: `/Desktops/${bg.resolution}/${bg.imageFile}`,
        thumbnailUrl: `/Desktops/${bg.resolution}/${bg.thumbnailFile || bg.imageFile}`,
        createdAt: bg.createdAt,
        createdBy: bg.createdBy,
        available: bg.available !== false,
    };
}

module.exports = function (app) {
    /*
    The list of available background images is specified in a file called List.xml in a 
    Desktops/WIDTHxHEIGHTxDEPTH directory that the phone downloads from the provisioning server.

    Model 	                    Type 	    Width 	Height 	Depth 	Preview Width 	Preview Height 	Directory
    7941, 7961, 7942, 7962 	    Greyscale 	320 	196 	4 	        80 	            53 	        Desktops/320x196x4
    7945, 7965 	                Color 	    320 	212 	16 	        80 	            53 	        Desktops/320x212x16
    7970, 7971 	                Color 	    320 	212 	12 	        80 	            53 	        Desktops/320x212x12
    7975 	                    Color 	    320 	216 	16 	        80 	            53 	        Desktops/320x216x16
    8821 	                    Color 	    240 	320 	24 	        117 	        117 	    Desktops/240x320x24
    8841,8845,8851,8861,8865    Color 	    800 	480 	24 	        139 	        109 	    Desktops/800x480x24
    8941, 8945 	                Color 	    640 	480 	24 	        123 	        111 	    Desktops/800x480x24
    8800 BEKEM 	                Color 	    272 	480 	24 	        139 	        109 	    Desktops/272x480x24
    8851/8861 BEKEM, 8865 BEKEM Color 	    320 	480 	24 	        139 	        109 	    Desktops/320x480x24
    8861, 9951, 9971 	        Color 	    640 	480 	24 	        123 	        111 	    Desktops/640x480x24

    Source: UseCallManager.nz
    */


    //GET path to match Desktops/(number)x(number)x(number)/List.xml
    app.get('/Desktops/:resparams/List.xml', (req, res, next) => {
        const resolutionSplit = req.params.resparams.split('x');
        const width = resolutionSplit[0];
        const height = resolutionSplit[1];
        const depth = resolutionSplit[2];
        const resolution = `${width}x${height}x${depth}`;

        //Check if the resolution is valid
        if (width && height && depth && SUPPORTED_RESOLUTIONS.has(resolution)) {
            res.type('application/xml').send(buildListXml(resolution));
        } else {
            // Invalid Parameters
            next();
        }
        
    });

    app.get('/Desktops/:resparams/:filename', (req, res, next) => {
        const resolution = req.params.resparams;
        const filename = path.basename(req.params.filename);

        if (!SUPPORTED_RESOLUTIONS.has(resolution)) {
            next();
            return;
        }

        const root = path.join(BACKGROUND_ROOT, resolution);
        res.sendFile(filename, { root }, (err) => {
            if (err) next();
        });
    });

    app.get('/api/backgrounds', (req, res) => {
        if (!requireLogin(req, res)) return;
        res.json({
            code: 0,
            backgrounds: visibleBackgrounds().map(publicBackground),
        });
    });

    app.post('/api/backgrounds', upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ]), (req, res) => {
        if (!requireLogin(req, res)) return;

        const image = req.files?.image?.[0];
        const thumbnail = req.files?.thumbnail?.[0];
        const resolution = req.body.resolution || DEFAULT_RESOLUTION;
        const name = safeName(req.body.name) || 'Wallpaper';

        if (!SUPPORTED_RESOLUTIONS.has(resolution)) {
            res.status(400).json({ code: 2, message: 'Unsupported wallpaper resolution.' });
            return;
        }

        if (!image) {
            res.status(400).json({ code: 3, message: 'Wallpaper image is required.' });
            return;
        }

        const uuid = crypto.randomUUID();
        const targetDir = path.join(BACKGROUND_ROOT, resolution);
        const thumbnailDir = path.join(targetDir, 'thumbnails');
        const prefix = `${uuid}-${name}`;
        const imageFile = `${prefix}${extensionFor(image)}`;
        const thumbnailFile = thumbnail ? `thumbnails/${prefix}${extensionFor(thumbnail)}` : imageFile;

        ensureDir(targetDir);
        ensureDir(thumbnailDir);
        fs.writeFileSync(path.join(targetDir, imageFile), image.buffer);
        if (thumbnail) {
            fs.writeFileSync(path.join(targetDir, thumbnailFile), thumbnail.buffer);
        }

        const data = jsonData.get();
        const backgrounds = getBackgrounds(data);
        const entry = {
            uuid,
            name: req.body.name || name,
            createdBy: req.session.a_username || 'unknown',
            createdAt: new Date().toISOString(),
            filePrefix: prefix,
            imageFile,
            thumbnailFile,
            resolution,
            available: true,
        };
        backgrounds.push(entry);
        jsonData.save(data);

        res.json({ code: 0, background: publicBackground(entry) });
    });

    app.delete('/api/backgrounds/:uuid', (req, res) => {
        if (!requireLogin(req, res)) return;

        const data = jsonData.get();
        const backgrounds = getBackgrounds(data);
        const index = backgrounds.findIndex((bg) => bg.uuid === req.params.uuid);

        if (index === -1) {
            res.status(404).json({ code: 4, message: 'Wallpaper not found.' });
            return;
        }

        const bg = backgrounds[index];
        backgrounds.splice(index, 1);
        jsonData.save(data);

        for (const filename of [bg.imageFile, bg.thumbnailFile]) {
            if (!filename) continue;
            const filePath = path.join(BACKGROUND_ROOT, bg.resolution || DEFAULT_RESOLUTION, filename);
            if (filePath.startsWith(BACKGROUND_ROOT) && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.json({ code: 0 });
    });
}
