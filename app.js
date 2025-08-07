// Importar todos los componentes
import './src/components/home/home.js';
import './src/components/departamentos/departamentos.js';
import { routes } from './src/router/router.js';

// Función global para navegar sin recargar la página
window.navigateTo = function (url) {
  history.pushState(null, null, url);
  window.dispatchEvent(new Event('popstate'));
};

class App extends HTMLElement {
  constructor() {
    super();
    this.routes = routes;
  }

  connectedCallback() {
    this.render();
    window.addEventListener('popstate', () => this.render());
  }

  render() {
    let path = window.location.pathname;

    // Normalizar index.html y rutas vacías
    if (path === '/' || path === '/index.html') {
      path = '/';
    }

    // Mostrar componente si existe en rutas, o fallback al componente home
    this.innerHTML = this.routes[path] || this.routes['/'];
  }
}

customElements.define('app-router', App);