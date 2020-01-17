require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream')
// const cors = require('cors');

const indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const usersRouter = require('./routes/api/user.router');
const tuutsRouter = require('./routes/api/tuut.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    size: "10M", // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
    compress: "gzip" // compress rotated files
});

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.options('*', cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tuuts', tuutsRouter);

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
