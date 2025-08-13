import { UsuarioDAO } from '../model/UsuarioDAO.js';

// Clase controlador, coordina entre modelo y vista (parte C del MVC)
export class UsuarioController {
  constructor(viewComponent) {
    this.modelo = new UsuarioDAO();         // Creamos instancia del modelo
    this.viewComponent = viewComponent;       // Vista
  }

  // Método para iniciar el flujo: obtener datos y mostrarlos
  async listarDepartamentos() {
    const departamentos = await this.modelo.listarDepartamentos();    // Llamamos al modelo
    this.viewComponent.listarDepartamentos(departamentos);      // Enviamos los datos a la vista
  }

  async listarEmpleados(){
    const empleados = await this.modelo.listarEmpleados();    // Llamamos al modelo
    this.viewComponent.listarEmpleados(empleados); 
  }

  async obtenerEmpleadosPorDepartamento(departamentoId) {
    const empleados = await this.modelo.obtenerEmpleadosPorDepartamento(departamentoId);
    return empleados; // <-- Esta línea es clave
  }
}
