//APP.JS IST DER MAIN ENTRY POINT ZU EINER APP

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// adding routers
var indexRouter = require('./routes/0_index.js');
var tourRouter = require('./routes/1_tour');
var addTourRouter = require('./routes/1_1_tour_add.js');
var successRouter = require('./routes/1_2_2_success.js');
var deleteRouter = require('./routes/1_2_3_delete.js');
var detailsRouter = require('./routes/1_2_tour_details.js');
var editRouter = require('./routes/1_3_tour_edit.js');
var kontaktRouter = require('./routes/2_kontakt.js');
var searchRouter = require('./routes/3_search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//adding custom routes
app.use('/', indexRouter);
app.use('/tour', tourRouter);
app.use('/tour/add', addTourRouter);  
app.use('/tour/add/details', detailsRouter);
app.use('/tour/add/details/success', successRouter);
app.use('/tour/edit', editRouter);
app.use('/tour/edit/delete', deleteRouter);
app.use('/contact', kontaktRouter);
app.use('/search', searchRouter);

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

