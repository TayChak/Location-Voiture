var createError = require('http-errors');
var express = require('express');
const cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
const { connectToMongoDb } = require("./config/db"); // Déclaration unique ici
require("dotenv").config();

var carRouter = require("./routes/carRouter");
var usersRouter = require('./routes/usersRouter');
var agenceRouter = require('./routes/agenceRouter');
var clientRouter = require('./routes/clientRouter');
var reservationRouter = require('./routes/reservationRouter');

var app = express();
app.use(cors()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SUPPRIMER cette ligne en double: const { connectToMongoDb } = require("./config/db");

app.use('/users', usersRouter);
app.use("/cars", carRouter);
app.use("/agences",agenceRouter);
app.use("/clients",clientRouter);
app.use("/reservations",reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(process.env.port, () => {
  connectToMongoDb()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
  console.log("app is running on port 50001");
});


