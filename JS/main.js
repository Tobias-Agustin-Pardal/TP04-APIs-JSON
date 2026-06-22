const portadaIMG = document.getElementById("portadaIMG");
const timerBar = document.getElementById('temp');
const salida = document.getElementById("Exit");
const imgReloj = document.getElementById("reloj");


const contPuntos = document.querySelector(".puntos")

const genre = document.getElementById("genere");
const boxA = document.querySelector(".boxA")
const boxB = document.querySelector(".boxB")
const boxC = document.querySelector(".boxC")
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

const imgGene = document.getElementById("imgGene")
const imgTipo = document.getElementById("imgTipo")
const imgDesc = document.getElementById("imgDesc")

let rondaFinalizada = false


let peliElegida;

let peliculaData = [];
let   duracion = 30000;
const apikey = "3020f1e3";

let ronda = 0;
let errorCout =0;

let timerTimeout;
let pista1Timeout;
let pista2Timeout;
let pista3Timeout;
let siguienteTimeout;

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
      finalizarRonda()
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
  pixel.style.visibility = "collapse";
  portadaIMG.style.filter = "blur(0px)";
  imgReloj.style.animation="salir-reloj 1.2s forwards"
  timerBar.style.animation = `crecer 3ms linear forwards`;

  const palabraCorrecta = palabra
    .replaceAll(" ", "")
    .toUpperCase();

  inputs.forEach((input, index) => {
    setTimeout(() => {
      input.value = palabraCorrecta[index] || "";
      input.classList.remove("vacio", "incorrecta");
      input.classList.add("correcta");
      input.readOnly=true;
    }, index * 100);
  });
}

function iniciarTimer(tiempo) {
  limpiarTimers()
  timerBar.style.animation = "none";
  timerBar.offsetHeight;
  timerBar.style.animation = `crecer ${tiempo}ms linear forwards`;
  timerTimeout = setTimeout(() => {
    boxC.style.animation = "salirBox 0.8s ease-out forwards";
    imgDesc.src="../IMG/LentesGris.png"
    finalizarRonda()
  }, tiempo);
}

function crearPistas (pista){
  actPuntos(score)
  let tempGenero = pista.Genre;
  let tempTipo = pista.Type;
  let tempDesc = pista.Plot;

  genre.textContent = "";
  type.textContent = "";
  desc.textContent = "";
  pista1Timeout = setTimeout(() => {
    
    genre.textContent = traducirGenero(tempGenero);
    boxA.style.animation = "entrarBox 0.8s ease-out forwards";
    imgGene.src="../IMG/AccionColor.png"
    
    score=score - 20
    actPuntos(score)
  }, duracion * 0.15);

  pista2Timeout = setTimeout(() => {

    type.textContent = traducirTipo(tempTipo);
    boxA.style.animation = "salirBox 0.8s ease-out forwards";
    imgGene.src="../IMG/AccionGris.png"
    boxB.style.animation = "entrarBox 0.8s ease-out forwards";
    imgTipo.src="../IMG/CintaColor.png"
    score=score - 20
    actPuntos(score)
  }, duracion * 0.38);

  pista3Timeout = setTimeout(() => {
    desc.textContent = traducirDesc(peliElegida,descripciones);
    boxB.style.animation = "salirBox 0.8s ease-out forwards";
    imgTipo.src="../IMG/CintaOjo.png"
    boxC.style.animation = "entrarBox 0.8s ease-out forwards";
    imgDesc.src="../IMG/LentesColor.png"
    
    cambiarReloj();
    score=score - 35
    actPuntos(score)
    
  }, duracion * 0.55);

  
}

function limpiarTimers(){


  clearTimeout(timerTimeout);
  clearTimeout(pista1Timeout);
  clearTimeout(pista2Timeout);
  clearTimeout(pista3Timeout);
  clearTimeout(siguienteTimeout);
  
}


function mostrarSkip() {
  btnSkip.style.visibility = "visible";
  btnSkip.addEventListener('click',()=>{
    score=0
    finalizarRonda();
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

function finalizarRonda() {
  if (rondaFinalizada) return;

  rondaFinalizada = true;
  limpiarTimers();
  revelarPelicula(peliElegida);
  actPuntosTotales();
  siguienteTimeout = setTimeout(() => {
    siguientePelicula();
  }, 5000);
}

function tiempoAgotado() {
  score=0
  finalizarRonda()
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
  rondaFinalizada = false;
  pixel.style.visibility = "visible";
  portadaIMG.style.filter = "blur(8px)";
  await animTransicion();
  await animacionCompl();
  fetchPelicula();
  iniciarTimer(duracion);
  mostrarSkip();
}

function actPuntos(puntos){
  contPuntos.innerHTML="Puntos: "+puntos
}

function actPuntosTotales(){
  totalScore=totalScore + score
  console.log(totalScore)

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

async function animTransicion() {
  score=100
  blackscreen.style.visibility="visible"
  popCorn.classList.remove('salida-logoAnim');
  animScreen.classList.remove("salida-fondo")
  popCorn.src="../img/popframe.gif"
  animScreen.style.visibility = "visible";
  animScreen.classList.add("entrada-fondo")
  popCorn.classList.add('entrada-logoAnim');
  imgReloj.style.animation="animReloj 1.2s infinite ease-in-out"
  imgReloj.src="../IMG/Reloj.png"
  imgGene.src="../IMG/AccionOjo.png"
  imgTipo.src="../IMG/CintaGris.png"
  imgDesc.src="../IMG/LentesGris.png"
  await esperarAnimacion(popCorn);
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
