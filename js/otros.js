$(document).ready(()=>{
    $.getJSON(productosURL, function(respuesta, estado){
        if(estado ==="success"){
            productos = respuesta;
            return productos;
        }else{alert("Ups! Hubo un problema.");}
    });
});


$(document).ready(()=>{
    $.getJSON(productosURL, function(respuesta, estado){
        if(estado ==="success"){
            let productos = respuesta;
            for (const producto of productos){
                addHTMLProducto(producto);
            }
        }else{alert("Ups! Hubo un problema.");}
    });
});