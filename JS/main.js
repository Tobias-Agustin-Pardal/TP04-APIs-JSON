
const portadaIMG = document.getElementById("portadaIMG");
const timerBar = document.getElementById('temp');
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

const pixel = document.querySelector(".pixel")

const blackscreen = document.getElementById("blackscreen")


let peliElegida;

let peliculaData = [];
let   duracion = 10000;
const apikey = "3020f1e3";

let ronda = 0;
let errorCout =0;

let timerTimeout;
let pista1Timeout;
let pista2Timeout;
let pista3Timeout;

let inputs;

let palabraActual;


function fetchPelicula() {
  peliElegida = elegirPelicula();
  palabraActual = peliElegida;
  dibujarTitulo(palabraActual);
  if (!peliElegida) {
    alert("No quedan más películas.");
    return;
  }
  fetch(`https://www.omdbapi.com/?apikey=${apikey}&t=${peliElegida}`)
    .then(response => response.json())
    .then(data => {
      peliculaData = data;
      mostrarportadaIMG(peliculaData);
      crearPistas(peliculaData);
    });
}

// CREACION DE SLOTS PARA LETRAS DE PALABRA
function dibujarTitulo(palabra){

  const contenedor = document.querySelector(".wordle-row");
  contenedor.innerHTML = "";

  for(const caracter of palabra){
    if(caracter === " "){

      const espacio = document.createElement("div");
      espacio.classList.add("espacio");

      contenedor.appendChild(espacio);

    }else{
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      contenedor.appendChild(input);
      input.style.animation="aparecerCajas 0.5s ease-in-out"
    }
  }

  inputs = document.querySelectorAll(".wordle-row input");

  function comprobarPalabra(){
    const palabraIngresada = Array.from(inputs)
      .map(input => input.value)
      .join("")
      .toUpperCase();

    const palabraCorrecta = palabra
      .replaceAll(" ", "")
      .toUpperCase();

    if(palabraIngresada === palabraCorrecta){
      console.log("¡Correcto!");


      inputs.forEach(input => {
        input.classList.remove("vacio");
        input.classList.add("correcta");
      });
    }
    else{
      console.log("Incorrecto");

      inputs.forEach((input) => {
        input.classList.remove("vacio");
        input.classList.add("incorrecta");

      });
      
    }

  }

  inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

      input.value = input.value.toUpperCase();

      const vacias = Array.from(inputs)
        .filter(i => i.value === "").length;

      if(vacias > 0){

        inputs.forEach(i => {
          i.classList.remove("incorrecta");
          i.classList.remove("correcta");
          i.classList.add("vacio");
        });

      }
      
      if(input.value && index < inputs.length - 1){
        inputs[index + 1].focus();
      }

      // Comprobar cuando todas las casillas estén llenas
      if(Array.from(inputs).every(i => i.value !== "")){
        comprobarPalabra();
      }
    });

    input.addEventListener("keydown", (e) => {

      if(e.key === "Backspace" && !input.value && index > 0){
        inputs[index - 1].focus();
      }

    });

  });

  if(inputs.length > 0){
    inputs[0].focus();
  }
}
//CREACION DE SLOTS PARA LETRAS DE PALABRA (fin)

// REVELO LA PELICULA ( REMPLAZO LOS INPUTS.VALUE POR LA LETRA QUE CORRESPONDE SEGUN "palabraCorrecta")
function revelarPelicula(palabra) {
    pixel.style.visibility="collapse";
    portadaIMG.style.filter="blur(0px)"
    iniciarTimer(5000);
    const palabraCorrecta = palabra
      .replaceAll(" ", "")
      .toUpperCase();
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.value = palabraCorrecta[index] || "";

        input.classList.remove("vacio", "incorrecta");
        input.classList.add("correcta");
      }, index * 100);
    });
    setTimeout(() => {
      siguientePelicula();
    }, 5000);
  }


