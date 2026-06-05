const portada = document.getElementById("portada");
const timerBar = document.getElementById('temp');
const inputPeli = document.getElementById("InputPeli");
const btnPeli = document.getElementById("BtnPeli");
const salida = document.getElementById("Exit"); //declaracion global

const discore = document.getElementById("score"); 
let score = 0;

let peliculaData = [];
let duracion = 20000;

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
  "Joker",
  "Se7en",
  "Whiplash",
  "The Prestige",
  "Django Unchained",
  "The Departed",
  "Parasite",
  "Alien",
  "Aliens",
  "Predator",
  "Terminator 2",
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

function fetchPelicula() {
  const peliElegida = elegirPelicula();

  fetch(`https://www.omdbapi.com/?apikey=a22fb87a&t=${peliElegida}`)
    .then(response => response.json())
    .then(data => {
        peliculaData = data;
        mostrarPortada(peliculaData);
    });
}

function mostrarPortada(info) {
    portada.style.backgroundImage = `url(${info.Poster})`;
}

function elegirPelicula() {
  if (listaPeliculas.length === 0) return null;
  
  const indiceAleatorio = Math.floor(Math.random() * listaPeliculas.length);
  const posicionElegida = listaPeliculas[indiceAleatorio];

  listaPeliculas.splice(indiceAleatorio, 1); 
  return posicionElegida;
}

let timerTimeout;

function iniciarTimer() {

  timerBar.style.animation = 'none';
  timerBar.offsetHeight;
  timerBar.style.animation = `crecer ${duracion}ms linear forwards`;
  
  clearTimeout(timerTimeout);

  timerTimeout = setTimeout(() => {
    tiempoAgotado();
  }, duracion);
}

function tiempoAgotado() {
  siguientePelicula();
}

function siguientePelicula() {
  inputPeli.value = "";
  fetchPelicula();
  iniciarTimer();
}

function verificarRespuesta() {
  const respuestaUsuario = inputPeli.value.trim().toLowerCase();
  const respuestaCorrecta = peliculaData.Title.toLowerCase();

  if (respuestaUsuario === respuestaCorrecta) {

    score++;
    discore.textContent = score;

    clearTimeout(timerTimeout);
    siguientePelicula();
  } else {
    alert("Respuesta incorrecta. ¡Sigue intentando!");
  }
}

btnPeli.addEventListener("click", verificarRespuesta);

inputPeli.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    verificarRespuesta();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  siguientePelicula();
});
