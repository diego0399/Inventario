// Importar todos los componentes necesarios para la aplicación
import './src/components/home/home.js'; // Componente para la página de inicio
import './src/components/departamentos/departamentos.js'; // Componente para la página de departamentos

// Importar las rutas definidas en el archivo de rutas
import { routes } from './src/router/router.js';

// Función global para navegar a una ruta sin recargar la página (SPA navigation)
window.navigateTo = function (url) {
  history.pushState(null, null, url); // Cambia la URL sin recargar
  window.dispatchEvent(new Event('popstate')); // Dispara evento para que el enrutador reaccione al cambio
};

// Definición del componente principal de enrutamiento
class App extends HTMLElement {
  constructor() {
    super();
    this.routes = routes; // Asignar las rutas importadas a una propiedad del componente
  }

  connectedCallback() {
    this.render(); // Renderiza el componente al conectarse al DOM
    // Escucha los cambios en la URL (por ejemplo, al usar botones de navegador)
    window.addEventListener('popstate', () => this.render());
  }

  render() {
    let path = window.location.pathname; // Obtener la ruta actual del navegador

    // Normalizar la ruta: si es raíz o index.html, usar la ruta "/"
    if (path === '/' || path === '/index.html') {
      path = '/';
    }

    // Si la ruta existe, renderizar su componente; si no, mostrar el componente por defecto (home)
    this.innerHTML = this.routes[path] || this.routes['/'];
  }
}

// Registrar el componente como <app-router> para usarlo en el HTML
customElements.define('app-router', App);