function iniciarTimer(tiempo) {

  timerBar.style.animation = 'none';
  timerBar.offsetHeight;

  timerBar.style.animation =`crecer ${tiempo}ms linear forwards`;
  clearTimeout(tiempo);

  timerTimeout = setTimeout(() => {
    tiempoAgotado();
  }, tiempo);
}


function crearPistas (pista){
  actPuntos(score)
  let tempGenero = pista.Genre;
  let tempTipo = pista.Type;
  let tempDesc = pista.Plot;
  genre.classList.remove("PistaAbierto")
  genre.classList.add("PistaCerrado")
  type.classList.remove("PistaAbierto")
  type.classList.add("PistaCerrado")
  desc.classList.remove("PistaAbierto")
  desc.classList.add("PistaCerrado")

  genre.textContent = "";
  type.textContent = "";
  desc.textContent = "";

  clearTimeout(pista1Timeout);
  clearTimeout(pista2Timeout);
  clearTimeout(pista3Timeout);

  pista1Timeout = setTimeout(() => {
    
    genre.textContent = traducirGenero(tempGenero);
    genre.classList.add("PistaAbierto")
    genre.classList.remove("PistaCerrado")
    
    score=score - 20
    actPuntos(score)
  }, duracion * 0.40);

  pista2Timeout = setTimeout(() => {

    type.textContent = traducirTipo(tempTipo);
    type.classList.add("PistaAbierto")
    type.classList.remove("PistaCerrado")
    score=score - 20
    actPuntos(score)
  }, duracion * 0.60);

  pista3Timeout = setTimeout(() => {
    desc.textContent = traducirDesc(peliElegida,descripciones);
    desc.classList.add("PistaAbierto")
    desc.classList.remove("PistaCerrado")
    cambiarReloj();
    score=score - 35
    actPuntos(score)
    
  }, duracion * 0.80);
  
}


function mostrarSkip (){
  btnSkip.style.visibility="visible";
  btnSkip.addEventListener('click', function(){
    revelarPelicula(peliElegida);
  })
}

//-------------- TRADUCCIONES ---------------

function traducirDesc(nombrePelicula, diccionarioPelis) {
  let clave = nombrePelicula;
  return diccionarioPelis[clave] || "Película no encontrada en el diccionario.";
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

//-------------- TRADUCCIONES ---------------


function tiempoAgotado() {
  siguientePelicula();
}

function mostrarportadaIMG(info) {
    portadaIMG.src = info.Poster;
}

function elegirPelicula() {
  if (listaPeliculas.length === 0) return null;
  
  const indiceAleatorio = Math.floor(Math.random() * listaPeliculas.length);
  const posicionElegida = listaPeliculas[indiceAleatorio];

  listaPeliculas.splice(indiceAleatorio, 1); 
  return posicionElegida;
}

async function siguientePelicula() {
  pixel.style.visibility="visible";
  portadaIMG.style.filter="blur(8px)"
  btnSkip.classList.add="visible"
  actPuntosTotales()
  await animTransicion();
  await animacionCompl();
  fetchPelicula();
  iniciarTimer(duracion);
  mostrarSkip()
  
}


function actPuntos(puntos){
  contPuntos.innerHTML="Puntos: "+puntos
}

function actPuntosTotales(){
  totalScore=totalScore + score
  score=100

}

function verificarRespuesta() {
  const respuestaCorrecta = peliElegida.toLowerCase();
  if(respuestaUsuario===respuestaCorrecta){
    console.log("Pelicula correcta")
    siguientePelicula()
  }
}
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
  blackscreen.style.visibility="visible"
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
  blackscreen.style.visibility="collapse"
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


/*
    box.style.animation = "entrarBox 0.8s ease-out forwards";

    if (config.anim) {
        setTimeout(() => {
            span.style.animation = `${config.anim} 0.8s ease-in-out infinite`;
        }, 300);
    }
    
 
    setTimeout(() => {
        box.style.animation = "salirBox 0.8s ease-in forwards";
        setTimeout(() => box.remove(), 800);
    }, duration);
*/