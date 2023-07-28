module.exports = function (app) {

    //#region Log Functions
    app.get('/api/logging', function (req, res) {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });
        res.send(process.logs);
    });

    app.post('/api/logging', function (req, res) {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });
        if (req.body.code && req.body.message) {
            process.logs = process.logs || [];
            process.logs.push({ code: req.body.code, message: req.body.message });
            res.status(200).send({ success: true });
        } else {
            res.status(400).send({ success: false, message: "Invalid request" });
        }
    });

    app.delete('/api/logging', function (req, res) {
        if (req.session.loggedIn !== "true") return res.status(401).send({ code: 1, message: "Not logged in" });
        process.logs = [];
        res.status(200).send({ success: true });
    });
    //#endregion

    app.get('/api/org-statistics', function (req, res) {
        if (req.session.loggedIn !== true) return res.status(401).send({ code: 1, message: "Not logged in" });

        const data = require('../../server/jdata');
        const cache = data.get();

        //Get the number of provisioned endpoints.
        //Cache is JSON. Read the 'accounts' array. Get the number of items where enabled: true
        let provisionedEndpoints = 0;
        let totalDevices = 0;
        const totalProvisioningErrors = process.totalProvisioningErrors ? process.totalProvisioningErrors : 0;
        const totalProvisioningRequests = process.totalProvisioningRequests ? process.totalProvisioningRequests : 0;

        cache.devices.forEach(device => {
            if (device.mac) totalDevices++;
            if (device.enabled === true && device.mac) provisionedEndpoints++;
        });

        res.json({code: 0, message: "Success", provisionedEndpoints: provisionedEndpoints, totalDevices: totalDevices, totalProvisioningErrors: totalProvisioningErrors, totalProvisioningRequests: totalProvisioningRequests});


    });
}