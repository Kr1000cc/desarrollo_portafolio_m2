document.addEventListener('DOMContentLoaded', () => {
  const parametrosURL = new URLSearchParams(window.location.search);
  const idProducto = parseInt(parametrosURL.get('id'));

  if (!idProducto) return;

  const producto = productos.find(p => p.id === idProducto);

  const contenedorPrincipal = document.getElementById('contenedor-principal-detalle');

  if (producto) {
    document.getElementById('detalle-imagen').src = producto.imagen;
    document.getElementById('detalle-imagen').alt = producto.nombre;
    document.getElementById('detalle-categoria').textContent = producto.categoria;
    document.getElementById('detalle-nombre').textContent = producto.nombre;
    document.getElementById('detalle-precio').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    
    document.getElementById('detalle-descripcion').textContent = producto.detalle;
    
    document.getElementById('btn-agregar-detalle').dataset.id = producto.id;
    
    document.title = `Detalle - ${producto.nombre} | Ferretería Pellahuén`;
  } else {
    contenedorPrincipal.innerHTML = `
      <div class="text-center py-5">
        <h2 class="display-6 text-muted mb-4">Material no encontrado</h2>
        <a href="index.html" class="btn btn-primary btn-lg">Volver al catálogo</a>
      </div>
    `;
  }
});