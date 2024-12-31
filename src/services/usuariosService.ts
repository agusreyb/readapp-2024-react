import axios from 'axios';

const API_URL = 'http://localhost:9000/usuarios/login';

export const usuarioService = {
  validarUsuarioLogin: async (credentials: { mail: string; contrasenia: string }) => {
    const response = await axios.post(API_URL, credentials) 

    
       
    return response.data
    } 
  
};
