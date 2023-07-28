module.exports = function(app) {
    app.get('/dashboard', (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        res.render('dashboard', {
            username: req.session.a_username,
            createdAt: req.session.a_createdAt,
            createdBy: req.session.a_createdBy,
            lastLogin: req.session.a_lastLogin,
            peEnabled: req.session.a_peEnabled,
            permissions: req.session.a_permissions
            
        });
        
    });

    app.get('/dashboard/devices', (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        const data = require('../../server/jdata');
        const cache = data.get();

        //console.log("The current data cache is: " + JSON.stringify(cache.devices));
        

        res.render('devices', {
            username: req.session.a_username,
            createdAt: req.session.a_createdAt,
            createdBy: req.session.a_createdBy,
            lastLogin: req.session.a_lastLogin,
            peEnabled: req.session.a_peEnabled,
            permissions: req.session.a_permissions,
            devices: cache.devices
        });
    });

    app.get('/dashboard/resources', (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        res.render('resources', {
            username: req.session.a_username,
            createdAt: req.session.a_createdAt,
            createdBy: req.session.a_createdBy,
            lastLogin: req.session.a_lastLogin,
            peEnabled: req.session.a_peEnabled,
            permissions: req.session.a_permissions,
        });

    });

    app.get('/dashboard/action', (req, res) => {
        if (!req.session.loggedIn) {
            res.status(403).send('<!DOCTYPE html><style>* {font-family: sans-serif;}</style><h1>403 Forbidden</h1><p>You do not have permission to access this page.<br>Please log in with an authorized account to continue your action.</p><hr>');
            return;
        }
        res.render('actionPopup');
    });

    app.get('/dashboard/addDevice', (req, res) => {
        if (!req.session.loggedIn) {
            res.status(403).send('<!DOCTYPE html><style>* {font-family: sans-serif;}</style><h1>403 Forbidden</h1><p>You do not have permission to access this page.<br>Please log in with an authorized account to continue your action.</p><hr>');
            return;
        }
        res.render('addDevicePopup');
    });

    app.get('/dashboard/remoteProvision', (req, res) => {
        if (!req.session.loggedIn) {
            res.status(403).send('<!DOCTYPE html><style>* {font-family: sans-serif;}</style><h1>403 Forbidden</h1><p>You do not have permission to access this page.<br>Please log in with an authorized account to continue your action.</p><hr>');
            return;
        }
        res.render('rmtProvision');
    });
}

