var express = require('express'),
    home = require('./views/home'),
    login = require('./routes/login'),
    users = require('./routes/users'),
    localFiles = require('./routes/localFiles'),
    bodyParser = require('body-parser'),
    browserify = require('browserify-middleware'),
    health = require('express-ping'),
    templatizer = require('templatizer');

var app = express();

app.set('view engine', 'jade');
app.use('/css', express.static(__dirname + '/public/css')); // allow access to public css files
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

/* cheap and easy healthcheck route */
app.use(health.ping());

/* templatizer converts all .jade based html template files into a executable JavaScript function which can be called in the client */
templatizer(__dirname + '/clienttemplates', __dirname + '/clientapp/templates.js', {namespace: 'app'});

/* browserify allows AMD require() type dependency calls in the client by compiling all related client-side code into a single JavaScript file */
app.get('/app.js', browserify('./clientapp/app.js'));

/* ALL public routes */
app.get('/', home.start); // entrypoint for the app
app.post('/api/createuser', users.createUser);
app.post('/api/login', login.login);
app.get('/api/login', login.login);
app.get('/api/users', users.getAll);
app.get('/api/files/:directory*', localFiles.getAll);
/* END ALL public routes */

app.listen(3000);
console.log('Listening on port 3000...');
