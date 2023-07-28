module.exports = function(app) {
    console.log('\x1b[1m\x1b[33m%s\x1b[0m', '[WARN] Debugging Data Dump is Enabled. Disable this in .env during production.');

    app.get('/debug-dump', (req, res) => {
        if(process.env.IS_DEBUG !== "true") {
            res.json(req.session);
        }
        
    });
}