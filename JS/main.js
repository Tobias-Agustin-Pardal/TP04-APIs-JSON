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
let   duracion = 5000;
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
      mostrarPortada(peliculaData);
      crearPistas(peliculaData);
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

function crearPistas (pista){
  
  let tempGenero = pista.Genre;
  let tempTipo = pista.Type;
  let tempDesc = pista.Plot;

  genre.textContent = "";
  type.textContent = "";
  desc.textContent = "";

  clearTimeout(pista1Timeout);
  clearTimeout(pista2Timeout);
  clearTimeout(pista3Timeout);

  pista1Timeout = setTimeout(() => {
    
    genre.textContent = traducirGenero(tempGenero);
  }, duracion * 0.40);

  pista2Timeout = setTimeout(() => {
    type.textContent = tempTipo;
  }, duracion * 0.60);

  pista3Timeout = setTimeout(() => {
    desc.textContent = tempDesc;
  }, duracion * 0.80);
}

function traducirGenero(pista){
  const diccionario = {
    "action": "Acción",
    "romance": "Romance",
    "terror": "Terror",
    "horror": "Horror",
    "suspense": "Suspenso",
    "drama": "Drama",
    "thriller": "Thriller",
    "comedy": "Comedia",
    "adventure": "Aventura",
    "animation": "Animación",
    "fantasy": "Fantasía",
    "science_fiction": "Ciencia ficción",
    "sci_fi": "Ciencia ficción",
    "mystery": "Misterio",
    "crime": "Crimen",
    "detective": "Detectives",
    "war": "Bélico",
    "western": "Western",
    "historical": "Histórico",
    "biography": "Biografía",
    "documentary": "Documental",
    "family": "Familiar",
    "musical": "Musical",
    "music": "Música",
    "sport": "Deportes",
    "superhero": "Superhéroes",
    "supernatural": "Sobrenatural",
    "psychological": "Psicológico",
    "dystopian": "Distópico",
    "post_apocalyptic": "Postapocalíptico",
    "apocalyptic": "Apocalíptico",
    "survival": "Supervivencia",
    "martial_arts": "Artes marciales",
    "spy": "Espionaje",
    "political": "Político",
    "legal": "Judicial",
    "medical": "Médico",
    "military": "Militar",
    "noir": "Noir",
    "coming_of_age": "Crecimiento personal",
    "slice_of_life": "Costumbrista",
    "parody": "Parodia",
    "satire": "Sátira",
    "black_comedy": "Comedia negra",
    "dark_comedy": "Comedia oscura",
    "romantic_comedy": "Comedia romántica",
    "teen": "Juvenil",
    "children": "Infantil",
    "fairy_tale": "Cuento de hadas",
    "mythology": "Mitología",
    "urban_fantasy": "Fantasía urbana",
    "epic": "Épico",
    "disaster": "Desastres",
    "monster": "Monstruos",
    "zombie": "Zombies",
    "vampire": "Vampiros",
    "werewolf": "Hombres lobo",
    "alien": "Extraterrestres",
    "cyberpunk": "Cyberpunk",
    "steampunk": "Steampunk",
    "time_travel": "Viajes en el tiempo",
    "space_opera": "Ópera espacial"
  };

  let resultado = pista
  .split(',')
  .map(elemento => {
    let palabra = elemento.trim().toLowerCase();
    return diccionario[palabra] || palabra; 
  })
  .join(', ');
  
  return resultado;
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
  await animacionCompl();
  
  fetchPelicula();
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
