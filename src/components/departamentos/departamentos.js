import { UsuarioController } from '../../controller/UsuarioController.js';

class Departamentos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <!-- Estilos -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" rel="stylesheet" />

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

      <!-- Contenido -->
      <div class="fondo d-flex justify-content-center align-items-center">
        <div class="container text-center">
          <h1>Departamentos</h1>
          <div id="tabla" class="my-4"></div>
          <button id="btnRegresar" class="btn btn-secondary">Regresar</button>
        </div>
      </div>

      <!-- Modal Bootstrap -->
      <div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="miModalLabel" aria-hidden="true">
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

    this.querySelector('#btnRegresar').addEventListener('click', () => {
      window.location.href = '/';
    });

    new UsuarioController(this).listarDepartamentos();
  }

  listarDepartamentos(departamentos) {
    const tabla = this.querySelector('#tabla');

    if (!departamentos?.length) {
      tabla.innerHTML = '<p>No hay departamentos disponibles.</p>';
      return;
    }

    // Instancia Grid.js y guarda referencia para acceder al tbody luego
    const grid = new window.gridjs.Grid({
      columns: ['Código', 'Nombre'],
      data: departamentos.map(dep => [dep.cod, dep.nombre]),
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

    // Esperamos a que se rendericen las filas
    setTimeout(() => {
      const filas = this.querySelectorAll('.gridjs-table tbody tr');
      filas.forEach((fila, index) => {
        fila.style.cursor = 'pointer';
        fila.addEventListener('click', () => {
          const departamento = departamentos[index];
          this.mostrarModal(departamento);
        });
      });
    }, 200); // le damos un breve tiempo para asegurar el renderizado
  }

  mostrarModal(departamento) {
    this.querySelector('#modalCod').textContent = departamento.cod;
    this.querySelector('#modalNombre').textContent = departamento.nombre;

    const modal = new bootstrap.Modal(this.querySelector('#miModal'));
    modal.show();
  }
}

customElements.define('departamentos-component', Departamentos);
