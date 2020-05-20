var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fs = require('fs');

var logger = require('morgan');
var cors = require('cors');
var app = express();
var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');
// var uploadRouter = require('./routes/upload');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        console.log('file ' + JSON.stringify(file));

        cb(null, "dummy.txt")
    }
})

var upload = multer({ storage: storage }).single('file')

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/upload', uploadRouter);


app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        fs.readFile('upload/dummy.txt', 'utf8', function (err, data) {
            if (err) throw err;
            console.log(data);
            return res.status(200).send(data);
        });


    })

});

module.exports = app;
