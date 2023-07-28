const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto');
const createLog = require('./server/logger');
const app = express();
const port = 6970; //Do not change this port, it is the default port for Cisco HTTP Provisioning


//Verify data.json is intact (or use custom)
const dataFile = process.env.DATA_FILE || "./src/data/data.json";

//Clear Console
//console.clear();
console.log('\n');
console.log('\x1b[36m%s\x1b[0m', '[SERVER] Starting server...');


dotenv.config();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('*/shared', express.static(path.join(__dirname, 'public')));

//Serve Assets (configuration files, etc)
app.use(express.static(path.join(__dirname, 'data')));

//Recursively load routes from the routes directory O(n) * O(1) = O(n).
function loadRoutes(app, dir) { 
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            loadRoutes(app, filePath); // recursively load routes in subdirectories
        } else if (file.endsWith('.js')) {
            const route = require(filePath);
            if (typeof route === 'function') {
                route(app);
                const relativePath = path.relative(path.join(__dirname, 'routes'), filePath);
                console.log("Routed -> " + relativePath);
                createLog(0, "Routed -> " + relativePath);
            }
        }
    });
}//Tested and working

loadRoutes(app, path.join(__dirname, 'routes'));

//Require Modules
require('./server/auth')(app);
require('./server/rmtReprovision')(app);

//Debugging Modules
if (process.env.IS_DEBUG.toLowerCase() === "true") {
    require('./server/debugdump')(app);
}

try {
    const fc = fs.readFileSync(dataFile, 'utf8');
    JSON.parse(fc);
} catch (ex) {
    console.log('\x1b[31m[FATAL] \x1b[33mFailed to parse datafile structure. Ensure src/data/data.json is not damaged or incorrectly set in .env file.\x1b[0m');
    console.log('\x1b[31m[FATAL] \x1b[33m' + ex.message + '\x1b[0m');
    process.exit(1);
}

//Init Process Variables
process.totalProvisioningRequests = 0;
process.totalProvisioningErrors = 0;


console.log('\x1b[32m%s\x1b[0m', '[OK] Initial Configuration Loaded.');
createLog(1, "Initial Configuration Loaded.");

app.listen(port, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `[SERVER] Server started on port ${port}`);
    createLog(1, "Server started on port " + port);
});

app.get('/', (req, res) => {
    res.send('CPM Server. To Log In, go to /login');
    
});

//404 route
app.use((req, res) => {
    const correlationId = crypto.randomBytes(16).toString('hex');
    res.status(404).send('<!DOCTYPE html><html>404 - Page Not Found <br> Correlation ID: ' + correlationId + "</html>")
});