import { supabase } from "../../config/supabaseClient.js";
import { Departamento } from "./Departamento.js";
import { Usuario } from "./Usuario.js";

export class UsuarioDAO {
  async listarDepartamentos() {
    const { data, error } = await supabase
      .from("vista_departamentos_empleados")
      .select("*");

    if (error) {
      console.error("Error al obtener los departamentos:", error.message);
      return [];
    }

    return data.map(
      (e) => new Departamento(e.id, e.codigo, e.departamento, e.empleados)
    );
  }

  async listarEmpleados() {
    const { data, error } = await supabase.from("vista_empleados").select("*");

    if (error) {
      console.error("Error al obtener los empleados:", error.message);
      return [];
    }

    return data.map(
      (e) =>
        new Usuario(e.id, e.nombre, e.carnet, e.departamento, e.telefono, "N/A")
    );
  }

  async listarEmpleado(carnet) {
    const { data, error } = await supabase
      .from("vista_empleados")
      .select("*")
      .eq("carnet", carnet); // aquí aplicas el WHERE

    if (error) {
      console.error("Error al obtener los empleados:", error.message);
      return [];
    }

    return data.map(
      (e) =>
        new Usuario(e.id, e.nombre, e.carnet, e.departamento, e.telefono, "N/A")
    );
  }

  async obtenerEmpleadosPorDepartamento(departamentoId) {
    const { data, error } = await supabase.rpc("obtener_empleados", {
      departamento_id: departamentoId,
    });

    if (error) {
      console.error("Error al obtener empleados:", error.message);
      return [];
    }

    return data.map(
      (e) =>
        new Usuario(
          e.id,
          e.nombre,
          e.carnet,
          e.departamento,
          e.telefono,
          e.puesto
        )
    );
  }
}
