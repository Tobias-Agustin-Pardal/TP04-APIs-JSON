const portada = document.getElementById("portada");
const timerBar = document.getElementById('temp');
const inputPeli = document.getElementById("InputPeli");
const btnPeli = document.getElementById("BtnPeli");
const salida = document.getElementById("Exit"); //declaracion global

const discore = document.getElementById("score"); 
let score = 0;

const popCorn = document.getElementById("logoAnim")
const animScreen= document.getElementById("animScreen")
const btnSkip= document.querySelector(".btnSkip")

let peliculaData = [];
let duracion = 6000;

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

async function siguientePelicula() {
  await esperarSkip(btnSkip);
  await animTransicion();
  await esperarSkip(btnSkip);
  await animacionCompl();
  inputPeli.value = "";
  //fetchPelicula();
  iniciarTimer();
  
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
  