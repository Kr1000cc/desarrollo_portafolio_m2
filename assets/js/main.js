document.addEventListener('DOMContentLoaded', () => {
  const contenedorProductos = document.getElementById('contenedor-productos');

  if (contenedorProductos) {
    productos.forEach(producto => {
      const articulo = document.createElement('article');
      articulo.classList.add('col');
      
      articulo.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="p-3 text-center"> 
            <img src="${producto.imagen}" class="card-img-top object-fit-contain" alt="${producto.nombre}" style="height: 200px" />
          </div>
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-secondary mb-2" style="width: max-content">${producto.categoria}</span>
            <a href="detalle.html?id=${producto.id}" class="text-decoration-none text-dark"><h5 class="card-title mb-1">${producto.marca}</h5></a>
            <p class="card-text text-muted small">${producto.nombre}</p>
            <div class="mt-auto">
              <p class="card-text fs-4 fw-bold text-primary mb-3">$${producto.precio.toLocaleString('es-CL')}</p>
              <button class="btn btn-primary w-100 btn-agregar-carrito" data-id="${producto.id}">
                <i class="bi bi-cart-plus me-2"></i>Agregar al carro
              </button>
            </div>
          </div>
        </div>
      `;
      contenedorProductos.appendChild(articulo);
    });
  }
});

document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-agregar-carrito');
  
  if (boton) {
    const idProducto = parseInt(boton.dataset.id);
    agregarAlCarrito(idProducto); 
  }
});