var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var LastFM = require('lastfm').LastFmNode,
    lastFMTrackParser = require(__dirname + '/lib/lastfm-track-parser');

var LAST_API_KEY = process.env.LAST_API_KEY,
    LAST_API_SECRET = process.env.LAST_API_SECRET,
    LAST_USERNAME = process.env.LAST_USERNAME;

var app = express();
var lastFMClient = new LastFM({
  api_key: LAST_API_KEY,
  secret: LAST_API_SECRET
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon(__dirname + '/public/favicon-32x32.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/latest_played.json', function(req, res) {
  lastFMClient.request('user.getRecentTracks', {
    user: LAST_USERNAME,
    handlers: {
      success: function (data) {
        var latestTrack = lastFMTrackParser.parse(data);
        res.send(latestTrack);
      },
      error: function (error) {
        res.send(null);
      }
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
