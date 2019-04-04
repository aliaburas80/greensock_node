const fs = require('fs');
const imagesFolder = 'src/public/images/';
const http = require('http')
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
let images = [];
fs.readdir(imagesFolder, (err, files) => {
    files.forEach(file => {
        images.push(file)
    });
    console.log(images);
    openHtmlPage()
});

openHtmlPage = () => {
    app.get('/', function (req, res) {
        res.render('pages/index.ejs', {
            images: images
        });
    });

    app.listen(8080);
}

