const routes = {
  '/': 'home-component',
  '/about': 'about-component'
};

export function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash || '#/';
  const path = hash.slice(1); // elimina el "#"
  const tag = routes[path] || 'home-component'; // default al home si no existe

  app.innerHTML = `<${tag}></${tag}>`;
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
}
