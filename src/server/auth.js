const bcrypt = require('bcrypt');
const argon2 = require('argon2');
require('express-session');

module.exports = function (app) {
    const cacheData = require('./jdata').get();

    app.post('/auth', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        //Verify Username and Password are present
        if (!username || !password) {
            res.status(400).json({ code: 1, error: "Please enter a Username and Password" });
            return;
        }

        //Read Original Data (find accounts -> item with matching username, get password from it)
        const data = cacheData;
        const account = data.accounts.find(account => account.username === username);

        //Check if account exists
        if (!account) {
            res.status(401).json({ code: 2, error: "Incorrect Username or Password" });
            return;
        }

        //Check if account is enabled or not
        if (!account.enabled) {
            res.status(401).json({ code: 2, error: "Account is not enabled. Please contact your system administrator."});
            return;
        }

        //Check if Password Encryption is enabled.
        if (account.peEnabled) {
            const setPasswordHash = account.password;

            //Compare Here
            bcrypt.compare(password, setPasswordHash, (err, result) => {
                if (err) {
                    //Error Comparing Passwords
                    res.status(500).json({ code: 1, error: "Internal Server Error" });
                    return;
                }

                if (!result) {
                    //Passwords Don't Match
                    res.status(401).json({ code: 2, error: "Incorrect Username or Password" });
                    return;
                }

                //Passwords Match   
                //TODO: Do session stuff

                req.session.a_username = username;
                req.session.a_createdAt = account.createdAt;
                req.session.a_createdBy = account.createdBy;
                req.session.a_lastLogin = account.lastLogin;
                req.session.a_peEnabled = account.peEnabled;
                req.session.a_permissions = account.permissions;
                req.session.loggedIn = true;

                

                res.status(200).json({ code: 0, sessionToken: "kys", peStatus: true });
            });
        } else {
            if (password == account.password) {

                //Passwords Match
                //TODO: Do session stuff

                req.session.a_username = username;
                req.session.a_createdAt = account.createdAt;
                req.session.a_createdBy = account.createdBy;
                req.session.a_lastLogin = account.lastLogin;
                req.session.a_peEnabled = account.peEnabled;
                req.session.a_permissions = account.permissions;
                req.session.loggedIn = true;


                res.status(200).json({ code: 0, sessionToken: "kys", peStatus: false })
            } else {
                res.status(401).json({ code: 2, error: "Incorrect Username or Password" });
                return;
            }
        }


    });

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send("Could not log out. Please try again later.");
                return;
            }

            res.redirect('/login');
        });
    });


    //Not Implemented Yet
    async function argon2VerifyPassword(password, hash) {
        try {
            const match = await argon2.verify(hash, password);
            return match;
        } catch (err) {
            // Handle error
        }
    }

    //Not Implemented Yet
    async function argon2HashPassword(password) {
        try {
          const hash = await argon2.hash(password);
          return hash;
        } catch (err) {
          // Handle error
        }
      }
}