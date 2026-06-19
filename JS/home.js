const btnJugar=document.getElementById("JUGAR");
const btnSiguiente=document.getElementById("Siguiente");
const screen01=document.getElementById("Screen01");
const screen02=document.getElementById("Screen02");

btnJugar.addEventListener('click', ()=>{
    MostrarScreen()
});
btnSiguiente.addEventListener('click',()=>{
    CambiarScreen()
})
function MostrarScreen(){
    screen01.classList.add("mostrarTuto")
}
function CambiarScreen(){
    screen01.classList.remove("mostrarTuto")
    screen01.classList.add("ocultarTuto")
    screen02.classList.add("mostrarTuto")
}
