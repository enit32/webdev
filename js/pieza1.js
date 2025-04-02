var boton1 = document.getElementById("buton1");
var entrada = document.getElementById("entrada");

boton1.addEventListener('click', cambiarimagen);

function cambiarimagen() {
    var imagenDisponible = entrada.value;
    console.log("hola mundo");
    imagencama.setAttribute('src', imagenDisponible);
    entrada.value = "";
}

class Aveo {

    constructor() {
      this.motor = "1.5AV2";
      this.computadora ="2004AV";
      this.carroceria = "2002ARCAV";

    }
}

var aveoMarco = new Aveo();

var aveoAriel = new Aveo();

var aveoChevrolet = new Aveo();

var aveoCBT = new Aveo();
