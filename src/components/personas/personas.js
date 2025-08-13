import { UsuarioController } from '../../controller/UsuarioController.js';

class Personas extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.templateHTML(); //CREA HTML
    this.controller = new UsuarioController(this); //INSTANCIA CONTROLLER

    // Botón regresar
    this.querySelector('#btnRegresar').addEventListener('click', () => {
      window.location.hash = '/';
    });

    // Cargar departamentos
    this.controller.listarEmpleados();
  }

  // 📌 Renderiza departamentos en tabla Grid.js
  listarEmpleados(empleados) {
  const tabla = this.querySelector('#tabla');

  if (!empleados?.length) {
    tabla.innerHTML = '<p>No hay empleados disponibles.</p>';
    return;
  }

  // Crear Grid
  const grid = new window.gridjs.Grid({
    columns: ['Nombre','Carnet','Departamento', 'Bienes'],
    data: empleados.map(emp => [
      emp.nombre,
      emp.carnet,
      emp.departamento,
      gridjs.html(`
        <button 
          type="button"
          title="Bienes" 
          class="btn btn-secondary ver-empleados" 
          data-dep-id="${emp.id}">
          <i class="bi bi-eye-fill"></i> Ver
        </button>
      `)
    ]),
    search: true,
    pagination: { enabled: true, limit: 5 },
    sort: true,
    className: {
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
      if (!botonEnFila) return; // Asegura que la fila contiene info útil

      const id = Number(botonEnFila.getAttribute('data-dep-id'));
      const departamento = empleados.find(emp => emp.id === id);
      if (departamento) {
        this.mostrarModalDepartamento(departamento);
      }
    }
  });
}

  // 📍 Modal detalle de departamento
  mostrarModalDepartamento(departamento) {
    this.querySelector('#modalCod').textContent = departamento.nombre;
    this.querySelector('#modalNombre').textContent = departamento.departamento;

    const modal = new bootstrap.Modal(this.querySelector('#miModal'));
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
          background: url('https://picsum.photos/1920/1080') center/cover no-repeat;
          width: 100%;
          height: 100vh;
        }
        .container {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 10px;
          max-width: 800px;
          margin: auto;
        }
      </style>

      <!-- Contenido principal -->
      <div class="fondo d-flex justify-content-center align-items-center">
        <div class="container text-center">
          <h1>Usuarios</h1>
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

      <!-- Scripts necesarios -->
      <script src="https://unpkg.com/gridjs/dist/gridjs.umd.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    `;
  }
}

customElements.define('personas-component', Personas);
