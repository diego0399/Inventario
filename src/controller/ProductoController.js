import { ProductoDAO } from "../model/ProductoDAO.js";
import { UsuarioDAO } from "../model/UsuarioDAO.js";

// Clase controlador, coordina entre modelo y vista (parte C del MVC)
export class ProductoController {
  constructor(viewComponent) {
    this.modelo = new ProductoDAO();
    this.modelo1 = new UsuarioDAO();
    this.viewComponent = viewComponent; // Vista
  }

  async listarproductos() {
    const productos = await this.modelo.listarproductos(); // Llamamos al modelo
    this.viewComponent.listarproductos(productos);
  }

  async listarcategorias() {
    const categorias = await this.modelo.listarCategorias(); // Llamamos al modelo
    this.viewComponent.listarCategorias(categorias);
  }

  async listarempleado(carnet) {
    const empleado = await this.modelo1.listarEmpleado(carnet);
    return empleado;
  }
}
