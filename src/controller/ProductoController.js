import { ProductoDAO } from '../model/ProductoDAO.js';

// Clase controlador, coordina entre modelo y vista (parte C del MVC)
export class ProductoController {
  constructor(viewComponent) {
    this.modelo = new ProductoDAO();
    this.viewComponent = viewComponent;       // Vista
  }

  async listarproductos(){
    const productos = await this.modelo.listarproductos();    // Llamamos al modelo
    this.viewComponent.listarproductos(productos); 
  }
}
