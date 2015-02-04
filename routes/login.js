var crypto = require('crypto'),
    mysql = require('mysql');

var connection = mysql.createConnection({ // should be placed in a global config file
    host: 'localhost',
    user: 'sec_user',
    password: 'eKcGZr59zAa2BEWU',
    port: 8889 // TODO: adjust port number to match your MySQL instance
});

connection.query('USE tech_test');

hash = function(pass, salt) { // should be placed in a modular helper function file

    var h = crypto.createHash('sha512'); // overkill? maybe... OR Get a faster server!

    h.update(pass);
    h.update(salt);

    return h.digest('base64');
};

exports.login = function(req, res) {
    var user = {};
    if (req.body){ // data passed as POST payload
        user.userName = req.body.username;
        user.password = req.body.password;
    } else { // data passed as querystring (via Postman)
        user.userName = req.query.username;
        user.password = req.query.password;
    }

    var strSQL = 'SELECT username, salt, password FROM tech_test.users WHERE username = "' + user.userName + '" LIMIT 1';

    connection.query(strSQL, function(err, rows){
        if (rows.length === 0) { // non existant username
            res.status(401);
            res.send('Could not login. Please try again');
            return;
        }
        var row = rows[0]; // just to be clear, we want the first row of data
        user.salt = row.salt;

        var testHash = hash(user.password, row.salt); // get a testable hash using supplied password and mysql stored salt
        if (testHash === row.password) { // authenticated user
            res.send(row);
        } else { // incorrect password
            res.status(401);
            res.send('Could not login. Please try again.');
        }
    });
};
