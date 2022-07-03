const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');
  uuid = require('uuid');

let users = [
  {
    id: 1,
    userName: 'Aishu',
    favoriteMovie: ['Blasted']
  },
  {
    id: 2,
    userName: 'Bipi',
    favoriteMovie: ['Hustle', 'The Man from Toronto']
  }
];

let topMovies =
  [
    {
      name: 'Avatar',
      year: 2009
    },
    {
      name: 'Avengers:Endgame',
      year: 2019
    },
    {
      name: 'Star Wars',
      year: 2015
    },
    {
      name: 'Avengers: Infinity War',
      year: 2018
    },
    {
      name: 'Spider-Man: No Way Home',
      year: 2021
    },
    {
      name: 'Jurassic World',
      year: 2015
    },
    {
      name: 'The Lion King',
      year: 2019
    },
    {
      name: 'Frozen II',
      year: 2019
    },
    {
      name: 'Harry Potter and the Deathly Hallows: Part 2',
      year: 2011
    },
    {
      name: 'Beauty and the Beast',
      year: 2017
    }
  ];

app.use(morgan('common'));

app.get('/', (request, response) => {
  response.send('Welcome to MyFlix');
});
app.get('/topmovies', (request, response) => {
  response.json(topMovies);
});

app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

