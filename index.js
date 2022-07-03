const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
app.use(bodyParser.json());

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
      name: 'The Man from Toronto',
      description: "A case of mistaken identity forced a bumbling entrepreneur to team up with a notorious assassin known as The man from Toronto in hopes of staying alive.",
      genre: {
        name: 'Action',
        definition: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
      },
      director: {
        name: 'Patrick Hughes',
        about: 'Patrick Hughes, born in Australia in 1978, has held various positions in the film business since 2000. Among other things as an editor, screenwriter or producer, initially for short films such as The Director or The Lighter , since 2010 also for the big screen.'
      }
    },
    {
      name: 'Blasted',
      description: "When an Alien invasion interrupts the bachelor party, two childhood friend reunite as the kick-ass laser tag duo they once were to fight back.",
      genre: {
        name: 'Sci-Fi films',
        definition: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies.'
      },
      director: {
        name: 'Martin Sofiedal',
        about: 'Born in Oslo. Film education from the Noroff Institute (2004-05) and Westerdals (2007-10).'
      }
    },
    {
      name: 'Love and Gelato',
      description: "To fulfill her Mother's wish, Lena spends the Summer before College in Rome, where she discovers Romance, adventure and a passion for Gelato",
      genre: {
        name: 'Romantic comedies',
        definition: 'Romantic comedy (also known as romcom or rom-com) is a subgenre of comedy and slice-of-life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.'
      },
      director: {
        name: 'Brandon Camp',
        about: 'Brandon Camp was born in 1971. He is a writer and producer, known for Benji (2018), Love Happens (2009) and Dragonfly (2002).'
      }
    },
    {
      name: 'the Gentlemen',
      description: "Making movies to sell his valuable UK cannabis empire, an American kingpin sets off a series of plots, schemes and barefaced plays for his business",
      genre: {
        name: 'Crime Action',
        definition: 'Crime action films are those that favor violence. According to Jule Selbo, the crime and action genres are intertwined: "the films could not exist in their popular form without the other on equal footing—therefore they are working in tandem". Examples include the Fast & Furious film series.'
      },
      director: {
        name: 'Guy Ritchie',
        about: 'Guy Stuart Ritchie (born 10 September 1968) is an English film director, producer, screenwriter and businessman. His work includes British gangster films, and the Sherlock Holmes films starring Robert Downey Jr.'
      }
    },
    {
      name: 'Spiderhead',
      description: "A person in a state-of-the-art penitentiary begins to question the purpose of the emotion controlling drugs he is testing for a pharmaceutical genius",
      genre: {
        name: 'Thriller',
        definition: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety. Successful examples of thrillers are the films of Alfred Hitchcock.'
      },
      director: {
        name: 'Joseph Kosinski',
        about: 'Joseph Kosinski is an American filmmaker best known for his computer graphics and computer-generated imagery (CGI) work, and for his work in action films. He made his big-screen directorial debut with the 2010 science fiction film Tron: Legacy, the sequel to the 1982 film Tron.'
      }
    },
    {
      name: 'Hustle',
      description: "When a down on his luck basketball scout finds out a potential superstar in Spain, he  sets out to prove they both have what it takes it to make it in the  NBA",
      genre: {
        name: 'Comedies',
        definition: 'the comedy genre definition is one that includes films or shows that make people laugh and have positive endings. Ultimately, comedy makes people laugh'
      },
      director: {
        name: 'Jeremiah Zagar',
        about: 'Jeremiah Zagar is an American filmmaker. He has directed the feature films We the Animals (2018) and Hustle (2022). The former was nominated for five categories at the 34th Independent Spirit Awards. He also directed the 2008 documentary In a Dream, which is about his father Isaiah Zagar.'
      }
    },
    {
      name: 'Interceptor',
      description: "The last officer standing on the remote missile defence base wages the battle of her life again terrorist aiming 16 stolen nuclear weapons at the US.",
      genre: {
        name: 'Action',
        definition: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
      },
      director: {
        name: 'Matthew Reilly',
        about: 'Reilly was born on 2 July 1974 in Sydney, the second son of Ray (an employee at the Department of Corrective Services) and Denise, a mathematics teacher. He grew up with his brother Stephen in Willoughby, an affluent suburb on the lower North Shore of Sydney, New South Wales, Australia.'
      }
    },
    {
      name: 'Afterearth',
      description: "After crash landing on a long abandoned planet Earth, a young boy sets out to find beacon that will save him and his dying father from doom.",
      genre: {
        name: 'Sci-Fi films',
        definition: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies.'
      },
      director: {
        name: 'M. Night Shyamalan',
        about: 'Manoj Nelliyattu "M. Night" Shyamalanborn August 6, 1970 is an American filmmaker, screenwriter and actor. He is best known for making original films with contemporary supernatural plots and twist endings. He was born in Mahé, India, and raised in Penn Valley, Pennsylvania. The cumulative gross of his films exceeds $3.3 billion globally.'
      }
    },
    {
      name: 'The wrath of God',
      description: "Convinced the tragic death of her loved ones were orchestrated by a famous novelist she worked for, Luciana turns to a journalist  to expose the truth",
      genre: {
        name: 'Film based on books',
        definition: 'A film adaptation is the transfer of a work or story, in whole or in part, to a feature film.'
      },
      director: {
        name: 'Sebastián Schindel',
        about: 'Sebastián Schindel is a producer and director, known for The Boss: Anatomy of a Crime (2014), Mundo alas (2009) and Rerum novarum (2001). '
      }
    },
    {
      name: 'Chickenhare and the hamster of darkness',
      description: "A brave young animal explorer teams up with two trusty friends to find a powerful artifact before his greedy uncle can get his paws on it.",
      genre: {
        name: 'Animated movie',
        definition: 'Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency. Being able to bring animals and objects to life, this genre has catered towards fairy tales and children\'s stories.'
      },
      director: {
        name: 'Ben Stassen',
        about: 'Ben Stassen is a Belgian film director, producer, and screenwriter. He is best known for directing and producing several computer-animated films such as A Turtle\'s Tale: Sammy\'s Adventures (2010), Robinson Crusoe (2016), and The Queen\'s Corgi (2019). '
      }
    }
  ];

