var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/** ROUTE REQUIRES **/

var routes = require('./routes/index');
var users = require('./routes/users');
var companies = require('./routes/company-routes/company-routes');
var students = require('./routes/student-routes/student-routes');
var jobs = require('./routes/jobs-routes/jobs-routes');
var applications = require('./routes/application-routes/applications-routes');
var search = require('./routes/search-service/search-routes');
var matching = require('./routes/matching-routes/matching-service');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES **/

app.use('/', routes);
app.use('/users', users);
app.use('/api/companies', companies);
app.use('/api/students', students);
app.use('/api/jobs', jobs);
app.use('/api/applications', applications);
app.use('/api/search', search);
app.use('/api/match', matching);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
