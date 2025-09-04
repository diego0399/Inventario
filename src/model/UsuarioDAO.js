import { supabase } from '../config/supabaseClient.js';

export class UsuarioDAO {
  async listarDepartamentos() {
    const { data, error } = await supabase.from('vista_departamentos_empleados').select('*')

    if (error) {
      console.error('Error al obtener los departamentos:', error.message)
      return []
    }

    return data
  }

  async listarEmpleados() {
    const { data, error } = await supabase.from('vista_empleados').select('*')

    if (error) {
      console.error('Error al obtener los empleados:', error.message)
      return []
    }

    return data
  }

  async listarEmpleado(carnet) {
    const { data, error } = await supabase
      .from('vista_empleados')
      .select('*')
      .eq('carnet', carnet) // aquí aplicas el WHERE

    if (error) {
      console.error('Error al obtener los empleados:', error.message)
      return []
    }

    return data
}


  async obtenerEmpleadosPorDepartamento(departamentoId) {
  const { data, error } = await supabase.rpc('obtener_empleados', {departamento_id: departamentoId,});

  if (error) {
    console.error('Error al obtener empleados:', error.message);
    return [];
  }

  return data;
}
}
