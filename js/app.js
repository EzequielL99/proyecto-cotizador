// Constructores
function Seguro(merca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

function UI(){
}

// Llena las opciones de los anios
UI.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear(),
        min = max - 20;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i >= min; i--){
        let option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;

        selectYear.appendChild(option);
    }
};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
};

// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // Llena el select con los años
});

registrarEventListeners();
function registrarEventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Leer el anio seleccionado
    const anio = document.querySelector('#year').value;

    // Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || anio === '' || tipo === ''){
        console.log('No pasa validacion');
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');
}