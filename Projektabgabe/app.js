//APP.JS IST DER MAIN ENTRY POINT ZU EINER APP
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// adding routers
//var serverRouter = require('./routes/server');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/0_index');
var testRouter = require('./routes/testRoute.js');
var tourRouter = require('./routes/1_0_tour_route.js'); 
var addTourRouter = require('./routes/1_1_tour_add_route.js');
var detailsRouter = require('./routes/1_2_tour_details_route.js');
var successRouter = require('./routes/1_2_2_success_route.js');
var editRouter = require('./routes/1_3_tour_edit_route.js');
var deleteRouter = require('./routes/1_2_3_delete_route.js');
var contactRouter = require('./routes/2_kontakt_route.js');
var searchRouter = require('./routes/3_search_route.js');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev')); sorgt für Fehler, weil Logger nicht vorhanden
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser()); sorgt ebenfalls für Fehler, weil cookieParser nicht vorhanden (oben vorher schon entfernt)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//adding custom routes
app.use('/', homeRouter); // war vorher serverRoute, habe es zu homeRouter geändert, da man sonst nicht zum Server geleitet würde
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter); 
app.use('/tour', tourRouter); 
app.use('/tour/add', addTourRouter);
app.use('/tour/add/details', detailsRouter);
app.use('/tour/add/details/success', successRouter);
app.use('/tour/edit', editRouter);
app.use('/tour/edit/delete', deleteRouter);
app.use('/contact', contactRouter);
app.use('/search', searchRouter);

//app.use('/server', serverRouter);  


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

