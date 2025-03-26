/*var imagencama = document.getElementById('imagencama');
var boton1 = document.getElementById("buton1");
var entrada = document.getElementById("entrada");


boton1.addEventListener('click', cambiarimagen);
*/
function cambiarimagen() {
    var imagenDisponible = entrada.value;
    console.log("hola mundo");
    imagencama.setAttribute('src', imagenDisponible);
    entrada.value = "";
}

function nuevafuncion(a,b) {
    var resultado = "";
    resultado = a + b;

    //console.log(resultado);

    return resultado;
}


function otrafuncion(unsoloparametro) {
    return unsoloparametro  - 1;
}


var Jugo1 = {}

Jugo1.sabor = "naranja";
Jugo1.precio = 35;
Jugo1.cantidad_de_azucar = 25;


var pastelZarzamora = {
    peso: 1200,
    precio: 120,
    sabor: "zarzamora"
} 
var donge = {
    color: "verde",
    peso: 1200,
    potencia: 1500,
    numeroDePuertas: 4,
    serieDeMotor: "6rt4853e",
    combustible: 60,
    rendimiento:15,
    escalarendimiento: "km/L",
    andar: (parametro1)=>{
        var a;
        a = parametro1/ donge.rendimiento;
        b = donge.combustible-a;
        variable = 100*b/donge.combustible;
        /*
        1-calcular el combustible gastado por un viaje dependiendo del parametro1 (en km/L)
        2-indicarme cuanto combustible sobraría en el tanque de gasolina
        3-indicarme que porcentaje del tanque quedaria disponible despues del viaje 
        */
        console.log("este viaje tiene un total de " + parametro1 +" km");
        console.log("El combustible restante es de: " + b);
        console.log('El tanque quedarà con un: '+variable+" porciento de gasolina")
        

    }
}
 
var estudiante1 = {}

estudiante1.matricula = "6gdje6274me";
estudiante1.edad = 16;
estudiante1.nombre = "Marco Anotonio";
estudiante1.carrera = "Informatica";
estudiante1.promedio = 9.7;

var Desayuno = {
    sabor: "salado",
    cantidadDeProteinas: 480,
    nombre: "huevo en chile verde",
    bebida: "jugo de naranja",
    porcion: "un Plato"
}

/*
la composicion de las cargas en sistemas cerrados y abiertos
¿porque no puede pasar la energia entre polos diferentes de una 
*/