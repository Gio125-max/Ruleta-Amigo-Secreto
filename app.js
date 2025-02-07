let amigos = [];
let caracteresEspeciales = /[^a-zA-Zá-úÁ-ÚñÑ\s]/;//buscara cosas que no esten despues del ^,solo permitimos que busque letras de la a a la z,con tildes,mayusculas y minuscukas y espacios


function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);//obtiene el documento por elemento o etiqueta
    elementoHTML.innerHTML = texto;
    return;
}

function agregarAmigo() {
    let nuevoAmigoTexto = document.getElementById('amigo').value.trim();//value para el valor del elemento y trim elimina el espacio,ya que la validacion solo funcionaba al principio
    
    if (!isNaN(nuevoAmigoTexto) && nuevoAmigoTexto !== '') {
        asignarTextoElemento('h2', 'No puedes ingresar un número como nombre');
    } 
    
    else if (nuevoAmigoTexto === '') {
        asignarTextoElemento('h2', 'Ingresa un nombre, por favor');
    }

    else if(amigos.includes(nuevoAmigoTexto)){
        asignarTextoElemento('h2',`El nombre " ${nuevoAmigoTexto} " ya a sido agregado,ingresa algo para diferenciarlo o cambialo`);
        document.getElementById('amigo').value ='';
    }

    else if(caracteresEspeciales.test(nuevoAmigoTexto)){
        asignarTextoElemento('h2',`El nombre " ${nuevoAmigoTexto} " no es valido`);
    }

    else{
        asignarTextoElemento('h2','Gracias por el nombre')
        //agregamos el elemnto a un arreglo y lo limpiamos
        amigos.push(nuevoAmigoTexto);
        document.getElementById('amigo').value ='';

        //agregar los elementos de la listas
        let nuevoAmigo = document.createElement("ul");
        nuevoAmigo.textContent = nuevoAmigoTexto + '     ';
        document.getElementById('listaAmigos').appendChild(nuevoAmigo);

        //Agregamos un boton de eliminar
        let botonQuitar = document.createElement("button");
        botonQuitar.textContent = 'Quitar';
        botonQuitar.onclick = function(){
            nuevoAmigo.remove();
            amigos = amigos.filter(amigoBorrar => amigoBorrar !== nuevoAmigoTexto); // Eliminar del arreglo
            }
        //Agrega un boton de quitar a los elementos de la lista
        nuevoAmigo.appendChild(botonQuitar);
        console.log("Lista de amigos:", amigos);
    }

}

function seleccion(datos){
    return datos[Math.floor(Math.random()* datos.length)];
}

function sortearAmigo() {
    let minimo = amigos.length;
    if(minimo <= 1){
        asignarTextoElemento('h2','Debes ingresar al menos 2 nombres para jugar')
    }
    else{
        let elegido = seleccion(amigos);
        let resultado = document.getElementById("resultado"); 
        resultado.innerHTML = '';
        let nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `El amigo secreto es: 🎉${elegido}🎉`;
    
        resultado.appendChild(nuevoElemento); 
    }
}
