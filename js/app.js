// 🎁 GIRASOL - App.js

// Elementos del DOM
const catalogo = document.getElementById('catalogo');
const carritoBtn = document.getElementById('carrito-btn');
const carritoPanel = document.getElementById('carrito-panel');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const carritoItems = document.getElementById('carrito-items');
const totalEl = document.getElementById('total');
const contadorEl = document.getElementById('carrito-contador');
const checkoutBtn = document.getElementById('checkout-btn');
const buscarInput = document.getElementById('buscarInput');
const categoriaFiltro = document.getElementById('categoriaFiltro');
const resetFiltro = document.getElementById('resetFiltro');

// Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 🎨 Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Transformers SS Optimus Prime LDR",
        descripcion: "Figura de acción coleccionable con detalles premium.",
        precio: 39.99,
        categoria: "Juguetes",
        imagen: "img/producto1.jpg",
        marca: "Transformers",
        tipo: "Figura de acción",
        modelo: "GEN STUDIO SERIE LDR TF4 OPTIMUS PR",
        altura: "10 pulgadas",
        fabricante: "Hasbro",
        edicion: "Edición coleccionista",
        asin: "B0D94ZFWRB",
        opinion: "4.7 de 5 estrellas (201 opiniones)"
    },
    {
        id: 2,
        nombre: "Transformers SS Lockdown Deluxe",
        descripcion: "Figura de acción coleccionable con detalles premium.",
        precio: 29.99,
        categoria: "Juguetes",
        imagen: "img/producto2.jpg",
        marca: "Transformers",
        tipo: "Figura de acción",
        modelo: "Bloqueo Deluxe",
        altura: "9,13 pulgadas",
        fabricante: "Hasbro",
        edicion: "Edición coleccionista",
        asin: "B075LFT3BB",
        opinion: "4.5 de 5 estrellas (254 opiniones)"
    },
    {
        id: 3,
        nombre: "Transformers SS Breakdown Deluxe",
        descripcion: "Figura de acción coleccionable con detalles premium.",
        precio: 34.99,
        categoria: "Juguetes",
        imagen: "img/producto3.jpg",
        marca: "Transformers",
        tipo: "Figura de acción",
        modelo: "GEN STUDIO SERIES DLX TF2 LATERALES",
        altura: "8,63 pulgadas",
        fabricante: "Hasbro",
        edicion: "Edición coleccionista",
        asin: "B09H272MPK",
        opinion: "4.7 de 5 estrellas (831 opiniones)"
    },
    {
        id: 4,
        nombre: "Transformers SS Megatron LDR",
        descripcion: "Figura de acción coleccionable con detalles premium.",
        precio: 42.99,
        categoria: "Juguetes",
        imagen: "img/producto4.jpg",
        marca: "Transformers",
        tipo: "Figura de acción",
        modelo: "GEN STUDIO SERIE LDR MV6 MEGATRON",
        altura: "10,51 pulgadas",
        fabricante: "Hasbro",
        edicion: "Edición coleccionista",
        asin: "B0CFZ9R1ZH",
        opinion: "4.8 de 5 estrellas (331 opiniones)"
    },
    {
        id: 5,
        nombre: "Transformers SS Starscream Voyager",
        descripcion: "Figura de acción coleccionable con detalles premium.",
        precio: 31.99,
        categoria: "Juguetes",
        imagen: "img/producto5.jpg",
        marca: "Transformers",
        tipo: "Figura en miniatura",
        modelo: "Studio Series Voyager Starscream",
        altura: "9,5 pulgadas",
        fabricante: "Hasbro",
        edicion: "Edición coleccionista",
        asin: "B076Q3ZBDZ",
        opinion: "4.7 de 5 estrellas (515 opiniones)"
    }
];

// 🔥 Guarda productos en localStorage para producto.html
localStorage.setItem('productos', JSON.stringify(productos));

// 🛒 Mostrar productos en el catálogo
function mostrarProductos(lista) {
    catalogo.innerHTML = '';
    lista.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <a href="producto.html?id=${producto.id}" class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
            </a>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito" onclick="agregarAlCarrito(${producto.id}); event.stopPropagation();">
                Agregar al carrito
            </button>
        `;
        catalogo.appendChild(div);
    });
}

// 🛒 Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// 🛒 Actualizar el carrito
function actualizarCarrito() {
    carritoItems.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <strong>${item.nombre}</strong>
                <p>$${item.precio.toFixed(2)} c/u</p>
                <div class="controles-cantidad">
                    <button onclick="cambiarCantidad(${item.id}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="eliminarDelCarrito(${item.id})">❌</button>
        `;
        carritoItems.appendChild(div);
        total += item.precio * item.cantidad;
    });
    totalEl.textContent = total.toFixed(2);
    contadorEl.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// ➕➖ Cambiar cantidad
function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
        actualizarCarrito();
    }
}

// ❌ Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
}

// 🖱️ Listeners
carritoBtn.addEventListener('click', () => carritoPanel.classList.add('mostrar'));
cerrarCarrito.addEventListener('click', () => carritoPanel.classList.remove('mostrar'));
vaciarCarrito.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});
checkoutBtn.addEventListener('click', () => location.href = 'checkout.html');

// 🔍 Filtros y búsqueda
buscarInput.addEventListener('input', filtrarProductos);
categoriaFiltro.addEventListener('change', filtrarProductos);
resetFiltro.addEventListener('click', () => {
    buscarInput.value = '';
    categoriaFiltro.value = '';
    mostrarProductos(productos);
});

// 🔍 Filtrar productos
function filtrarProductos() {
    const search = buscarInput.value.toLowerCase();
    const categoria = categoriaFiltro.value;
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(search) &&
        (categoria === '' || p.categoria === categoria)
    );
    mostrarProductos(filtrados);
}

// 🚀 Inicializar
mostrarProductos(productos);
actualizarCarrito();
