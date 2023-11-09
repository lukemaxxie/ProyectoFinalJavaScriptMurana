if (carrito.length===0) {
    bolsaVacia();
}

function showCart () {
if (carrito.length===0) {
    deleteHTMLCarrito();
    bolsaVacia();
} else{
    deleteHTMLCarrito();
    for (var i = 0; i < carrito.length; i++) {
        addHTMLItemCarrito (carrito[i]);
    }
} 
}

function getRootContainerCarrito() {
return document.querySelector("#contenedorCarrito")
}

function addNewElemetCarrito(tag) {
return document.createElement(tag)
}

function addHTMLItemCarrito (producto) {
const container = getRootContainerCarrito();
const childContainer = addNewElemet('div');
const cardFirstContainer = addNewElemet('div');
const imgCardContainer = addNewElemet('div');
const imgCard = addNewElemet('img');
const cardSecondContainer = addNewElemet('div');
const bodyCardContainer = addNewElemet('div');
const spanTrash = addNewElemet('span');
const titleItem = addNewElemet('p');
const quantityContainer = addNewElemet('div');
const quantityAdd = addNewElemet('span');
const quantityItem = addNewElemet('p');
const quantitySubtract = addNewElemet('span');
const priceItem = addNewElemet('p');

childContainer.className = "card mb-3",
childContainer.setAttribute("style","max-width: 540px;");
cardFirstContainer.className = "row g-0";
imgCardContainer.className = "col-md-4";
imgCard.className = "img-fluid rounded-start";
imgCard.setAttribute("src",producto.imagen);
cardSecondContainer.className = "col-md-8";
bodyCardContainer.className = "card-body";
spanTrash.className = "material-icons material-icons-outlined";
spanTrash.setAttribute("value", producto.idArticulo);
spanTrash.textContent = "delete";
titleItem.className = "card-title";
titleItem.textContent = producto.articulo;
quantityAdd.className = "material-icons material-icons-outlined";
quantityAdd.setAttribute("value", producto.idArticulo);
quantityAdd.textContent = "add";
quantityItem.className = "card-text text-muted";
priceItem.className = "card-text text-muted";
quantityItem.textContent = producto.cantidad;
quantitySubtract.className = "material-icons material-icons-outlined";
quantitySubtract.setAttribute("value", producto.idArticulo);
quantitySubtract.textContent = "remove";
priceItem.textContent = "$ "+producto.precio;

container.appendChild(childContainer);
childContainer.appendChild(cardFirstContainer);
cardFirstContainer.appendChild(imgCardContainer);
imgCardContainer.appendChild(imgCard);
cardFirstContainer.appendChild(cardSecondContainer);
cardSecondContainer.appendChild(bodyCardContainer);
bodyCardContainer.appendChild(spanTrash);
bodyCardContainer.appendChild(titleItem);
bodyCardContainer.appendChild(quantityContainer);
quantityContainer.appendChild(quantityAdd);
quantityContainer.appendChild(quantityItem);
quantityContainer.appendChild(quantitySubtract);
bodyCardContainer.appendChild(priceItem);
}

function bolsaVacia(){
const container = getRootContainerCarrito();
const childText = addNewElemetCarrito('p');

childText.setAttribute("id","bolsaVacia");
childText.textContent = "Ups! No tienes productos en la bolsa";

container.appendChild(childText);
}

function deleteHTMLCarrito(){
const elemento = document.getElementById("contenedorCarrito");
$( elemento ).html("");
}

// Añadir event listener para la tecla "Delete"
document.addEventListener("keydown", function(event) {
    if (event.key === "delete") {
        // Llama a la función para eliminar el elemento del carrito
        eliminarDelCarrito();
    }
});

// Función para eliminar del carrito
function eliminarDelCarrito() {
    // Obtén el identificador único del elemento a eliminar (puedes adaptar esto según tu estructura)
    const idElementoAEliminar = obtenerIdElementoAEliminar();

    // Encuentra la posición del elemento en el carrito
    const indiceElemento = carrito.findIndex(elemento => elemento.id === idElementoAEliminar);

    // Si se encuentra, elimina el elemento del carrito
    if (indiceElemento !== -1) {
        carrito.splice(indiceElemento, 1);

        // Actualiza la visualización del carrito
        showCart();
    }
}

// Ejemplo de cómo obtener el identificador único del elemento a eliminar
function obtenerIdElementoAEliminar() {
    // Puedes adaptar esto según tu estructura, aquí se asume que hay un elemento seleccionado en el carrito
    const elementoSeleccionado = document.querySelector(".elemento-seleccionado");
    return elementoSeleccionado ? elementoSeleccionado.dataset.id : null;
}