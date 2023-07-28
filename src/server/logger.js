/**
 * Logs a message to the local process memory. Used by the web interface.
 * @param {Number} code Integer representing log level (0 = debug, 1 = info, 2 = warning, 3 = error, 4 = fatal)
 * @param {String} message Standard message to be logged
 */
function webLog(code, message) {
    process.logs = process.logs || [];
    process.logs.push({ code: code, message: message });
    return true;
} 

module.exports = webLog;