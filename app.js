// Importar todos los componentes
import './src/components/home/home.js';
import './src/components/departamentos/departamentos.js';
import './src/components/personas/personas.js';
import './src/components/productos/productos.js';
import { routes } from './src/router/router.js';

// Función global para navegar usando hash
window.navigateTo = function (hash) {
  window.location.hash = hash;
  window.dispatchEvent(new Event('hashchange'));
};

class App extends HTMLElement {
  constructor() {
    super();
    this.routes = routes;
  }

  connectedCallback() {
    this.render();
    window.addEventListener('hashchange', () => this.render());
  }

  render() {
    // Obtener la ruta del hash, sin el símbolo '#'
    let path = window.location.hash.slice(1);

    // Normalizar rutas vacías o raíz
    if (!path || path === '/') {
      path = '/';
    }

    // Mostrar componente si existe en rutas, o fallback al componente home
    this.innerHTML = this.routes[path] || this.routes['/'];
  }
}

customElements.define('app-router', App);
