const detalleProducto = document.getElementById('detalle-producto');
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const productos = JSON.parse(localStorage.getItem('productos')) || [];

const producto = productos.find(p => p.id === id);

if (producto) {
    document.getElementById('titulo-producto').textContent = producto.nombre;
    detalleProducto.innerHTML = `
        <div class="detalle-container">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-imagen">
            <div class="detalle-info">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p class="precio-detalle">💵 $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})" class="agregar-carrito">
                    🛒 Agregar al carrito
                </button>

                <h3>📋 Especificaciones</h3>
                <table class="tabla-especificaciones">
                    <tr><th>Marca</th><td>${producto.marca}</td></tr>
                    <tr><th>Tipo</th><td>${producto.tipo}</td></tr>
                    <tr><th>Modelo</th><td>${producto.modelo}</td></tr>
                    <tr><th>Altura</th><td>${producto.altura}</td></tr>
                    <tr><th>Fabricante</th><td>${producto.fabricante}</td></tr>
                    <tr><th>Edición</th><td>${producto.edicion}</td></tr>
                    <tr><th>ASIN</th><td>${producto.asin}</td></tr>
                    <tr><th>Opinión Clientes</th><td>${producto.opinion}</td></tr>
                </table>
            </div>
        </div>
    `;
} else {
    detalleProducto.innerHTML = "<p>Producto no encontrado.</p>";
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const prod = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("🛒 Producto agregado al carrito!");
}
