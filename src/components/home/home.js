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
      :host {
        display: block;
        min-height: 100vh;
        background-image: url('https://picsum.photos/1920/1080');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul.nav {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }
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

    const container = document.createElement('div');
    container.className = "container d-flex justify-content-center align-items-center min-vh-100";
    container.innerHTML = `
      <ul class="nav nav-pills flex-column border rounded w-75 p-4 fs-4">
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/" href="#/"><i class="bi bi-house-door-fill"></i> Inicio</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/usuarios" href="#/usuarios"><i class="bi bi-people-fill"></i> Usuarios</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/departamentos" href="#/departamentos"><i class="bi bi-building-fill"></i> Departamentos</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/productos" href="#/productos"><i class="bi bi-box-fill"></i> Productos</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link py-3" data-link="/logout" href="#/logout"><i class="bi bi-box-arrow-in-right"></i> Salir</a>
        </li>
      </ul>
    `;

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

    // También actualiza el link activo si cambia el hash (navegación externa)
    window.addEventListener('hashchange', () => this.updateActiveLink());
  }

  updateActiveLink() {
    // Obtenemos la ruta actual del hash, sin el '#'
    let currentPath = window.location.hash.slice(1);
    if (!currentPath) currentPath = '/';

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
