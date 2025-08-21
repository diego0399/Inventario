import { ProductoController } from '../../controller/ProductoController.js';

class Productos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.templateHTML(); // Crea HTML
    this.controller = new ProductoController(this); // Instancia controller

    // Botón regresar
    this.querySelector('#btnRegresar').addEventListener('click', () => {
      window.location.hash = '/';
    });

    // Limpiar modal empleados al cerrarlo
    this.querySelector('#empleados').addEventListener('hidden.bs.modal', () => {
      this.querySelector('#listaEmpleados').innerHTML = '';
    });

    // Cargar departamentos
    this.controller.listarproductos();
  }

  // 📌 Renderiza departamentos en tabla Grid.js
  listarproductos(productos) {
    const tabla = this.querySelector('#tabla');

    if (!productos?.length) {
      tabla.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    // Crear Grid
    const grid = new window.gridjs.Grid({
      columns: ['Inventario', 'Departamento','Acciones'],
      data: productos.map(pro => [
        pro.inventario,
        pro.departamento,
        gridjs.html(`
          <div class="d-flex gap-2">
            <button 
                type="button"
                class="btn btn-sm btn-primary ver-empleados d-flex align-items-center gap-1"
                data-dep-id="${pro.inventario}">
                <i class="bi bi-eye-fill"></i> Detalle
            </button>
            <button 
                type="button"
                class="btn btn-sm btn btn-info ver-empleados d-flex align-items-center gap-1"
                data-dep-id="${pro.inventario}">
                <i class="bi bi-arrows-move"></i> Movimientos
            </button>
         </div>
        `)
      ]),
      search: true,
      pagination: { enabled: true, limit: 5 },
      sort: true,
      className: {
        table: 'table table-hover table-striped align-middle',
        tr: 'gridjs-row-clickable'
      },
      language: {
        search: { placeholder: 'Buscar...' },
        pagination: {
          previous: 'Anterior',
          next: 'Siguiente',
          showing: 'Mostrando',
          results: () => 'registros',
        },
      },
    });

    grid.render(tabla);

    // Delegación de eventos para botones y filas
    tabla.addEventListener('click', async (e) => {
      const boton = e.target.closest('.ver-empleados');
      const fila = e.target.closest('tr');

      // Ver empleados
      if (boton) {
        e.stopPropagation();
        const id = Number(boton.getAttribute('data-dep-id'));
        const departamento = departamentos.find(dep => dep.id === id);
        const empleados = await this.controller.obtenerEmpleadosPorDepartamento(id);
        this.querySelector('#empleadosLabel').textContent = departamento?.departamento || 'Empleados';
        return this.mostrarEmpleadosModal(empleados);
      }

      // Detalle departamento
      if (fila && fila.tagName === 'TR') {
        const botonEnFila = fila.querySelector('.ver-empleados');
        if (!botonEnFila) return;

        const id = Number(botonEnFila.getAttribute('data-dep-id'));
        const departamento = departamentos.find(dep => dep.id === id);
        if (departamento) {
          this.mostrarModalDepartamento(departamento);
        }
      }
    });
  }

  // 📍 Modal detalle de departamento
  mostrarModalDepartamento(departamento) {
    this.querySelector('#modalCod').textContent = departamento.codigo;
    this.querySelector('#modalNombre').textContent = departamento.departamento;

    const modal = new bootstrap.Modal(this.querySelector('#miModal'));
    modal.show();
  }

  // 👥 Modal empleados del departamento
  mostrarEmpleadosModal(empleados) {
    const lista = this.querySelector('#listaEmpleados');
    lista.innerHTML = '';

    if (!empleados?.length) {
      lista.innerHTML = '<li class="list-group-item">No hay empleados registrados.</li>';
    } else {
      empleados.forEach(emp => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const h6 = emp.puesto ? ` - <h6 class="d-inline">${emp.puesto}</h6>` : '';

        li.innerHTML = `${emp.nombre}${h6} - ${emp.carnet}`;
        lista.appendChild(li);
      });
    }
    const modal = new bootstrap.Modal(this.querySelector('#empleados'));
    modal.show();
  }

  // 🧩 HTML del componente con estilos mejorados
  templateHTML() {
    return `
      <!-- Estilos -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

      <style>
        .fondo {
          background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://picsum.photos/1920/1080') center/cover no-repeat;
          width: 100%;
          height: 100vh;
        }

        .container {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: 12px;
          max-width: 900px;
          margin: auto;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .gridjs-container {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .gridjs-table {
          font-size: 0.95rem;
        }

        .gridjs-th {
          background-color: #f8f9fa;
          font-weight: 600;
          text-transform: uppercase;
        }

        .modal-title {
          font-weight: bold;
        }

        .list-group-item {
          font-size: 0.95rem;
        }
      </style>

      
      <!-- Contenido principal -->
      <div class="fondo d-flex justify-content-center align-items-center">
      
        <div class="container text-center">   
            <h1 class="mb-4">Productos</h1>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <button id="btnNuevo" class="btn btn-success btn-sm d-flex align-items-center gap-1">
                <i class="bi bi-plus-circle-fill"></i> Nuevo
            </button>
        </div>
          <div id="tabla" class="my-4"></div>
          <button id="btnRegresar" class="btn btn-secondary">Regresar</button>
        </div>
      </div>

      <!-- Modal Detalle Departamento -->
      <div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="miModalLabel" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="miModalLabel">Detalle del Departamento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <p><strong>Código:</strong> <span id="modalCod"></span></p>
              <p><strong>Nombre:</strong> <span id="modalNombre"></span></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Empleados -->
      <div class="modal fade" id="empleados" tabindex="-1" aria-labelledby="empleadosLabel" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="empleadosLabel"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <ul id="listaEmpleados" class="list-group"></ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Scripts necesarios -->
      <script src="https://unpkg.com/gridjs/dist/gridjs.umd.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    `;
  }
}

customElements.define('productos-component', Productos);
