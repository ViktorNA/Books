const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const router = express.Router();
const port = process.env.PORT || 5000;
const compression = require("compression");
var expressStaticGzip = require("express-static-gzip");
app.use('/', expressStaticGzip(path.join(__dirname, 'dist'), {
  enableBrotli: true
}))

app.use(session({secret: 'abc'}));

app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./router.js')(passport);
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
