const portada = document.getElementById("portada");
const timerBar = document.getElementById('temp');
const inputPeli = document.getElementById("InputPeli");
const btnPeli = document.getElementById("BtnPeli");
const salida = document.getElementById("Exit");

const genre = document.getElementById("genere");
const type = document.getElementById("type");
const desc = document.getElementById("desc");

const discore = document.getElementById("score"); 
let score = 0;

const popCorn = document.getElementById("logoAnim")
const animScreen= document.getElementById("animScreen")
const btnSkip= document.querySelector(".btnSkip")

let peliculaData = [];
let duracion = 70000;
const apikey = "3020f1e3";

let ronda = 0;
let errorCout =0;

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
  "Dark",
  "The Godfather",
  "Pulp Fiction",
  "Fight Club",
  "Bleach",
  "The Dark Knight",
  "Forrest Gump",
  "Joker",
  "Chernobyl",
  "Se7en",
  "Whiplash",
  "Dragon Ball Z",
  "The Prestige",
  "Django Unchained",
  "Naruto",
  "The Departed",
  "Erased",
  "Parasite",
  "Squid Game",
  "Alien",
  "Aliens",
  "Predator",
  "Terminator 2",
  "Ben 10",
  "Back to the Future",
  "Jurassic Park",
  "The Lion King",
  "Toy Story",
  "Stranger Things",
  "Finding Nemo",
  "Shrek",
  "Mad Max: Fury Road",
  "John Wick",
  "The Avengers",
  "Iron Man",
  "Doctor Strange",
  "Spider-Man",
  "Re: Zero",
  "Logan",
  "Deadpool",
  "Teletubbies",
  "The Conjuring",
  "Insidious",
  "Hereditary",
  "Steven Universe",
  "Midsommar",
  "It",
  "Scream",
  "Halloween",
  "The Exorcist",
  "Saw",
  "Regular Show",
  "Blade Runner",
  "Blade Runner 2049",
  "Arrival",
  "The Green Mile",
  "Cast Away",
  "Goodfellas",
  "Casino",
  "Power Rangers",
  "Scarface",
  "Heat",
  "a silent place"
];

function fetchPelicula() {
  const peliElegida = elegirPelicula();

  if (!peliElegida) {
    alert("No quedan más películas.");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apikey}&t=${peliElegida}`)
    .then(response => response.json())
    .then(data => {

      peliculaData = data;

      mostrarPortada(data);

      genre.textContent = "";
      type.textContent = "";
      desc.textContent = "";

      clearTimeout(pista1Timeout);
      clearTimeout(pista2Timeout);
      clearTimeout(pista3Timeout);

      pista1Timeout = setTimeout(() => {
        genre.textContent = data.Genre;
      }, duracion / 4.50);

      pista2Timeout = setTimeout(() => {
        type.textContent = data.Type;
      }, duracion / 2.50);

      pista3Timeout = setTimeout(() => {
        desc.textContent = data.Plot;
      }, duracion * 0.85);

    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function iniciarTimer() {

  timerBar.style.animation = 'none';
  timerBar.offsetHeight;

  timerBar.style.animation =
    `crecer ${duracion}ms linear forwards`;

  clearTimeout(timerTimeout);

  timerTimeout = setTimeout(() => {
    tiempoAgotado();
  }, duracion);
}

function tiempoAgotado() {
  siguientePelicula();
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

let pista1Timeout;
let pista2Timeout;
let pista3Timeout;

async function siguientePelicula() {

  inputPeli.value = "";

  await animTransicion();

  fetchPelicula();

  iniciarTimer();

  await animacionCompl();
}

function verificarRespuesta() {
  const respuestaUsuario = inputPeli.value.trim().toLowerCase();
  const respuestaCorrecta = peliculaData.Title.toLowerCase();
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


function esperarAnimacion(elemento) {
  return new Promise(resolve => {
    elemento.addEventListener("animationend", resolve, { once: true });
  });
}

function esperarSkip(btn) {
  return new Promise(resolve => {
    btn.addEventListener("click", resolve, { once: true });
  });
}


async function animTransicion() {
  popCorn.classList.remove('salida-logoAnim');
  animScreen.classList.remove("salida-fondo")
  popCorn.src="../img/popframe.gif"
  animScreen.style.visibility = "visible";
  animScreen.classList.add("entrada-fondo")
  popCorn.classList.add('entrada-logoAnim');
  await esperarAnimacion(popCorn);
}

async function animacionCompl() {
  
  popCorn.src="../img/1f37f-test reverse.gif?v=0";
  popCorn.classList.remove('entrada-logoAnim'); 
  animScreen.classList.remove("entrada-fondo")
  popCorn.classList.add('salida-logoAnim'); 
  await esperarAnimacion(popCorn);
  animScreen.classList.add("salida-fondo")
}