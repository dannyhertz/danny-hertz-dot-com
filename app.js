var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Rdio = require("node-rdio");

var RDIO_USER_KEY = process.env.RDIO_USER_KEY,
    RDIO_KEY = process.env.RDIO_API_KEY,
    RDIO_SECRET = process.env.RDIO_API_SECRET;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var rdioInstance;
function getRdioAPI() {
  if (!rdioInstance) {
    rdioInstance = new Rdio([RDIO_KEY, RDIO_SECRET]);
  }
  return rdioInstance;
}

app.get('/latest_played.json', function(req, res) {
  console.log('wtf is going on!', RDIO_USER_KEY, RDIO_KEY);
  getRdioAPI().call('get',
    {
      'keys': RDIO_USER_KEY,
      'extras': 'lastSongPlayed, lastSongPlayTime'
    },
    function(err, data) {
      var dannyUser, latestSong, latestSongTime;

      if (data && data.status && data.status === 'ok') {
        dannyUser = data.result[RDIO_USER_KEY];
        latestSong = dannyUser['lastSongPlayed'];
        latestSong.playedAt = dannyUser['lastSongPlayTime'];
        res.send(latestSong);
      } else {
        res.send(null);
      }
  });
});

app.get('/', function (req, res) {
    res.render('index', { title: 'Danny Hertz Dot Com'});
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler: will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler: no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;
