var imagencama = document.getElementById('imagencama');
var boton1 = document.getElementById("buton1");
var entrada = document.getElementById("entrada");


boton1.addEventListener('click', cambiarimagen);

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


