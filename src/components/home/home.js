class Home extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = ''; // Limpiar

    // Crear e inyectar estilos
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';

    const iconsCSS = document.createElement('link');
    iconsCSS.rel = 'stylesheet';
    iconsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css';

    const style = document.createElement('style');
    style.textContent = `
      .nav-link {
        color: #000;
        transition: color 0.3s, background-color 0.3s;
        cursor: pointer;
      }
      .nav-link:hover {
        color: #fff;
        background-color: black;
      }
      .nav-link.active {
        color: #fff !important;
        background-color: red !important;
      }
    `;

    // Crear HTML
    const container = document.createElement('div');
    container.className = "border border-dark container d-flex justify-content-center align-items-center min-vh-100";
    container.innerHTML = `
      <ul class="nav nav-pills flex-column border rounded w-75 p-4 fs-4">
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/" href="#"><i class="bi bi-house-door-fill"></i> Inicio</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/usuarios" href="#"><i class="bi bi-people-fill"></i> Usuarios</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/departamentos" href="#"><i class="bi bi-building-fill"></i> Departamentos</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/productos" href="#"><i class="bi bi-box-fill"></i> Productos</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/logout" href="#"><i class="bi bi-box-arrow-in-right"></i> Salir</a>
        </li>
      </ul>
    `;

    // Añadir al shadow DOM
    shadow.appendChild(bootstrapCSS);
    shadow.appendChild(iconsCSS);
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Añadir eventos de navegación
    const links = container.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-link');
        window.navigateTo(path);
        this.updateActiveLink();
      });
    });

    this.updateActiveLink();
  }

  updateActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      const path = link.getAttribute('data-link');
      if (path === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

customElements.define('home-component', Home);
