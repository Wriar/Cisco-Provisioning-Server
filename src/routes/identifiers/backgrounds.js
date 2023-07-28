module.exports = function (app) {
    /*
    The list of available background images is specified in a file called List.xml in a 
    Desktops/WIDTHxHEIGHTxDEPTH directory that the phone downloads from the provisioning server.

    Model 	                    Type 	    Width 	Height 	Depth 	Preview Width 	Preview Height 	Directory
    7941, 7961, 7942, 7962 	    Greyscale 	320 	196 	4 	        80 	            53 	        Desktops/320x196x4
    7945, 7965 	                Color 	    320 	212 	16 	        80 	            53 	        Desktops/320x212x16
    7970, 7971 	                Color 	    320 	212 	12 	        80 	            53 	        Desktops/320x212x12
    7975 	                    Color 	    320 	216 	16 	        80 	            53 	        Desktops/320x216x16
    8821 	                    Color 	    240 	320 	24 	        117 	        117 	    Desktops/240x320x24
    8841,8845,8851,8861,8865    Color 	    800 	480 	24 	        139 	        109 	    Desktops/800x480x24
    8941, 8945 	                Color 	    640 	480 	24 	        123 	        111 	    Desktops/800x480x24
    8800 BEKEM 	                Color 	    272 	480 	24 	        139 	        109 	    Desktops/272x480x24
    8851/8861 BEKEM, 8865 BEKEM Color 	    320 	480 	24 	        139 	        109 	    Desktops/320x480x24
    8861, 9951, 9971 	        Color 	    640 	480 	24 	        123 	        111 	    Desktops/640x480x24

    Source: UseCallManager.nz
    */


    //GET path to match Desktops/(number)x(number)x(number)/List.xml
    app.get('/Desktops/:resparams/List.xml', (req, res, next) => {
        const files = {
            '320-196-4': '320x196x4.xml',
            '320-212-16': '320x212x16.xml',
            '320-212-12': '320x212x12.xml',
            '320-216-16': '320x216x16.xml',
            '240-320-24': '240x320x24.xml',
            '800-480-24': '800x480x24.xml',
            '640-480-24': '640x480x24.xml',
            '272-480-24': '272x480x24.xml',
        };
        const resolutionSplit = req.params.resparams.split('x');
        const width = resolutionSplit[0];
        const height = resolutionSplit[1];
        const depth = resolutionSplit[2];
        const key = `${width}-${height}-${depth}`; // There are better ways to do this but this is good enough for now.
        const fileName = files[key];

        //Check if the resolution is valid
        if (width && height && depth && fileName) {              
            res.sendFile(fileName, { root: './src/data/misc' });
        } else {
            // Invalid Parameters
            next();
        }
        
    });
}