
const portada= document.getElementById("portada")
let peliculaData = [];
let posicionElegida = "";
let duracion = '10000'

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

function fetchPelicula (){
  fetch (`https://www.omdbapi.com/?apikey=a22fb87a&t=${elegirPelicula()}`)
    .then(response => response.json())
    .then(data => {
        peliculaData = data;
        mostrarPortada(peliculaData);
    });
}

function mostrarPortada(info){
    portada.style.backgroundImage=`url(${info.Poster})`;
    listaPeliculas
}

function eliminarPeliculaPorPosicion(lista, posicion) {
  lista.splice(posicion, 1); 
  return lista;
}

console.log(listaPeliculas);

function elegirPelicula(){
  const posicionElegida = listaPeliculas[Math.floor(Math.random() * listaPeliculas.length)];
  eliminarPeliculaPorPosicion(listaPeliculas, listaPeliculas.indexOf(posicionElegida));
  return posicionElegida;
}


function iniciarTimer() {
  const timerBar=document.getElementById('temp')

  setTimeout(() => {
  timerBar.style.animation = 'crecer '+duracion+'ms linear forwards';
  setTimeout(() => timerBar.remove(), duracion );
    }, 1);
  
  tiempoAgotado()
}

document.addEventListener("DOMContentLoaded", function(){
  fetchPelicula() //funcion para llamar a la api
  iniciarTimer() //Funcion para inciiar el timer
})
