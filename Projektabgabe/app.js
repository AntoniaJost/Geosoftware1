//APP.JS IST DER MAIN ENTRY POINT ZU EINER APP

var createError = require('http-errors');
var express = require('express');
var path = require('path');

// adding routers
var serverRouter = require('./routes/server');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/0_index');


/* noch nicht ganz klar über Verwendung...
var tourRouter = require('./public/1_tour.js');
var addTourRouter = require('./public/1_1_tour_add.js');
var successRouter = require('./public/1_2_2_success.js');
var deleteRouter = require('./public/1_2_3_delete.js');
var detailsRouter = require('./public/1_2_tour_details.js');
var editRouter = require('./public/1_3_tour_edit.js');
var kontaktRouter = require('./public/2_kontakt.js');
var searchRouter = require('./public/3_search'); */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev')); sorgt für Fehler, weil Logger nicht vorhanden
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser()); sorgt ebenfalls für Fehler, weil cookieParser nicht vorhanden (oben vorher schon entfernt)
app.use(express.static(path.join(__dirname, 'public')));

//adding custom routes
app.use('/', serverRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);

/* s.o.
app.use('/tour', tourRouter);
app.use('/tour/add', addTourRouter);  
app.use('/tour/add/details', detailsRouter);
app.use('/tour/add/details/success', successRouter);
app.use('/tour/edit', editRouter);
app.use('/tour/edit/delete', deleteRouter);
app.use('/contact', kontaktRouter);
app.use('/search', searchRouter); */

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

