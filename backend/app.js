var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require('cors');
var multer = require("multer");
var path = require("path");

let fileName = "";
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./upload");
    },
    filename: function (req, file, callback) {
        fileName = "dummy.txt";
        callback(null, fileName);
    }
});



var upload = multer({
    storage: Storage
}).array("file", 3); //Field name and max count

app.get('/', function (req, res) {
    res.send('home');
})

app.post("/upload", function (req, res) {
    // console.log("file upload", req);

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        fs.readFile('upload/dummy.txt', 'utf8', function (err, data) {
            if (err) throw err;
            console.log(data);
            return res.send(data);
        });


    })
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});