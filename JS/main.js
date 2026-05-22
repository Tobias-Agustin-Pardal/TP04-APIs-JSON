const portada= document.getElementById("portada")
let peliculaData = [];
const listaPeliculas = [
  "Batman",
  "Better Call Saul",
  "Hellraiser",
  "Inception",
  "The Matrix",
  "Interstellar",
  "Gladiator",
  "Titanic",
  "Avatar",
  "The Godfather",
  "Pulp Fiction",
  "Fight Club",
  "The Dark Knight",
  "Forrest Gump",
  "The Shawshank Redemption",
  "Joker",
  "The Silence of the Lambs",
  "Se7en",
  "Whiplash",
  "The Prestige",
  "Django Unchained",
  "The Departed",
  "Parasite",
  "Alien",
  "Aliens",
  "Predator",
  "Terminator 2: Judgment Day",
  "Back to the Future",
  "Jurassic Park",
  "The Lion King",
  "Toy Story",
  "Finding Nemo",
  "Shrek",
  "Mad Max: Fury Road",
  "John Wick",
  "The Avengers",
  "Iron Man",
  "Doctor Strange",
  "Spider-Man",
  "Logan",
  "Deadpool",
  "The Conjuring",
  "Insidious",
  "Hereditary",
  "Midsommar",
  "It",
  "Scream",
  "Halloween",
  "A Nightmare on Elm Street",
  "The Exorcist",
  "Saw",
  "Blade Runner",
  "Blade Runner 2049",
  "Arrival",
  "The Green Mile",
  "Cast Away",
  "Goodfellas",
  "Casino",
  "Scarface",
  "Heat",
  "a silent place"
];


fetch (`https://www.omdbapi.com/?apikey=a22fb87a&t=${listaPeliculas[getRandomInt(0, listaPeliculas.length-1)]}`)
    .then(response => response.json())
    .then(data => {
        peliculaData = data;
        mostrarPortada(peliculaData);
    });


function mostrarPortada(info){
    portada.style.backgroundImage=`url(${info.Poster})`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}