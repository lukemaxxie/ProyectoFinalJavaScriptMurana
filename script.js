document.getElementById("calcular-button").addEventListener("click", function() {
    calcularImpactoAmbiental();
});

function calcularImpactoAmbiental() {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    var inputs = [
        { id: "cantidad-productos", factor: 1 },
        { id: "distancia-envio", factor: 1 },
        { id: "empaques-plasticos", factor: 2 },
        { id: "empaques-carton", factor: 1.5 }
    ];

    var valores = inputs.map(function(input) {
        var valor = parseFloat(document.getElementById(input.id).value);
        return !isNaN(valor) && valor >= 0 ? valor : 0;
    });

    var impactoBasico = calcularImpactoBasico(valores);
    resultadoDiv.innerHTML += `El impacto ambiental de su compra en línea es de ${impactoBasico.toFixed(2)} unidades.`;

    var mensajeRecomendacion = evaluarImpacto(impactoBasico);
    resultadoDiv.innerHTML += `<br>${mensajeRecomendacion}`;

    guardarDatosEnLocalStorage(valores.concat(impactoBasico));
    calcularImpactoEspecificoDeProductos();
}

function calcularImpactoBasico(valores) {
    return valores.reduce(function(accumulated, current) {
        return accumulated + current;
    }, 0);
}

function evaluarImpacto(impactoBasico) {
    var mensajeRecomendacion = impactoBasico < 10
        ? "Su compra en línea tiene un bajo impacto ambiental. ¡Excelente elección!"
        : (impactoBasico < 20
            ? "Su compra en línea tiene un impacto moderado en el medio ambiente. Considere opciones más sostenibles."
            : "Su compra en línea tiene un alto impacto ambiental. Le recomendamos buscar alternativas más sostenibles.");
    return mensajeRecomendacion;
}

function guardarDatosEnLocalStorage(valores) {
    var compraData = {
        cantidadProductos: valores[0],
        distanciaEnvioKm: valores[1],
        empaquesPlasticos: valores[2],
        empaquesCarton: valores[3],
        impactoBasico: valores[4]
    };

    var compraDataJSON = JSON.stringify(compraData);
    localStorage.setItem("compraData", compraDataJSON);
}

function calcularImpactoEspecificoDeProductos() {
    var resultadoDiv = document.getElementById("resultado");

    // Algoritmo con ciclo para calcular impacto específico de productos
    var productos = ["Producto 1", "Producto 2", "Producto 3"]; // Ejemplo de nombres de productos
    var impactoProductoTotal = 0;

    for (var i = 0; i < productos.length; i++) {
        var cantidadProducto = parseFloat(prompt(`Ingrese la cantidad de ${productos[i]}:`));
        var impactoProducto = parseFloat(prompt(`Ingrese el impacto ambiental de ${productos[i]}:`));

        if (!isNaN(cantidadProducto) && cantidadProducto > 0 &&
            (!isNaN(impactoProducto) || isNaN(impactoProducto)) && impactoProducto >= 0) {
            impactoProductoTotal += cantidadProducto * impactoProducto;
        }
    }

    // Mostrar el impacto total de productos solo si es mayor que 0
    if (impactoProductoTotal > 0) {
        resultadoDiv.innerHTML += `<br>El impacto ambiental total de los productos específicos es de ${impactoProductoTotal.toFixed(2)} unidades.`;
    }
}

// Llama a la función de cálculo específico de productos
calcularImpactoEspecificoDeProductos();
