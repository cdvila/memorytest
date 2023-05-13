// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let juegoHabilitado = true;
let temporizador = false;
let timer = 59;
let tiempoInicial = timer;
let tiempoRegresivo = null;

//apuntar elementos
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Generar numeros aleatorios para fichas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

let milisegundos = 99;
function contarTiempo() {
   tiempoRegresivo = setInterval(() => {
    milisegundos--;
    
    //if(milisegundos % 10 == 0) timer--;
    if(milisegundos === 0) {
      milisegundos = 99;
      timer--
    }//timer--;
    mostrarTiempo.innerHTML = "Tiempo: " + timer + ","+milisegundos;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
    }
  }, 10);
}

function bloquearTarjetas() {
  for (i = 0; i < numeros.length; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    (tarjetaBloqueada.innerHTML = numeros[i]),
      (tarjetaBloqueada.disabled = true);
    mostrarTiempo.innerHTML = "Perdiste se acabo el tiempo 😔";
  }
}

//// Funcion principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }
  juegoHabilitado = true;
  if (juegoHabilitado) {
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if (tarjetasDestapadas == 1) {
      tarjeta1 = document.getElementById(id);
      primerResultado = numeros[id];
      tarjeta1.innerHTML = primerResultado;

      //desabilitar boton
      tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
      tarjeta2 = document.getElementById(id);
      segundoResultado = numeros[id];
      tarjeta2.innerHTML = segundoResultado;

      //desabilitar boton
      tarjeta2.disabled = true;

      //incrementar movimientos
      movimientos++;
      mostrarMovimientos.innerHTML = "Movimientos: " + movimientos;
      

      if (primerResultado == segundoResultado) {
        tarjeta1.classList.add("fichaCorrecta");
        tarjeta2.classList.add("fichaCorrecta");

        aciertos++;
        mostrarAciertos.innerHTML = "Aciertos : " + aciertos;
        if (aciertos == 8) {
          mostrarAciertos.innerHTML = "Aciertos: " + aciertos + " 😆";
          mostrarMovimientos.innerHTML = "Movimientos: " + movimientos + " 😁";
          mostrarTiempo.innerHTML = `GANASTE, Solo tardaste ${Number(tiempoInicial - (timer+(milisegundos/100))).toFixed(2)
            
          } segundos`;
          clearInterval(tiempoRegresivo);
        }
        
      } else {
        tarjeta1.classList.add("fichaIncorrecta")
        tarjeta2.classList.add("fichaIncorrecta")
        juegoHabilitado = false;
        /*
        setTimeout(() => {
          tarjeta1.innerHTML = null;
          tarjeta1.disabled = false;
          tarjeta2.innerHTML = null;
          tarjeta2.disabled = false;
        tarjetasDestapadas = 0; 
          tarjeta1.classList.remove("fichaIncorrecta")
            tarjeta2.classList.remove("fichaIncorrecta")
            tarjetasDestapadas = 0;
          juegoHabilitado = true;
        }, 2000);
        */
      }
      
    }else if(tarjetasDestapadas == 3){
        if(primerResultado != segundoResultado){
                tarjeta1.innerHTML = null;
          tarjeta1.disabled = false;
          tarjeta2.innerHTML = null;
          tarjeta2.disabled = false;
          

          
          tarjeta1.classList.remove("fichaIncorrecta")
          tarjeta2.classList.remove("fichaIncorrecta")
        }
        tarjetasDestapadas = 0;
        console.log("aca")
        destapar(id)
    }
  }
}
///////////////////*/ */

function reiniciar(){
  location.reload()
}