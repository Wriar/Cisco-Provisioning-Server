const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    app.post('/api/exportDataRequest', function(req, res) {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });

        const data = req.body.data;

        let dataToReturn = [];
        let misMatches = 0;
        let notfound = 0;

        const cache = require('../../server/jdata').get();
        const cacheDevices = cache.devices;

        //Parse the data
        data.forEach(function(item) {
            const name = item["Name"];
            const IP = item["IP Address"];
            const MAC = item["MAC Address"];
            const model = item["Model"];
            const extension = item["Extension"];

            //Cache devices is json array of objects. Each object is a device. Try to find the device in the cache.
            //Append each found device to the dataToReturn array.
            let device = cacheDevices.find(device => device.mac === MAC);

            if (device.name != name || device.model != model || device.extension != extension) {
                misMatches++;
                console.log("Mismatched " + JSON.stringify(device));
                console.log(`Name: ${device.name} Expected ${name} \n Model: ${device.model} Expected ${model} \n Extension: ${device.extension} Expected ${extension}`);
                device = null;
            }
            if (device) {
                dataToReturn.push(device);
            } else {
                notfound++;
            }


            

        });

        //Send the data back to the client
        res.status(200).send({ code: 0, message: "Success", mismatch: misMatches, notfound: notfound, data: dataToReturn });
    });

    app.get('/api/getProvisionedDeviceData', function(req, res) {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });

        const deviceUUID = req.query.deviceUUID;
        if (deviceUUID == null) return res.status(400).send({ code: 2, message: "DeviceUUID null or nondecodeable." });


        const serverData = require('../../server/jdata').get();

        //Try to find the device in the "devices" section of the JSON
        const device = serverData.devices.find(device => device.uuid === deviceUUID);

        if (device == null || !device || device == undefined) {
            res.status(404).send({ code: 2, message: "Device UUID not resolved." });
            return;
        }

        const provisioningFile = device.provisioningFile;
        const provisioningFilePath = path.join(__dirname, `../../data/config/${provisioningFile}`);
        //Try to read the provisioning file from __dirname, `../../data/config/PROVISIONINGFILE`

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();

        fs.readFile(provisioningFilePath, function(err, data) {
            if (err) {
                res.status(500).send({ code: 2, message: "Error reading provisioning file." });
                return;
            }

            parser.parseString(data, function(err, result) {
                if (err) {
                    res.status(500).send({ code: 2, message: "Error parsing provisioning file." });
                    return;
                }

                //console.log(result);
                res.status(200).send({ code: 0, message: "Success", config: device, provision: result });
            });
        });

    });
}