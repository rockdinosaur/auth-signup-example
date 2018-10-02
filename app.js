var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm", { useNewUrlParser: true })
const db = mongoose.connection;

// mongo connection error
db.on('error', err => console.warn('Connection error:', err))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Bookworm app listening on port ${port}`);
});
