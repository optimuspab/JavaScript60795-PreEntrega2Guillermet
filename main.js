//filtrar por las categorías deseadas

const filteredProducts = products.filter((producto) => {
    return producto.category !== "electronics" && producto.category !== "jewelery";
})

//armar la galería html

const productsCard = filteredProducts.reduce((acc, element) => {
    return acc + `
        <div class="product">
            <img src=${element.image} alt="${element.title}">
            <div class="product-title">
                <h3>
                    ${element.title}
                </h3>
            </div>
            <p class="price">Precio: <span class="color-price">$ ${element.price}</span></p>
            <p class="reviews">
                Calificación: <span class="color-reviews">${element.rating.rate}/5</span> <span class="star-icon"> &bigstar;</span><br>
                Opiniones: <span class="color-reviews">${element.rating.count}</span>
            </p>
            <p class="description">
                ${element.description}
            </p>
            </div>
        </div>
    `
}, "")

const container = document.getElementById("product-gallery")

container.innerHTML = productsCard

//saludo de bienvenida

alert(`Hola! Estás Tienda Multi Prendas!`);

//filtrar las categorías para el alert

const categories = new Array();

filteredProducts.forEach(producto => {
    if (!categories.includes(producto.category)) {
        categories.push(producto.category);
    }
});

alert(`Puedes elegir entre las siguientes categorías: ${categories[0]} y ${categories[1]}`);

//armar listado de productos a mostrar para su selección

const productToBuy = new Array();

filteredProducts.forEach(producto => {
    const productToAdd = {
        id: producto.id,
        title: producto.title
    };
    productToBuy.push(productToAdd);
});

//ordenar alfabeticamente

productToBuy.sort(function (a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
})

//Preparar fecha
function deliveryDate() {
    const fechaActual = new Date();
    const tiempoEntrega = Math.floor(Math.random() * 3) + 4; ;
    fechaActual.setDate(fechaActual.getDate() + tiempoEntrega);
    return fechaActual.toDateString();
}

//selección de producto, confirmación de compra

function seleccionProducto () {
    let attempts = 0;
    const listaProductos = productToBuy.map(producto => `${producto.id}. ${producto.title}`).join('\n');
    while (attempts < 3) {
        const seleccion = prompt(`Productos disponibles:\n ${listaProductos}\n\n Ingrese el ID del producto que desea comprar:`);
        let choosen = parseInt(seleccion);
        if (!isNaN(choosen) && productToBuy.find(producto => producto.id === choosen)) {
            const productoSeleccionado = filteredProducts.find(producto => producto.id === choosen);
            const confirmation = confirm(`Ud. ha seleccionado: ${productoSeleccionado.title} \n\n Descripción del producto: \n\n ${productoSeleccionado.description} \n\n El precio la prenda es de $ ${productoSeleccionado.price}. ¿Confirma la compra?`)
            if (confirmation) {
                alert(`¡Gracias por su elección! Ha seleccionado: ${productoSeleccionado.title}\n\n Precio: $${productoSeleccionado.price}.`);
                const confirmation = confirm(`Su producto se entregará de 5 a 7 días hábiles. \n\n ¿Confirma la compra?`);
                if (confirmation) {
                    alert(`¡Gracias por su compra! Su pedido llegará el ${deliveryDate()}.`);
                    break;
                } else {
                    alert("Gracias por su visita.");
                    break;
                }
            }
        } else {
            attempts++;
            if (attempts === 3) {
                alert(`No hemos encontrado el producto seleccionado y ha alcanzado el máximo de intentos ${attempts}, por favor vuelva a comenzar`)
            } else {
                alert("No hemos encontrado el producto seleccionado, por favor intente nuevamente.");
            }          
        }
    }
}

seleccionProducto();



            
