const { Client } = require('ssh2');

module.exports = function (app) {
    async function executeProvisioningCommand(combinations) {
        let results = [];
        const promises = combinations.map(([username, password, host]) =>
        runCommand(username, password, host)
            .then((result) => results.push({ host, success: true, result: "CCAPI Report OK ######################"}))
            .catch((error) => results.push({ host, success: false, error: error.message }))
        );
        await Promise.all(promises);
        return results;
    }

    async function runCommand(username, password, host) {
        return new Promise((resolve, reject) => {
            const conn = new Client();

            conn.on('ready', () => {
                console.log('SSH connection established to the phone.');

                conn.shell((err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    let commandIndex = 0;
                    const commands = ['debug', 'debug', 'debug', 'reset soft'];

                    function sendCommand() {
                        if (commandIndex >= commands.length) {
                            // All commands executed
                            conn.end();
                            resolve(true);
                            return;
                        }

                        const command = commands[commandIndex];
                        console.log(`Executing command: ${command}`);
                        stream.write(`${command}\n`);

                        commandIndex++;
                        setTimeout(sendCommand, 1000);
                        // Delay 1 second or else it literally wont ever work
                    }

                    stream
                        .on('close', () => {
                            console.log('SSH connection closed.');
                            conn.end();
                            resolve(true);
                        })
                        .on('data', (data) => {
                            console.log(`Received: ${data}`);
                        })
                        .stderr.on('data', (data) => {
                            console.error(`Received error: ${data}`);
                            reject(new Error(data));
                        });

                    sendCommand();
                });
            });

            conn.on('error', (err) => {
                console.error('SSH connection error:', err);
                reject(err);
            });

            conn.connect({
                host: host,
                port: 22,
                username,
                password,
                algorithms: {
                    cipher: ['aes128-cbc', 'aes256-cbc']
                }
            });
        });
    }

    app.post('/api/remoteReprovision', async (req, res) => {
        if (!req.session.loggedIn) {
            res.status(403).send('<!DOCTYPE html><style>* {font-family: sans-serif;}</style><h1>403 Forbidden</h1><p>You do not have permission to access this page.<br>Please log in with an authorized account to continue your action.</p><hr>');
            return;
        }

        console.log("Remote reprovision session started.");

        const secret = process.env.SHARED_DEVICE_SECRET;
        const ips = req.body.ips;

        let sendData = [];

        for (let i = 0; i < ips.length; i++) {
            sendData.push([secret, secret, ips[i]]);
        }

        try {
            const results = await executeProvisioningCommand(sendData);
            res.json({code: 0, results: results});
        } catch (err) {
            console.error(err);
            res.status(200).send({code: 1, error: err.message});
        }
    });
}