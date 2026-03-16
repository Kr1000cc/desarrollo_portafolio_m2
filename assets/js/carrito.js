let carrito = JSON.parse(localStorage.getItem('carritoFerreteria')) || [];

const actualizarContador = () => {
  const contadorCarrito = document.getElementById('contador-carrito');
  if (contadorCarrito) {
    const totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = totalArticulos;
  }
};

const agregarAlCarrito = (id) => {
  const productoSeleccionado = productos.find(p => p.id === id);
  if (!productoSeleccionado) return;

  const indiceEnCarrito = carrito.findIndex(p => p.id === id);

  if (indiceEnCarrito !== -1) {
    carrito[indiceEnCarrito].cantidad++;
  } else {
    carrito.push({
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem('carritoFerreteria', JSON.stringify(carrito));
  actualizarContador();
};

document.addEventListener('DOMContentLoaded', actualizarContador);