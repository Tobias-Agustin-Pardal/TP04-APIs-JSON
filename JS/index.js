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
    screen01.style.visibility="visible";
}
function CambiarScreen(){
    screen01.style.visibility="hidden";
    screen02.style.visibility="visible";
}
