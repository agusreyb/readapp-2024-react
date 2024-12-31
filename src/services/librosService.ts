import axios from 'axios';
import { Libro, LibroJSON } from '../domain/Libro';

const API_URL = 'http://localhost:9000/libros';

class LibrosService {

    obtenerLibros = async (busqueda = ''): Promise<Libro[]> => {
        const params = { busqueda }
        const response = await axios.get<LibroJSON[]>(`${API_URL}/busqueda/autorcompleto`, { params })
        return response.data.map((libroJSON: LibroJSON) => Libro.fromJson(libroJSON))
    }

    obtenerLibroByID = async (idLibro: number): Promise<Libro> => {
        const response = await axios.get<LibroJSON>(`${API_URL}/completo/autorcompleto/${idLibro}`)

        return Libro.fromJson(response.data);
    }

    obtenerIdiomasDisponibles = async (): Promise<string[]> => {
        const response = await axios.get<string[]>(`${API_URL}/idiomas/disponibles`);
        return response.data
    }

    nuevoLibroService = async (nuevoLibro: Libro): Promise<void> => {
        const response = await axios.post(`${API_URL}/nuevo`, nuevoLibro)
        return response.data.message
    }

    actualizarLibroService = async (libroEditado: Libro): Promise<void> => {
        const response = await axios.put(`${API_URL}/actualizar/${libroEditado.id}`, libroEditado)
        return response.data.message
    }

    eliminarLibroService = async (id: number) => {
        const response = await axios.delete(`${API_URL}/eliminar-libro/${id}`)
        return response.data
    }
}

export default new LibrosService()