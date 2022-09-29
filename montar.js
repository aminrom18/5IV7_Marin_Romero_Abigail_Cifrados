const rango = document.getElementById('rango');
var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
            //primero necesito tener la matriz del alfabeto
            //hay que recorrar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L','m', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];
            var l = abc.length;

            //necesitamos obtener la posicion que va  a venir por parte de la llave privada

            return function(c){
                //vamos a saber la posicion
                var i = abc.indexOf(c.toLowerCase());
                //necesitamos saber donde estamos adentro de la matriz
                //como la vamos a recorrer y que pasa cuando llegue
                //al final?
                //alert(c);
                //alert(i);

                if(i != -1){
                    //primero obtenemos la posicion para el desp
                    var pos = i;
                    //que voy a hacer cifrar o descifrar
                    if(action){
                        //cifrar para adelante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l)?l:0;
                    }else{
                        //descifrar para atras
                        pos -= desp;
                        //movimiento
                        pos += (pos < 0)?l:0;
                    }
                    return abc[pos];

                }
                return c;
            };
        })();
        //tenemos que saber que el texto este acorde al abc
        var re = (/([a-z])/ig);
        //una funcion que se encargue del intercambio
        return String(txt).replace(re, function(match){
            return replace(match);
        });

    };

    return{
        encode : function(txt, desp){
            return proceso(txt, desp, true);
        },

        decode : function(txt, desp){
            return proceso(txt, desp, false);
        }
    };
})();

//funcion de cifrado

function cifrar(){
    document.getElementById("resultado").innerHTML =
    cesar.encode(document.getElementById("cadena").value, 3);
    //document.getElementById("inputoriginal").onclick = cifrar();
}


//funcion de descifrado

function descifrar(){
    document.getElementById("resultado").innerHTML =
    cesar.decode(document.getElementById("cadena").value, 3);
}

//_____________________________________________________________________________
//vinigger

const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ','o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//aqui va a estar la llave

let llave = "";

$(document).ready(function(){
    $('#ci').click(function(){
        //vamos a cifrar utilizando una funcion y = (x+z)mod27

        //vamos a traer los datos de los campos de texto
        key = document.getElementById('llave').value;
        //validemos la llave
        key = key.replace(/ /g, '');

        //obtenemos el mensaje
        let mess = document.getElementById('mess').value;
        //vamos a verificar los datos del mensaje
        mess = mess.replace(/ /g, '');

        let newMess = "";

        let keyComplete = "";

        //algoritmo de viggenere

        if(revision(mess, key)){

            //for para recorrer el tamaño del mensaje
            for(var i = 0; i < mess.length; i++){
                //vamos aplicar la parte de la llave al mensaje
                keyComplete += key.charAt((i%Number(key.length)));
            }
            alert("LLave : " + keyComplete);

            //vamos a obtener la posicion letra por letra del mensaje
            for(var i = 0; i < mess.length; i++){
                let charr = mess.charAt(i);
                let posm = getPosition(charr);

                charr = keyComplete.charAt(i);
                let posk = getPosition(charr);

                //vamos a ejecutar el algoritmo
                let newVal = change(posm, posk);

                //aqui obtenemos el mensaje cifrado
                newMess += abc[newVal];
            }
            //imprimir resultado
            document.getElementById('res').value = newMess;
        }else{
            //aqui si no se cumplen las condiciones
            alert("Chillo T_T");
        }

    });
    //decifrar
    $('#de').click(function(){
        //se aplica lo mismo pero alreves volteado
        //vamos a traer los datos de los campos de texto
        key = document.getElementById('llave').value;
        //validemos la llave
        key = key.replace(/ /g, '');

         //obtenemos el mensaje
         let mess = document.getElementById('mess').value;
         //vamos a verificar los datos del mensaje
         mess = mess.replace(/ /g, '');

         let newMess = "";

        let keyComplete = "";

        //algoritmo de viggenere decifrado
        if(revision(mess, key)){

            //for para recorrer el tamaño del mensaje
            for(var i = 0; i < mess.length; i++){
                //vamos aplicar la parte de la llave al mensaje
                keyComplete += key.charAt((i%Number(key.length)));
            }
            alert("LLave : " + keyComplete);

            //vamos a obtener la posicion letra por letra del mensaje
            for(var i = 0; i < mess.length; i++){
                let charr = mess.charAt(i);
                let posm = getPosition(charr);

                charr = keyComplete.charAt(i);
                let posk = getPosition(charr);

                //vamos a ejecutar el algoritmo
                let newVal = rechange(posm, posk);

                //aqui obtenemos el mensaje cifrado
                newMess += abc[newVal];
            }
            //imprimir resultado
            document.getElementById('res').value = newMess;
        }else{
            //aqui si no se cumplen las condiciones
            alert("Chillo T_T");
        }
    });

});


//funcion de cambio
function change(posm, posk){
    //aqui aplicamos y = (x+z)mod27
    let y = (posm+posk)%27;
    return y;
}

//funcion de recarga
function rechange(posm, posk){
    let val = 0;
    if((posm - posk)>=0){
        val = (posm+posk)%27;
    }else{
        val = (posm-posk+27)%27;
    }
    return val;
}
//funcion para la posicion
function getPosition(letra){
    let posicion = abc.indexOf(letra);
    return posicion;
}

//funcion de la revision
function revision(mess, desp){
    //vamos a validar la entrada de los datos a partir de una expresion regular
    const re = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/;

    var acc = true;

    if(!re.test(mess)){
        sd(); //cuando no ha sido aceptado
        acc = false;
    }
    if(desp.length > mess.length){
        sz(); //para decir que el texto no ha sido aceptado respecto de la llave
    }
    if(!re.test(desp)){
        sdd(); //cuando el texto no ha sido aceptado de la llave
        acc = false;
    }
    return acc;
}


function sd(){
    Swal.fire({
        title : "Error",
        text : "El texto ingreso no ha sido aceptado, ingrese solo minusculas y evite números y símbolos",
        icon : 'error'
    });
    alert("El texto ingreso no ha sido aceptado, ingrese solo minúsculas y evite números y símbolos");
}


function sdd(){
    Swal.fire({
        title : "Error",
        text : "La clave ingresa no es correcta no cumple con las normas",
        icon : 'error'
    });
    alert("La clave ingresa no es correcta no cumple con las normas");
}

function sz(){
    Swal.fire({
        title : "Error",
        text : "La clave no puede ser mayor que la clave",
        icon : 'error'
    });
    alert("La clave no puede ser mayor que la clave");
}
