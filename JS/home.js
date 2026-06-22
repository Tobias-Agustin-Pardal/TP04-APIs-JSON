const btnJugar=document.getElementById("JUGAR");
const btnSiguiente=document.getElementById("Siguiente1");
const btnSiguiente2=document.getElementById("Siguiente2");
const btnComenzar=document.getElementById("btnComenzar");
const screen01=document.getElementById("Screen01");
const screen02=document.getElementById("Screen02");
const screen03=document.getElementById("Screen03");

btnComenzar.addEventListener('click', ()=>{
    window.location.href = "./PAGES/gamePage.html";

});
btnJugar.addEventListener('click', ()=>{
    MostrarScreen()
});
btnSiguiente.addEventListener('click',()=>{
    CambiarScreen()
})
btnSiguiente2.addEventListener('click',()=>{
    CambiarScreen2()
})
function MostrarScreen(){
    screen01.classList.add("mostrarTuto")
}
function CambiarScreen(){
    screen01.classList.remove("mostrarTuto")
    screen01.classList.add("ocultarTuto")
    screen02.classList.add("mostrarTuto")
}

function CambiarScreen2(){
    screen02.classList.remove("mostrarTuto")
    screen02.classList.add("ocultarTuto")
    screen03.classList.add("mostrarTuto")
}
