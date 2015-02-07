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

exports.getAll = function(req, res) {
    var filterBy = req.query.filter;
    var groupBy = req.query.group;

    var strSQL = 'SELECT id, username, email, gender, age, city, state FROM tech_test.users';
    if (typeof filterBy !== 'undefined' && filterBy !== null){
        var splitFilter = filterBy.split('|');
        var filterCol = splitFilter[0];
        var filterVal = splitFilter[1];
        strSQL = strSQL + ' WHERE ' + filterCol.toLowerCase() + ' = "' + filterVal + '"';
    }

    if (typeof groupBy !== 'undefined' && groupBy !== null){
        strSQL = strSQL + ' GROUP BY ' + groupBy.toLowerCase();
    }

    connection.query(strSQL, function(err, rows){
        if (rows.length === 0) { // no matching data
            res.status(401);
            res.send('No matching records found. Please try again');
            return;
        }
        res.send(rows);
    });
};

exports.createUser = function(req, res) {
    var user = {};

    if (req.body && Object.keys(req.body).length > 1){ // data passed as POST payload
        user.userName = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.city = req.body.city;
        user.state = req.body.state;
        user.gender = req.body.gender;
        user.age = req.body.age;
    } else { // data passed as querystring (via Postman)
        user.userName = req.query.username;
        user.password = req.query.password;
        user.email = req.query.email;
        user.city = req.query.city;
        user.state = req.query.state;
        user.gender = req.query.gender;
        user.age = req.query.age;
    }
    for (prop in user) {
        if (typeof user[prop] === 'undefined' || user[prop] === null){
            res.status(401);
            res.send('ERROR: Please specify a ' + prop);
            return;
        }
    }
    user.salt = crypto.randomBytes(16).toString('base64'); // get a random per-user salt
    user.hash = hash(user.password, user.salt); // hash the user password

    var strSQL = 'INSERT INTO tech_test.users (username, email, password, salt, city, state, gender, age) VALUES ("' + user.userName + '","' + user.email + '","' + user.hash + '","' + user.salt + '","' + user.city + '","' + user.state + '","' + user.gender + '",' + user.age + ')';

    connection.query(strSQL, function(err, rows){
        if (!err){
            res.send(rows);
        } else {
            res.status(401);
            res.send('There was a problem creating a new user. Please try again');
        }
    });
};
