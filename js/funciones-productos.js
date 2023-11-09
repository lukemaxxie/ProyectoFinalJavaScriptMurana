/* ---- ARRAYS ----*/

const productos = [
    {id:1, nombre: "Promo 1 - 50 personas" , precio:37000, stock:2000},
    {id:2, nombre: "Promo 2 -  80-100 personas" , precio:80000, stock:5000},
    {id:3, nombre: "Promo 3 - 90 a 120 personas", precio:170000, stock:1500},
    {id:4, nombre: "Promo 4 para 60 a 70 personas", precio:60000, stock:10000},
    {id:5, nombre: "Promo 5 de 120 a 150 personas", precio:147000, stock:15000}
];

var favoritos = [];
var carrito = []; 

/* ---- FLUJO DE PEDIDO ----*/

showSelect();

/* ---- FUNCIONES ---- */

function addProductItem (arr) {
    for (let i = 0 ; i < arr.length; i++) {
        addHTMLProducto(productos[i]);
    }
}

function getRootContainerProducts() {
    return document.querySelector("#products-container")
}

function addNewElemet(tag) {
    return document.createElement(tag)
}

function addHTMLProducto (producto) {
    const container = getRootContainerProducts();
    const childContainer = addNewElemet('div');
    const btnFavoritos = addNewElemet('button');
    const spanFavoritosIn = addNewElemet('span');
    const spanFavoritosOut = addNewElemet('span');
    const image = addNewElemet('img');
    const bodyContainer = addNewElemet('div');
    const bodyTitle = addNewElemet ('h5');
    const bodyPrice = addNewElemet ('p');
    const btnShop = addNewElemet ('button');
    const btnStock = addNewElemet ('button');

    childContainer.className = "card";
    childContainer.setAttribute("style","width: 18rem;");
    btnFavoritos.setAttribute("type","button");
    btnFavoritos.className = "btn btn-favorito";
    spanFavoritosOut.className = "material-icons material-icons-outlined";
    spanFavoritosOut.textContent = "favorite_border";
    spanFavoritosOut.setAttribute("id","fvrtOut"+producto.id);
    spanFavoritosIn.className = "material-icons material-icons-outlined";
    spanFavoritosIn.textContent = "favorite";
    spanFavoritosIn.setAttribute("id","fvrtIn"+producto.id);
    spanFavoritosIn.setAttribute("style","display:none");
    image.className = "card-img-top";
    image.setAttribute("alt","Torta Personalizada");
    image.setAttribute("src",producto.img);
    bodyContainer.className = "card-body";
    bodyTitle.className = "card-title";
    bodyPrice.className = "card-text";
    btnShop.className = "btn btn-primary btn-shop";
    btnShop.setAttribute("type","button");
    btnShop.setAttribute("id","btn"+producto.id);
    btnShop.setAttribute("value",producto.id);
    btnShop.textContent = "Agregar al Carrito";
    btnStock.className = "btn btn-stock";
    btnStock.setAttribute("type","button");
    btnStock.setAttribute("id","btnStock"+producto.id);
    btnStock.setAttribute("style","display:none");
    btnStock.textContent = "Sin Stock";

    container.appendChild(childContainer);
    childContainer.appendChild(btnFavoritos);
    btnFavoritos.appendChild(spanFavoritosIn);
    btnFavoritos.appendChild(spanFavoritosOut);
    childContainer.appendChild(image);
    childContainer.appendChild(bodyContainer);
    bodyContainer.appendChild(bodyTitle);
    bodyContainer.appendChild(bodyPrice);
    childContainer.appendChild(btnShop);
    childContainer.appendChild(btnStock);

    bodyTitle.textContent = producto.nombre;
    bodyPrice.textContent = "$ "+producto.precio;


    $( `#btn${producto.id}`).click(function() {
        verificarStock(producto.id)
    });   
    $( `#fvrtOut${producto.id}`).click(function() {
        newFavorito(producto.id)
    }); 

    $( `#fvrtIn${producto.id}`).click(function() {
        alert("El producto ya esta en la lista de favoritos");
    }); 

}

    $( `#productsSelect`).change(function() {
        showSelect();
    }); 

function findProduct(where, idItem){
    return where.find(producto => producto.id == idItem); 
}

function findProductIndex(where, idItem) {
    return where.findIndex(producto => producto.idArticulo === idItem); 
}

function verificarStock(idProd){
    let producto = findProduct(productos, idProd); 
    if (producto.stock === 0){
        $(`#btn${producto.id}`).fadeOut(400);
        $(`#btnStock`+producto.id).delay(400).fadeIn(400);
    }else{
        addItemCarrito(producto)
    }
}

function addItemCarrito(newProduct){
    newProduct.stock -= 1;
    let productoIndex = findProductIndex(carrito, newProduct.id); 
    if (productoIndex >= 0) {
        carrito[productoIndex].cantidad += 1;
    } else {
        carrito.push({idArticulo:newProduct.id, articulo:newProduct.nombre, cantidad:1, precio:newProduct.precio, imagen:newProduct.img});
    }  

    showCart();
    console.log(carrito); 
}

function newFavorito(idItem){
    let isFavorite = findProductIndex(favoritos, idItem);
    let producto = findProduct(productos, idItem); 
    favoritos.push({idArticulo:producto.id, articulo:producto.nombre,imagen:producto.img});
    var fvrtAnimate = $( `#fvrtOut${producto.id}`);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'20px'},200);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'24px'},200);
    fvrtAnimate.fadeOut(400);
    $(`#fvrtIn${producto.id}`).delay(1200).fadeIn(400);
    console.log(favoritos);
}

function showSelect(){
    const elemento = document.getElementById("products-container");
    $( elemento ).html("");
    var valorOption = document.getElementById('productsSelect').value; 
    console.log(valorOption);

    if(valorOption == 1){addProductItem(productos);}
    else if (valorOption == 2){addProductItem(favoritos);}
    else {addProductItem(carrito);}
}