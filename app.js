var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter  = require("./routes/post")
var apiRouter = require("./routes/api")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'rjhgrjv',
  name: "sessionid",
  resave: false,
  saveUninitialized: true,
  cookie: {
    // true表示https
    // secure: false 
    maxAge: 1000 * 60 * 60
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get(/\/index/, (req, res, next) => {
  if ( !req.session.username ){
      // res.redirect("/login")
  }
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use("/api" , apiRouter )
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect('/login');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