// app.use(morgan('common'));

app.get('/', (request, response) => {
  response.send('Welcome to MyFlix');
});
//------------------------------All movies to user------------------------------
app.get('/movies', (request, response) => {
  response.status(200).json(topMovies);
});

//---------------------Return data about a single movie by title to the user------------
app.get('/movies/:name', (request, response) => {
  const requestedMovieName = request.params.name;
  const movieName = topMovies.find((movie) => {
    return movie.name == requestedMovieName
  });
  if (movieName) {
    response.status(200).json(movieName);
  }
  else {
    response.status(404).send("Result not Found");
  }
});

//--------Return data about a genre (description) by name/title ----------------
app.get('/movies/genre/:genre', (request, response) => {
  const requestedGenre = request.params.genre;
  const genreName = topMovies.find((movie) => {
    return movie.genre.name == requestedGenre
  }).genre;
  if (genreName) {
    response.status(200).json(genreName.definition);
  }
  else {
    response.status(404).send("Result not Found");
  }
});

//-------------Return data about a director ---------------------------

app.get('/movies/director/:nameofthedirector', (request, response) => {
  const requestedDirectorName = request.params.nameofthedirector;
  const directorName = topMovies.find((movie) => {
    return movie.director.name == requestedDirectorName
  }).director;
  if (directorName) {
    response.status(200).json(directorName.about);
  }
  else {
    response.status(404).send("Result not Found");
  }
});

//---------------------- Allow new users to register -------------------------------------------
app.post('/users', (request, response) => {
  const newUser = request.body
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    response.status(200).json(newUser);
  }
  else {
    response.status(200).json('Please enter the name');
  }
});

//----------------------- Allow users to update their user info (username)----------------
app.put('/users/:id', (request, response) => {
  const requestedId = request.params.id;
  const updatedUser = request.body;
  const user = users.find((user) => {
    return user.id == requestedId
  });
  if (user) {
    user.userName = updatedUser.name;
    response.status(200).json(user);
  }
  else {
    response.status(400).send('No Results');
  }
});

//-------------------------------------Allow users to add a movie to their list of favorites ------

app.post('/users/:username', (request, response) => {
  const requestedUserName = request.params.username;
  const updatedMovieList = request.body;
  const user = users.find((user) => {
    return user.userName == requestedUserName
  });
  if (user) {
    user.favoriteMovie.push(updatedMovieList);
    response.status(200).send(updatedMovieList.favoriteMovie + ' ' + 'has been added to ' + user.userName)
  }
  else {
    response.status(400).send('No Results')

  }
});

//------------------ Allow users to remove a movie from their list of favorites--------

app.delete('/users/:id/:movietitle', (request, response) => {
  const requestedMovieTitle = request.params.movietitle;
  const requestedUserId = request.params.id;
  const user = users.find((user) => {
    return user.id == requestedUserId
  });
  if (user && user.favoriteMovie.includes(requestedMovieTitle)) {
    
    user.favoriteMovie = user.favoriteMovie.filter((title) => title != requestedMovieTitle);
   response.status(200).send(`${requestedMovieTitle} has been removed from ${user.userName}`)
  }
  else {
    response.status(400).send('No Results')

  }
});
//---------- to get all the users ---------------
app.get('/users', (request, response) => {
  response.status(200).json(users);
});

//--------------- Allow existing users to deregister  -------------------------
app.delete('/users/:id', (request, response) => {
  const requestedUserId = request.params.id;
  const user = users.find((user) => {
    return user.id == requestedUserId;
  })
  if (user) {
    const newUser = users.filter((userObj) => userObj.id != requestedUserId);
    users = newUser;
    response.status(200).send(`User with the id ${requestedUserId} has been removed`);
  }
  else {
    response.status(404).send('Search result not found');
  }
});

app.get('/documentation', (request, response) => {                  
  response.sendFile('public/documentation.html', { root: __dirname });
});
app.get('/documentation/style.css', (request, response) => {                  
  response.sendFile('public/style.css', { root: __dirname });
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

