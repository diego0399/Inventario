import { supabase } from '../config/supabaseClient.js';

export class UsuarioDAO {
  async listarDepartamentos() {
    const { data, error } = await supabase.from('departamentos').select('*')

    if (error) {
      console.error('Error al obtener los departamentos:', error.message)
      return []
    }

    return data
  }
}
