var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth_utils = require('./config/auth_utils');
const log4js = require('log4js');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * Enable CORS for all routes
 */
app.use(cors());

/**
 * Enable the use of body parser to get POST params
 */
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* DEFINE route for api web page*/
var indexRouter = require('./routes/index')
const admin_routes = require('./routes/admin/index');
const users_routes = require('./routes/users');
const topics_routes = require('./routes/topics');
const types_routes = require('./routes/types');
const conversations_routes = require('./routes/conversations');
const chat_routes = require('./routes/chatroom');


/**
 * Setup routes
 */
app.use('/', indexRouter);
// app.use('/admin', auth_utils.authorizeHeader, admin_routes);
app.use('/users', auth_utils.authorizeHeader, users_routes);
app.use('/topics', auth_utils.authorizeHeader, topics_routes);
app.use('/types', auth_utils.authorizeHeader, types_routes);
app.use('/chat', auth_utils.authorizeHeader, chat_routes);
// app.use('/conversations', auth_utils.authorizeHeader, conversations_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
