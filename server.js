const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const router = express.Router();
const port = process.env.PORT || 5000;
const compression = require("compression");

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) return false;
  return compression.filter(req, res);
}
app.use(express.static(path.join(__dirname, 'dist')));
app.use(compression({
  level: 9,               // set compression level from 1 to 9 (6 by default)
  filter: shouldCompress, // set predicate to determine whether to compress
}));

app.get('*bundle.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(session({secret: 'abc'}));

app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./router.js')(passport);
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
