
const portada = document.getElementById("portada");
const timerBar = document.getElementById('temp');
const inputPeli = document.getElementById("inputPeli");
const btnPeli = document.getElementById("BtnPeli");
const salida = document.getElementById("Exit");
const imgReloj = document.getElementById("reloj");

const contPuntos = document.querySelector(".puntos")

const genre = document.getElementById("genere");
const type = document.getElementById("type");
const desc = document.getElementById("desc");

const discore = document.getElementById("score"); 
let score = 100;
let totalScore = 0;

const popCorn = document.getElementById("logoAnim")
const animScreen= document.getElementById("animScreen")
const btnSkip= document.querySelector(".btnSkip")

const resultado = document.getElementById("resultado")

const peliElegida = elegirPelicula();


let peliculaData = [];
let   duracion = 60000;
const apikey = "3020f1e3";

let ronda = 0;
let errorCout =0;

let timerTimeout;
let pista1Timeout;
let pista2Timeout;
let pista3Timeout;


function fetchPelicula() {
  
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
    score=score - 20
    actPuntos(score)
  }, duracion * 0.40);

  pista2Timeout = setTimeout(() => {

    type.textContent = traducirTipo(tempTipo);
    score=score - 20
    actPuntos(score)
  }, duracion * 0.60);

  pista3Timeout = setTimeout(() => {
    desc.textContent = tempDesc;
    cambiarReloj();
    mostrarSkip()
    score=score - 35
    actPuntos(score)
  }, duracion * 0.80);
  
}


function mostrarSkip (){
  btnSkip.style.visibility="visible"
  btnSkip.addEventListener('click', function(){
    
  })

}

function traducirTipo(pista){
  const diccionario = {
    "movie": "Película",
    "series": "Serie"
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

function traducirGenero(pista){
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

async function siguientePelicula() {
  inputPeli.value = "";
  actPuntosTotales()
  await animTransicion();
  await animacionCompl();
  fetchPelicula();
  iniciarTimer();
}


function actPuntos(puntos){
  contPuntos.innerHTML="Puntos: "+puntos
}

function actPuntosTotales(){
  totalScore=totalScore + score
  score=100

}

function verificarRespuesta() {
  const respuestaUsuario = inputPeli.value.toLowerCase();
  const respuestaCorrecta = peliElegida.toLowerCase();
  if(respuestaUsuario===respuestaCorrecta){
    console.log("Pelicula correcta")
    siguientePelicula()
  }
}

btnPeli.addEventListener("click", verificarRespuesta);

inputPeli.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    verificarRespuesta();
  }
});

function mostrarPuntajeTotal(){
  window.location.href="../PAGES/BienHecho01"
}

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
  btnSkip.style.visibility="collapse"
  popCorn.classList.remove('salida-logoAnim');
  animScreen.classList.remove("salida-fondo")
  popCorn.src="../img/popframe.gif"
  animScreen.style.visibility = "visible";
  animScreen.classList.add("entrada-fondo")
  popCorn.classList.add('entrada-logoAnim');
  await esperarAnimacion(popCorn);
  imgReloj.style.animation="animReloj 1.2s infinite ease-in-out"
  imgReloj.src="../IMG/Reloj.png"
}

async function animacionCompl() {
  popCorn.src="../img/1f37f-test reverse.gif?v=0";
  popCorn.classList.remove('entrada-logoAnim'); 
  animScreen.classList.remove("entrada-fondo")
  popCorn.classList.add('salida-logoAnim'); 
  await esperarAnimacion(popCorn);
  animScreen.classList.add("salida-fondo")

}

function cambiarReloj(){
  imgReloj.src="../IMG/RelojExclamacion.png";
  imgReloj.style.animation="clock-shake 0.15s infinite linear"
}
