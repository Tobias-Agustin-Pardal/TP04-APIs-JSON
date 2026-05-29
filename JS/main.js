const portada= document.getElementById("portada")
let peliculaData = [];
let posicionElegida = "";
const listaPeliculas = [
  "Batman",
  "Better Call Saul",
  "Hellraiser",
  "Inception",

];

//Hay poner el fetch en una funcion que se llame cuando se inicie la pagina y cuando pase a la siguiente pelicula
fetch (`https://www.omdbapi.com/?apikey=a22fb87a&t=${elegirPelicula()}`)
    .then(response => response.json())
    .then(data => {
        peliculaData = data;
        mostrarPortada(peliculaData);
    });


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
