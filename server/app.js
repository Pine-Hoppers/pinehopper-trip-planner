const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;

// LOGGING MIDDLEWARE
app.use(morgan('dev'));

// BODY PARSING MIDDLEWARE
app.use(express.json());

// AUTH AND API ROUTES
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// STATIC FILE SERVING MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// SENDS INDEX.HTML
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// ERROR HANDLING ENDWARE
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
