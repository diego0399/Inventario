import { supabase } from '../config/supabaseClient.js';

export class ProductoDAO {

  async obtenerProductosEmpleado(id_empleado) {
    const { data, error } = await supabase.rpc('fn_productos_usuario', {id_empleado: id_empleado,});

    if (error) {
        console.error('Error al obtener los bienes:', error.message);
        return [];
    }

    return data;
  }

  async listarproductos() {
    const { data, error } = await supabase.from('vista_productos').select('*')

    if (error) {
      console.error('Error al obtener los productos:', error.message)
      return []
    }

    return data
  }

 async listarCategorias() {
    const { data, error } = await supabase.from('categoria').select('*');

    if (error) {
      console.error('Error al obtener las categorias:', error.message);
      return [];
    }

    return data;
  }
}
