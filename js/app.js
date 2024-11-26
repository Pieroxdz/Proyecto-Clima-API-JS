const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener('load', () => {
    formulario.addEventListener("submit", buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        //Hubo un error
        mostrarError("Ambos campos son obligastorios");
        return;
    }

    //Consultaríamos la API
    consultarAPI(ciudad, pais)

}

function mostrarError(mensaje) {
    const alerta = document.querySelector(".bg-red-100");

    if (!alerta) {
        //Crear una alerta
        const alerta = document.createElement("DIV");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `

        container.appendChild(alerta);

        //Se elimine la alerta después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad, pais) {

    const appID = "e500befc23e33bfb39842357a177c0bb";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML();
            if (datos.cod === "404") {
                mostrarError("Ciudad no encontrada");
                return
            }

            //Imprime las respuestas en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("P");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl")

    const actual = document.createElement("P");
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("P");
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add("text-xl");

    const tempMinima = document.createElement("P");
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add("text-xl");

    const resultadoDIv = document.createElement("DIV");
    resultadoDIv.classList.add("text-center", "text-white");

    resultadoDIv.appendChild(nombreCiudad);
    resultadoDIv.appendChild(actual);
    resultadoDIv.appendChild(tempMaxima)
    resultadoDIv.appendChild(tempMinima)


    resultado.appendChild(resultadoDIv);

}

const kelvinACentigrados = (grados) => { return parseInt(grados - 273.15) }


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner() {
    limpiarHTML()
    const divSpinner = document.createElement("DIV");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
        <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
        </div>
    

    `

    resultado.appendChild(divSpinner)
}