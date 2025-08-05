class AboutComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Acerca de</h1>
      <p>Esta es una SPA hecha con Web Components sin servidor.</p>
    `;
  }
}

customElements.define('about-component', AboutComponent);