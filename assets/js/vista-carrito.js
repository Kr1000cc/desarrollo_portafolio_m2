document.addEventListener('DOMContentLoaded', () => {
  const cuerpoCarrito = document.getElementById('cuerpo-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  if (cuerpoCarrito && totalCarrito) {
    renderizarCarrito();
  }

  function renderizarCarrito() {
    cuerpoCarrito.innerHTML = '';
    let sumaTotal = 0;

    if (carrito.length === 0) {
      cuerpoCarrito.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-4">
            <p class="text-muted mb-0">Tu carrito está vacío.</p>
          </td>
        </tr>
      `;
      totalCarrito.textContent = '$0';
      return;
    }

    carrito.forEach((producto, indice) => {
      const subtotal = producto.precio * producto.cantidad;
      sumaTotal += subtotal;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: contain;" class="me-3 border rounded">
            <div>
              <h6 class="mb-0">${producto.nombre}</h6>
              <small class="text-muted">$${producto.precio.toLocaleString('es-CL')}</small>
            </div>
          </div>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-sm btn-outline-secondary btn-restar" data-indice="${indice}">-</button>
            <span class="mx-3 fw-bold">${producto.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary btn-sumar" data-indice="${indice}">+</button>
          </div>
        </td>
        <td class="text-end fw-bold">
          $${subtotal.toLocaleString('es-CL')}
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-danger btn-eliminar" data-indice="${indice}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      cuerpoCarrito.appendChild(fila);
    });

    totalCarrito.textContent = `$${sumaTotal.toLocaleString('es-CL')}`;
  }

  if (cuerpoCarrito) {
    cuerpoCarrito.addEventListener('click', (evento) => {
      const botonResta = evento.target.closest('.btn-restar');
      const botonSuma = evento.target.closest('.btn-sumar');
      const botonEliminar = evento.target.closest('.btn-eliminar');

      if (botonResta) {
        const indice = parseInt(botonResta.dataset.indice);
        if (carrito[indice].cantidad > 1) {
          carrito[indice].cantidad--;
        } else {
           carrito.splice(indice, 1);
        }
        actualizarEstado();
      }

      if (botonSuma) {
        const indice = parseInt(botonSuma.dataset.indice);
        carrito[indice].cantidad++;
        actualizarEstado();
      }

      if (botonEliminar) {
         const indice = parseInt(botonEliminar.dataset.indice);
         carrito.splice(indice, 1);
         actualizarEstado();
      }
    });
  }

  function actualizarEstado() {
    localStorage.setItem('carritoFerreteria', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContador();
  }
});