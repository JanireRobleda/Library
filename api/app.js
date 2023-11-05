var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); //CORS es un protocolo para que si la petición no está al mismo nivel, que no sea aceptado.
const mongodb = require('mongodb'); ///+
const bcrypt = require("bcrypt"); ///+

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let libros = require('./routes/libros');
let bibliotecas = require('./routes/bibliotecas');
let catbiblios = require('./routes/catbiblios');
let usuarios = require('./routes/usuarios');
let prestamos = require('./routes/prestamos');
let prestamosHist = require('./routes/prestamosHist');
let loginAdmin = require('./routes/loginAdmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/libros', libros); //es como localhost:3000/libros, y dentro de libros js, si tenemos /post, será lo mismo que localhost:3000/libros/post
app.use('/bibliotecas', bibliotecas); ///+
app.use('/catbiblios', catbiblios); 
app.use('/usuarios', usuarios);
app.use('/prestamos', prestamos);
app.use('/prestamosHist', prestamosHist);
app.use('/loginAdmin', loginAdmin);

let MongoClient = mongodb.MongoClient; //MongoClient tiene la capacidad de conectarse a una base de datos (como un cliente)
let db;
MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) { //Le decimos cuál es la dirección del servidor de la base de datos a la que se tiene que conectar.
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db('redbiblios');
    }
});

// app.listen(3000); //ahora va a ser 9000 (lo hemos cambiado en api>bin>www)

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
