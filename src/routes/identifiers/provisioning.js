

/* REGEX to match SEP.cnf.xml file requests (6 groups of 2 hexadecimal characters, followed by .cnf.xml) */
const SEPCNFXML_REGEX = /SEP([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})\.cnf\.xml/;

const jsonData = require('../../server/jdata');
const requestIp = require('request-ip');
const createLog = require('../../server/logger');
const { sep } = require('path');

function isIPInRange(startIP, endIP, targetIP) {
    const ipToNumeric = ip => ip.split('.').reduce((acc, part) => (acc << 8) + parseInt(part), 0);
    const startNumeric = ipToNumeric(startIP);
    const endNumeric = ipToNumeric(endIP);
    const targetNumeric = ipToNumeric(targetIP);
    return targetNumeric >= startNumeric && targetNumeric <= endNumeric;
}



module.exports = function (app) {

    /**
     * Matches all incoming requests to see if a SEP.cnf.xml file is being requested by the device.
     */
    app.get(SEPCNFXML_REGEX, (req, res) => {
        //Get the certain MAC address blocks from the incoming regex groups.
        //const { 0: m_block1, 1: m_block2, 2: m_block3, 3: m_block4, 4: m_block5, 5: m_block6 } = req.params;

        //Combine the MAC address blocks into a single string.
        //const macAddress = (m_block1 + m_block2 + m_block3 + m_block4 + m_block5 + m_block6).toUpperCase();
        const macAddress = Object.values(req.params).slice(0, 6).join('').toUpperCase();

        //Get the requesting IPv4 address. (IPv6 is not supported)
        const ip = requestIp.getClientIp(req).split(':').slice(-1)[0];

        //Load cache (we aren't modifying it) and find the device with the matching MAC address.
        const data = jsonData.get();
        const device = data.devices.find(device => device.mac === macAddress);
        const SEPFileName = device.provisioningFile;

        //Load any provisioning policies from the cache. If phones are assigned static IPs, they can be whitelisted if trustlist is not installed.
        const ipRestricted = device.security.ipRestricted;
        const ipWhitelist = device.security.ipWhitelist;
        let flagAppend = ""; //This will be appended to the end of the log message if the IP is whitelisted.

        if (ipRestricted) {
            //Check if the requesting IP is whitelisted.
            if (!isIPInRange(ipWhitelist[0], ipWhitelist[1], ip) && ip != "127.0.0.1") {
                //The requesting IP is not whitelisted. Send 403 headers to requesting device/phone.
                process.totalProvisioningErrors += 1;
                createLog(1, `Provisioning Request Denied from non-whitelisted IP: ${ip} for MAC: ${macAddress} (${SEPFileName})`);
                console.log(`Provisioning Request Denied from non-whitelisted IP: ${ip} for MAC: ${macAddress} (${SEPFileName})`);
                res.status(403).json({ code: 4, error: "IP not whitelisted", mac: macAddress, ip: ip });
                return;
            }
            flagAppend = `<W-${device.name}>`;
        }



        if (!device) {
            //The Device Doesn't Exist :(
            //Send 404 headers to requesting device/phone.
            process.totalProvisioningErrors += 1;
            res.status(404).json({ code: 1, error: "Device not found", mac: macAddress });
            return;
        }

        //Verify that the device is enabled.
        if (!device.enabled) {
            process.totalProvisioningErrors += 1;
            res.status(404).json({ code: 3, error: "Device not enabled", mac: macAddress });
            return;
        }

        //Locate the XML SEP file in root directory/src/data/config
        res.sendFile(SEPFileName, { root: './src/data/config' }, (err) => {
            if (err) {
                //If the file doesn't exist, send a 404 error to the requesting device/phone.
                process.totalProvisioningErrors += 1;
                res.status(404).json({ code: 2, error: "Provisioning file exists but is not found. Contact System Administrator.", mac: macAddress });
            }
        });

        //Change the last device access time.
        let newJSONData = jsonData.cache || jsonData.get();
        newJSONData.devices.find(device => device.mac === macAddress).lastPing = new Date().toISOString();
        jsonData.save(newJSONData);

        process.totalProvisioningRequests++;
        createLog(1, `${flagAppend} Provisioning Request ${SEPFileName} - ${ip} (${macAddress}) USERAGENT: ${req.headers["user-agent"]}`);

        console.log(`${flagAppend} Received Provisioning Request from ${ip} (${req.headers["user-agent"]}) for ${SEPFileName} - ${device.name}`);

    });
}