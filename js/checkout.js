const resumenItems = document.getElementById('resumen-items');
const resumenTotal = document.getElementById('resumen-total-valor');
const formularioCheckout = document.getElementById('formulario-checkout');
const mensajeExito = document.getElementById('mensaje-exito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarResumen() {
    resumenItems.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</p>
        `;
        resumenItems.appendChild(div);
        total += item.precio * item.cantidad;
    });
    resumenTotal.textContent = total.toFixed(2);
}

formularioCheckout.addEventListener('submit', (e) => {
    e.preventDefault();
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mensajeExito.classList.remove('oculto');
    formularioCheckout.classList.add('oculto');
    resumenItems.innerHTML = '';
    resumenTotal.textContent = '0.00';
});

mostrarResumen();
