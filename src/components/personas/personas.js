import { UsuarioController } from '../../controller/UsuarioController.js';

class Personas extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.templateHTML(); // CREA HTML
    this.controller = new UsuarioController(this); // INSTANCIA CONTROLLER

    // Botón regresar
    this.querySelector('#btnRegresar').addEventListener('click', () => {
      window.location.hash = '/';
    });

    // Cargar empleados
    this.controller.listarEmpleados();
  }

  // 📌 Renderiza empleados en tabla Grid.js
  listarEmpleados(empleados) {
    const tabla = this.querySelector('#tabla');

    if (!empleados?.length) {
      tabla.innerHTML = '<p>No hay empleados disponibles.</p>';
      return;
    }

    // Crear Grid
    const grid = new window.gridjs.Grid({
      columns: ['Nombre', 'Carnet', 'Departamento','Telefono', 'Bienes'],
      data: empleados.map(emp => [
        emp.nombre,
        emp.carnet,
        emp.departamento,
        emp.telefono && emp.telefono !== 'N/A' ? '2593 - ' + emp.telefono : '',
        gridjs.html(`
          <button 
            type="button"
            title="Ver bienes" 
            class="btn btn-sm btn-primary ver-empleado d-flex align-items-center gap-1"
            data-emp-id="${emp.id}">
            <i class="bi bi-eye-fill"></i> Ver
          </button>
        `)
      ]),
      search: true,
      pagination: { enabled: true, limit: 5 },
      sort: true,
      className: {
        table: 'table table-striped table-hover align-middle',
        tr: 'gridjs-row-clickable',
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

    // Delegación de eventos
    tabla.addEventListener('click',async (e) => {
      const boton = e.target.closest('.ver-empleado');
      const fila = e.target.closest('tr');

      // Ver bienes
      if (boton) {
        e.stopPropagation();
        const id = Number(boton.getAttribute('data-emp-id')); // ✅ Correcto
        const empleado = empleados.find(emp => emp.id === id);
        console.log(id);
        const bienes = await this.controller.obtenerProductosEmpleado(id);
        this.querySelector('#productosLabel').textContent = empleado?.nombre || 'Bienes';
        return this.mostrarEmpleadosProductosModal(bienes);
      }

      if (fila && fila.tagName === 'TR') {
        const botonEnFila = fila.querySelector('.ver-empleado');
        if (!botonEnFila) return;

        const id = Number(botonEnFila.getAttribute('data-emp-id'));
        const empleado = empleados.find(emp => emp.id === id);
        if (empleado) this.mostrarModalEmpleado(empleado);
      }
    });
  }

  // 📍 Modal detalle del empleado
  mostrarModalEmpleado(empleado) {
    this.querySelector('#modalNombre').textContent = empleado.nombre;
    this.querySelector('#modalDepartamento').textContent = empleado.departamento;
    this.querySelector('#modalCarnet').textContent = empleado.carnet;

    const modal = new bootstrap.Modal(this.querySelector('#miModal'));
    modal.show();
  }

  // 👥 Modal empleados del departamento
  mostrarEmpleadosProductosModal(bienes) {
    const lista = this.querySelector('#listaproductos');
    lista.innerHTML = '';

    if (!bienes?.length) {
      lista.innerHTML = '<li class="list-group-item">No hay bienes asignados.</li>';
    } else {
      bienes.forEach(pro => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${pro.inventario} - ${pro.categoria}`;
        lista.appendChild(li);
      });
    }

    const modal = new bootstrap.Modal(this.querySelector('#productos'));
    modal.show();
  }

  // 🧩 HTML del componente
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
          cursor:pointer;
        }

        .gridjs-table {
          font-size: 0.85rem;
        }

        .gridjs-th {
          background-color: #030d2bff !important;
          color: white !important;
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
          <h1 class="mb-4">Usuarios</h1>
          <div id="tabla" class="my-4"></div>
          <button id="btnRegresar" class="btn btn-secondary">Regresar</button>
        </div>
      </div>

      <!-- Modal Detalle Empleado -->
      <div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="miModalLabel" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="miModalLabel">Detalle del Empleado</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body text-start">
              <p><strong>Nombre:</strong> <span id="modalNombre"></span></p>
              <p><strong>Carnet:</strong> <span id="modalCarnet"></span></p>
              <p><strong>Departamento:</strong> <span id="modalDepartamento"></span></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Productos -->
      <div class="modal fade" id="productos" tabindex="-1" aria-labelledby="productosLabel" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productosLabel"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <ul id="listaproductos" class="list-group"></ul>
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

customElements.define('personas-component', Personas);
