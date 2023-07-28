//Slave Snapin for master-dashboard.js
//This file will not run any code. It must be called from its master file

/**
 * Gets the server logs and sets them into the logs element
 */

let logErrorCount = 0;
let doLogErrorAppend = true;

function getServerLogs(force) {
    if (logErrorCount > 5 && !force) {
        
        //Append error message to log

        if (doLogErrorAppend) document.getElementById('log').value = document.getElementById('log').value + "[LOG] Exceeded max server retry count. Logging has been disabled.\r\n[LOG] To resume logging, select the 'Reload' button.";
        doLogErrorAppend = false;
        return console.log("Too many errors, stopping logging");
    }

    doLogErrorAppend = true;
    try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/logging', true);
        xhr.onload = function () {
            if (this.status === 200) {
                const logs = JSON.parse(this.responseText);
                let logString = "";
                logs.forEach(log => {
                    let code = log.code;
                    //If code is 0, set as debug, if 1, set as info, if 2, set as warning, if 3, set as error
                    if (code === 0) code = "[DEBUG]";
                    if (code === 1) code = "[INFO]";
                    if (code === 2) code = "[WARN]";
                    if (code === 3) code = "[ERROR]";

                    logString += `${code} ${log.message}` + "\r\n";
                });

                //Log is a textarea
                document.getElementById('log').value = logString;
                logErrorCount = 0;

                document.getElementById('log-status').innerText = "Updated at " + new Date().toLocaleTimeString();

                if (force) {
                    createToast(0, "Updated Server Logs!");
                }
            } else {
                createToast(1, "Unable to retrieve server logs.");
                logErrorCount++;
            }
        }
        xhr.send();
    } catch (ex) {
        createToast(1, "Unable to retrieve server logs.");
        logErrorCount++;
        console.log(ex);
    }
}


let logStatus = true;
function startStopLogging() {
    if (logStatus) {
        logStatus = false;
        document.getElementById('btnStartStopLogs').innerHTML = "<i class='icmn-play3'></i> Resume Logging";
        document.getElementById('log-status').innerText = "Paused";
        createToast(1, "Logging has been stopped!");
    } else {
        logStatus = true;
        document.getElementById('btnStartStopLogs').innerHTML = "<i class='icmn-pause2'></i> Pause";
        document.getElementById('log-status').innerText = "Resuming...";
        createToast(0, "Logging has been resumed!");
    }
}

function downloadLogs() {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/logging', true);
        xhr.onload = function () {
            if (this.status === 200) {
                const logs = JSON.parse(this.responseText);
                let logString = "";
                logs.forEach(log => {
                    logString += `${log.code} - ${log.message}\n`;
                });

                download(`CPM-server-logs-${new Date().toISOString()}.txt`, logString);
                createToast(0, "Downloading newest server logs!");
            }
        }
        xhr.send();
    } catch (ex) {
        createToast(1, "Unable to retrieve server logs.");
        logErrorCount++;
        console.log(ex);
    }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
