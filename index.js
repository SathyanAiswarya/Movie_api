const { response } = require('express');

const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models'),
  Movies = Models.Movie,
  Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app); // auth.js

const passport = require('passport');
require('./passport'); //  import passport

app.use(morgan('common'));

app.get("/", (request, response) => {
  response.send("Welcome to MyFlix");
});

//Return a list of ALL movies to the user
app.get("/movies", (request, response) => {
  Movies.find().then(allMovies => {
    response.json(allMovies);
  });
});

// Update a movie 
app.put("/movies/:Moviename", (request, response) => {
  Movies.findOneAndUpdate(
    {
      Title: request.params.Moviename
    },
    {
      $set:
      {
        ImagePath: request.params.ImagePath,
        Featured: request.params.Featured
      }
    },
    { new: true },
    (err, UpdatedMovie) => {
      if (err) {
        console.log(err);
      }
      else {
        response.json('The requested Movie has been updated.')
      }
    }
  );
});

//Return data about a single movie by title to the user

app.get('/movies/:Moviename', (request, response) => {

  Movies.findOne({ Name: request.params.Moviename })
    .then((movie) => {

      response.json(movie);
    })
    .catch((err) => {
      response.status(404).send("Result not Found", err);
    });

});

//Return data about a genre by name

app.get('/movies/genre/:genre', (request, response) => {
  console.log("abc", request.params.genre)
  Movies.find({ 'Genre.Name': request.params.genre })
    .then((movie) => {
      response.json(movie.Genre);
    })
    .catch((err) => {
      response.status(404).send("Result not Found", err);
    });
});

//Return data about a director
app.get('/movies/director/:director', (request, response) => {
  Movies.find({ 'Director.Name': request.params.director })
    .then((movie) => {
      response.json(movie.Director);
    })
    .catch((err) => {
      response.status(404).send("Result not Found", err);
    });
});

//Allow new users to register


app.post('/users', (request, response) => {
  Users.findOne({ Username: request.params.Username })
    .then((user) => {
      if (user) {
        response.send(`${Username} already exists`);
      }

      else {
        Users.create({
          Username: request.body.Username,
          Email: request.body.Email,
          Password: request.body.Password,
          Birthday: request.body.Birthday
        })
          .then((user) => {
            response.json(user)
          })
          .catch((error) => {

            response.status(404).send('Please try again', error);
          })
      }
    })
    .catch((error) => {
      response.status(404).send('Error: ' + error);
    });
});

//Allow users to update their user info 

app.put('/users/:Username', (request, response) => {
  Users.findOneAndUpdate(
    {
      Username: request.params.Username
    },
    {
      $set:
      {
        Username: request.body.Username,
        Email: request.body.Email,
        Password: request.body.Password,
        Birthday: request.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {

        response.status(404).send("Result not Found", err);
      } else {
        response.json(updatedUser);
      }
    }
  )
});

//Allow users to add a movie to their list of favorites

app.post('/users/:Username/movies/:MovieID', (request, response) => {
  Users.findOneAndUpdate(
    {
      Username: request.params.Username
    },
    {
      $push: { FavoriteMovies: request.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        response.status(404).send("Result not Found");
      } else {
        response.json(updatedUser);
      }
    });
});

//Allow users to remove a movie from their list of favorites

app.delete('/users/:Username/movies/:MovieID', (request, response) => {
  Users.findOneAndRemove(
    {
      Username: request.params.Username
    },
    {
      $pull: { FavoriteMovies: request.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        response.status(404).send("Result not Found");
      } else {
        response.json(updatedUser);
      }
    });
});
//Allow existing users to deregister
app.delete('/users/:Username', (request, response) => {
  Users.findOneAndRemove({ Username: request.params.Username })
    .then((user) => {
      if (!user) {
        response.status(404).send("Result not Found");
      } else {
        response.status(200).send(request.params.Username + ' was deleted.');
      }
    })
    .catch((error) => {
      response.status(404).send('Error: ' + error);
    });
});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

