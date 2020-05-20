var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

/* upload file */
// router.post('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
