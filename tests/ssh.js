const { Client } = require('ssh2');

//OLD - ALREADY IMPLEMENTED

/**
 * whar???????????????????????????????????????????????/????
 * 
 * idfk what this even does but it works so i'm not touching it
 * 
 * @param {*} username kys
 * @param {*} password kys
 * @param {*} host kys
 * @returns {null} kys
 */
async function runCommands(username, password, host) {
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
                        resolve();
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
                        resolve();
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

// Usage:
runCommands('cisco', 'cisco', '192.168.1.24')
    .then(() => {
        console.log('All commands executed successfully.');
    })
    .catch((err) => {
        console.error('An error occurred:', err);
    });

