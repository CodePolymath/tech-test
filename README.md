### This is a sample Backbone app using MySQL, Node and Express.

To run it, you must install Node:

http://nodejs.org/download/

You will also need an instance of MySQL running locally:

Windoze: http://dev.mysql.com/downloads/windows/

OS X: http://www.mamp.info/en/downloads/

To start a terminal session of MySQL:

MAMP: Start up a MySQL terminal session:

`/Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot`

MySQL for Windoze: http://dev.mysql.com/doc/refman/5.0/en/windows-start-command-line.html

Then run these scripts to create the db and related table:
```sql
CREATE DATABASE tech_test;

CREATE USER 'sec_user'@'localhost' IDENTIFIED BY 'eKcGZr59zAa2BEWU';
GRANT SELECT, INSERT, UPDATE ON `tech_test`.* TO 'sec_user'@'localhost';

CREATE TABLE `tech_test`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` CHAR(88) NOT NULL,
    `salt` CHAR(24) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `state` CHAR(2) NOT NULL,
    `gender` CHAR(1) NOT NULL,
    `age` INT NOT NULL
) ENGINE = InnoDB;
```

You may have to adjust the port that MySQL is expected to run under in the app. There are TODO: comments next to the MySQL port number in the /routes/users.js and /routes/login.js files.

Once you have installed Node and have MySQL running, you should be able to navigate to the solution's root folder on your local machine via a terminal app.

In that folder in a terminal, type:

`node server`

to start the app.

The app should then be running under:

//localhost:3000

All the required node_modules are included in this repo, but if there are any errors with missing node dependencies, you can try running:

`npm install`

in a terminal app in the root directory of the solution. If that doesn't solve the missing dependency issue, you can delete everything in the /node_modules folder and run `npm install` again. For permission errors, try running `sudo npm install` or `npm install` with admin rights.

### Available endpoints on the API are:

//localhost:3000/api/login

//localhost:3000/api/users

//localhost:3000/api/files/:directory

All endpoints accept POSTed data, or querystring, if you want to test the POST routes with Postman

The "files" endpoint requires a URL parameter listing which sub-folder(s) under the solution root folder to query:

//localhost:3000/api/files/clientapp/models

will list all the JavaScript model files for the app.

The API routes are unsecured, which is regrettable, but I had to wrap things up.

Healthcheck:

//localhost:3000/ping

This URL provides a JSON object with all the app's vital stats.

### Notes on tech stack choices:

<p><b>backbone</b> - used as a display layer JavaScript MVC. It was used because it is very basic and doesn't require too much configy stuff to get an app up and running quickly</p>
<p><b>body-parser</b> - a plugin which allows express.js to "read" POSTed values</p>
<p><b>browserify</b> and <b>browserify-middleware</b> - very powerful plugin, similar to GRUNT. browserify allows all clientside modules to make require()-like dependency calls and reuse libraries included in the Node / Express app</p>
<p><b>crypto-js</b> - no one should EVER store passwords in plain text, ever. crypto-js was used to store individually salted hashes of the users' passwords in the db</p>
<p><b>express</b> - used as the server app to both response to API calls, and act as a entrypoint for the client app, as well as packing all files and dependencies</p>
<p><b>jade</b> - HTML templating</p>
<p><b>jquery</b> - because jQuery</p>
<p><b>ms</b> - dependency for browserify</p>
<p><b>mysql</b> - db solution</p>
<p><b>prepare-response</b> - dependency for browserify</p>
<p><b>templatizer</b> - converts all .jade html template files into executable JavaScript functions for very fast usage in the client (no compiling HTML templates "on the fly")</p>
<p><b>uglify</b> - dependency for browserify to obfuscate code (not implemented)</p>

### Things I skipped:

The user filters are clunky and don't have a GroupBy option in the UI. Just not enough time.
Also, the clientside filtering solution doesn't make a request to the server... backbone is good at filtering on the client, but I DID build the filtering into the server endpoint.
You can use the API endpoint to see filtering and grouping of users:

//localhost:3000/api/users?filter=gender|M&group=state

//localhost:3000/api/users?filter=state|CA

However, I didn't take the time to dynamically Count() the fields in the SQL query if grouping is used, so the results are wonky.

Pagination - not enough time. However, the API would accept query params for offset and number records to return.

API versioning - Not enough time!
