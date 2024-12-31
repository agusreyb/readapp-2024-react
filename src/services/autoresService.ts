import axios from 'axios'
import { Autor, AutorJSON } from '../domain/Autor.ts'

const API_URL = 'http://localhost:9000/autores';

class AutoresService {
  autorAsJson = (autorJSON: AutorJSON) => Autor.fromJson(autorJSON)

  async obtenerAutores(busqueda = ''): Promise<Autor[]>{
    const params = { busqueda }
    const autores = await axios.get<AutorJSON[]>(`${API_URL}/busqueda`, {params})
    return autores.data.map((autorJSON: AutorJSON) => Autor.fromJson(autorJSON))
  }

  async getAutorById(id: number): Promise<Autor>  {
    const autorJSON = await axios.get<AutorJSON>(`${API_URL}/${id}`)
    return this.autorAsJson(autorJSON.data)
  }

  async eliminarAutorService(id: number){
    const response = await axios.delete(`${API_URL}/eliminar-autor/${id}`)
    return response.data
  }

  async modificarAutorService (autorEditado: Autor){
    const response = await axios.put(`${API_URL}/modificar`, autorEditado)
    return response.data.message
  }

  async nuevoAutorService (nuevoAutor : Autor){
    const response = await axios.post(`${API_URL}/nuevo`, nuevoAutor)
    return response.data.message
  }
}

export default new AutoresService()