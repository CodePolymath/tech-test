var fs = require('fs');

exports.getAll = function(req, res) {
    directory = req.params.directory;
    var arrURL = req.url.split('/');
    var appending = false;
    for (var i = 0, l = arrURL.length; i < l; i++){ // if there are more subdirectories, attempt to append them to the local directory
        if (arrURL[i] === directory){
            appending = true;
            continue;
        }
        if (appending === true){
            directory = directory + '/' + arrURL[i];
        }
    }
    var files;
    try {
        files = fs.readdirSync(directory);
    } catch (err) {
        res.send('No such directory. Please try again');
        return;
    }
    var arrFiles = [];
    for (var i in files){
        if (!files.hasOwnProperty(i)){
            continue;
        }
        var name = directory + '/' + files[i];
        if (!fs.statSync(name).isDirectory()){
            arrFiles.push(files[i]);
        }
    }
    res.send(arrFiles);
};
