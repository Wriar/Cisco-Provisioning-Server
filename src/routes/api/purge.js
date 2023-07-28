module.exports = function(app) {
    
    /**
     * When the JSON data is externally modified, the local file data may not match what the server is reading.
     * In most cases, modifying operations should automatically sync then purge the environmental purge data.
     * However, if purge is not successful, this endpoint can be called with GET bearer of 'secret' to force a purge.
     * 
     * Sample: http://localhost:6970/purge?secret=secret
     * 
     * @param {string} secret The secret to purge the cache. Can be changed in .env file.
     */
    app.get('/purge', (req, res) => {
        const secret = req.query.secret;

        if (secret === process.env.PURGE_SECRET) {
            const jdata = require('../../server/jdata');
            jdata.forcePurge();
            res.json({code: 0, message: "Global Cache Purged"});
        } else {
            res.json({code: 1, error: "Invalid secret"});
        }
    });
}