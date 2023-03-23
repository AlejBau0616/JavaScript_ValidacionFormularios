export function validar(input){
    const tipoInput= input.dataset.tipo;

    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarError(tipoInput,input);
    }
}

const tipoErrores= [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesError= {
    nombre:{
        valueMissing: "Este campo no puede estar vacio"
    },

    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },

    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Debe contener al   menos 6 caracteres, maximo 12, debe de contener una letra mayuscula, una minuscula, un numero y no debe de contener caracteres especiales"
    },

    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes de tener al menos 18 años de edad"
    },

    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe de contener entre 10 y 40 caracteres"
    },
    
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe de contener entre 10 y 40 caracteres"
    },  
    
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe de contener entre 10 y 40 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarError(tipoInput,input){
    let mensaje = "";

    tipoErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(input.validity[error]);
            console.log(error);
            mensaje = (mensajesError[tipoInput][error]);      
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente =new Date(input.value);
    let mensaje = "";
    
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes de tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad (fecha){
    const fechaActual= new Date();
    const diferenciaFechas= new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFechas <= fechaActual;
}