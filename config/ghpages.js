var fs = require('fs');
var path = require('path');

var ghpages = {
    deleteMapsFromListOfFiles: function (files, folder) {
        files.forEach(function (file) {
            var fullFile = path.join(process.cwd(), folder, file);
            var isFolder = fs.lstatSync(fullFile).isDirectory();
            if (!isFolder && file.endsWith('.map')) {
                fs.unlinkSync(fullFile);
            }
        }.bind(this));
        files = files.filter(function (file) {
            return !file.endsWith('.map');
        });
        return files;
    },
    ensureEmptyReturn: function (data) {
        if (!data.endsWith('\n')) {
            data = data + '\n';
        }
        return data;
    },
    remapReferences: function (files, folder) {
        files.forEach(function (file) {
            var isCSS = file.endsWith('.css');
            var isJS = file.endsWith('.js');
            var isHTML = file.endsWith('.html');

            var fullFile = path.join(process.cwd(), folder, file);

            if (isCSS || isJS || isHTML) {
                var data = fs.readFileSync(fullFile);
                data = data.toString();
                if (isCSS) {
                    data = data.split('url(/static/').join('url(../');
                } else if (isHTML) {
                    data = data.split('=/').join('=');
                }
                data = this.ensureEmptyReturn(data);
                fs.writeFileSync(fullFile, data);
            }
        }.bind(this));
    },
    cleanCSSFolder: function () {
        var folder = './dist/static/css';
        var cssFolderContents = fs.readdirSync(folder);
        cssFolderContents = this.deleteMapsFromListOfFiles(cssFolderContents, folder);
        this.remapReferences(cssFolderContents, folder);
    },
    cleanJSFolder: function () {
        var folder = './dist/static/js';
        var jsFolderContents = fs.readdirSync(folder);
        jsFolderContents = this.deleteMapsFromListOfFiles(jsFolderContents, folder);
        this.remapReferences(jsFolderContents, folder);
    },
    cleanIndexHTML: function () {
        var folder = './dist/';
        var files = ['index.html'];

        this.remapReferences(files, folder);
    },
    start: function () {
        this.cleanJSFolder();
        this.cleanCSSFolder();
        this.cleanIndexHTML();
    }
};

ghpages.start();
