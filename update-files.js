var fs = require('fs-extra');

fs.removeSync('./index.html');
fs.removeSync('./static');

var options = {
    overwrite: true
};

fs.moveSync('./dist/index.html', './index.html', options);
fs.moveSync('./dist/static', './static', options);
