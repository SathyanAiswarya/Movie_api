const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});


app.use (morgan('common'));
