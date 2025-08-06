class Home extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.setAttribute('rel', 'stylesheet');
    bootstrapCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css');
    shadow.appendChild(bootstrapCSS);

    // Bootstrap Icons CSS
    const iconsCSS = document.createElement('link');
    iconsCSS.setAttribute('rel', 'stylesheet');
    iconsCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css');
    shadow.appendChild(iconsCSS);

    // CSS personalizado
    const style = document.createElement('style');
    style.textContent = `
      /* CSS personalizado */
      .nav-link {
        color: #000;
        transition: color 0.3s, background-color 0.3s;
      }
      .nav-link:hover {
        color: #fff;
        background-color: pink;
      }
      .nav-link.active {
        color: #fff !important;
        background-color: red !important;
      }
    `;
    shadow.appendChild(style);

    // Contenedor con estructura HTML
    const container = document.createElement('div');
    container.className = "border border-dark container d-flex justify-content-center align-items-center min-vh-100";
    container.innerHTML = `
      <ul class="nav nav-pills flex-column border rounded w-75 p-4 fs-4">
        <li class="nav-item mb-2">
          <a class="nav-link active py-3" aria-current="page" href="#">
            <i class="bi bi-house-door-fill"></i> Inicio
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" href="#">
            <i class="bi bi-people-fill"></i> Usuarios
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" href="#">
            <i class="bi bi-building-fill"></i> Departamentos
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" href="#">
            <i class="bi bi-box-fill"></i> Productos
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" href="#">
            <i class="bi bi-box-arrow-in-right"></i> Salir
          </a>
        </li>
      </ul>
    `;

    shadow.appendChild(container);

    // EVENTOS DOM
    const navLinks = container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
}

// Registrar el custom element
window.customElements.define('home-component', Home);
