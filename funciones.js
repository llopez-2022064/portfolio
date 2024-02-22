//Variables globales
var palabraSecreta;
var intentos = 7;
var cantidadAciertos = 0;

// document.addEventListener("DOMContentLoaded", function () {
//     Swal.fire({
//         title: 'Ahorcado - llopez',
//         confirmButtonText: 'Programador',
//         cancelButtonText: 'Jugar YA.!',
//         showCancelButton: true
//     }).then((opcion) => {
//         if (opcion.isConfirmed) {
//           // Acción a realizar cuando se presiona el botón "Confirmar"
//           window.location.href = '';
//         } else if (opcion.dismiss === Swal.DismissReason.cancel) {
//           // Acción a realizar cuando se presiona el botón "Cancelar" o se cierra la ventana emergente
//         }
//       });
// });

var btnProgramador = document.getElementById("btnProgramador");
btnProgramador.addEventListener('click', datosProgramador);

function datosProgramador(){
    Swal.fire({
        title: 'Datos del programador',
        html: '<strong style="color: black;">Nombre:</strong> Lester René López Gálvez <br><br><strong style="color: black;">Grado:</strong> 5to. Perito en Computación <br><br><strong style="color: black;">Código Técnico:</strong> IN5AV <br><br><strong style="color: black;">Carné:</strong> 2022-064'
    })
}

const palabras = ["PROGRAMACION", "COMPUTADORA", "SOFTWARE", "HARDWARE", "ALGORITMO", "BASEDEDATOS", "INTERNET", "CIBERSEGURIDAD", "REDES",
    "DESARROLLO", "APLICACION", "SISTEMA", "INTERFAZ", "PROGRAMADOR", "ARCHIVOS", "SEGURIDAD", "TECNOLOGIA", "SERVIDOR", "ALMACENAMIENTO",
    "NUBE", "BITCOIN", "INTELIGENCIA", "CRIPTOMONEDA", "CIBERNETICA", "ROBOTICA", "CONECTIVIDAD", "DATA", "JAVA", "BYTE"];

//Cada vez que actualicen la pagina aparece una nueva palabra
window.addEventListener('load', function () {
    iniciarJuego();
});

var btnJugarDeNuevo = document.getElementById('jugar_de_nuevo');
btnJugarDeNuevo.addEventListener('click', iniciarJuego);

// Canvas, la cual nos va a servir para graficar
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5; // Grosor de la lineas
// ctx.strokeStyle = "red"; // Cambiar de color las lineas

function id(str) {
    return document.getElementById(str);
}

function iniciarJuego() {
    //Recargar pagina cuando presionen el boton 
    btnJugarDeNuevo.addEventListener("click", function () {
        location.reload();
    });

    document.getElementById("resultado").innerHTML = "";

    //Dibujamos la base de la horca
    DibujoHorca();
    intentos = 7;

    //Sirve para que cuando le de click, le aparezca la palabra, y se desactive
    //el boton para evitar que cambie de palabra
    btnJugarDeNuevo.disabled = true;

    const palabra_a_adivinar = id('palabra_a_adivinar');
    palabra_a_adivinar.innerHTML = '';

    //Obtenemos nuestra palabra secreta
    var indicePalabra = Math.floor(Math.random() * palabras.length);
    palabraSecreta = palabras[indicePalabra];
    console.log(palabraSecreta);

    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].disabled = false;
    }

    for (let i = 0; i < palabraSecreta.length; i++) {
        //Creamos una variable donde se crea un span
        const elementoSpan = document.createElement('span');
        //Al elemento <p> se le agrega ese span
        palabra_a_adivinar.appendChild(elementoSpan);
    }
}

//Botones

// querySelectorAll devuelve un array
const btnLetras = document.querySelectorAll("#letras button");

for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].addEventListener('click', letrasClick);
}

function letrasClick(event) {
    const spanLetra = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target; //Cual de todas las letras presiono el usuario
    button.disabled = true; //Desactiva el boton que presiono el usuario
    const letra = button.innerHTML; //Contenido que se encuentra en la etiqueta

    //Verificar si la palabra que selecciono existe dentro de la palabra
    let acerto = false;

    for (let i = 0; i < palabraSecreta.length; i++) {
        // La variable "i" es la posicion de la letra en la palabra
        if (letra == palabraSecreta[i]) {
            //Intercambia el guion por la letra
            spanLetra[i].innerHTML = letra;
            cantidadAciertos++;
            acerto = true;
        }
    }

    if (acerto == false) {
        intentos -= 1;
        console.log(intentos);

        switch (intentos) {
            case 6:
                // Gancho
                ctx.moveTo(250, 80);
                ctx.lineTo(250, 40);
                ctx.stroke();
                break;
            case 5:
                // Cabeza
                ctx.beginPath();
                // x , y , radio, angulo inicial, angulo final del circulo
                ctx.arc(250, 120, 40, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 4:
                // Cuerpo
                ctx.moveTo(250, 157);
                ctx.lineTo(250, 280);
                ctx.stroke();
                break;
            case 3:
                // Brazo izquierdo            
                ctx.moveTo(250, 160);
                ctx.lineTo(200, 230);
                ctx.stroke();
                break;
            case 2:
                // Brazo derecho
                ctx.moveTo(250, 160);
                ctx.lineTo(300, 230);
                ctx.stroke();
                break;
            case 1:
                // Pierna izquierda      
                ctx.moveTo(250, 275);
                ctx.lineTo(200, 330);
                ctx.stroke();
                break;
            case 0:
                // Pierna derecha
                ctx.moveTo(250, 275);
                ctx.lineTo(300, 330);
                ctx.stroke();
                break;
        }
    }

    if (intentos == 0) {
        id("resultado").innerHTML = "Perdiste, la palabra era: " + palabraSecreta + " &#128542";
        DesactivarLetras();
    } else if (cantidadAciertos == palabraSecreta.length) {
        id("resultado").innerHTML = " Ganasteeeeeeeeee.!!!!";
        DesactivarLetras();
    }
}

function DesactivarLetras() {
    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].disabled = true; //Desactiva todas las letras despues de ganar o perder
    }

    btnJugarDeNuevo.disabled = false;
}

function DibujoHorca() {
    //Poste acostado
    ctx.moveTo(10, 40);
    ctx.lineTo(300, 40);
    ctx.stroke();

    //poste parado
    ctx.moveTo(0, 10000);
    ctx.lineTo(40, 10);
    ctx.stroke();

    //Base de los postes
    ctx.moveTo(100, 40);
    ctx.lineTo(40, 100);
    ctx.stroke();

    //Base de la horca
    ctx.moveTo(10, 347);
    ctx.lineTo(350, 347);
    ctx.stroke();
}