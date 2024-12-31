import axios from 'axios'

const REST_SERVER_URL = 'http://localhost:9000/indicadores'

class IndicadorService{
    async obtenerIndicadores(): Promise<{ [key: string]: number }> {
        const response = await axios.get<{ [key: string]: number }>(`${REST_SERVER_URL}/totales`)
        return response.data
    }

    async borrarUsuariosInactivos(): Promise<void> {
        const response = await axios.delete(`${REST_SERVER_URL}/usuarios/inactivos`)
        return response.data.message
    }

    async borrarCentrosInactivos(): Promise<void> {
        const response = await axios.delete(`${REST_SERVER_URL}/centros/inactivos`);
        return response.data.message
    }

}

export default new IndicadorService()
