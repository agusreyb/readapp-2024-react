import { useEffect, useState } from 'react'
import './indicadores.css'
import { useOnInit } from '../../customHooks/useOnInit.ts'
import IndicadorService from '../../services/indicadoresService/indicadoresServices.ts'
import { accionConfirmada, confirmarAccion } from '../../components/confirmar-accion/confirmarAccion.ts'
import { CircularProgressCustom } from '../mui-custom/circular-progress-custom.tsx'
import { mostrarMensajeError, ErrorResponse, AccionError } from '../../utils/error-handling.tsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { sessionStorageService } from '../../services/sessionStorage/sessionStorageService.ts'

type ContextType = { setTitulo: React.Dispatch<React.SetStateAction<string>> };

const Indicadores = () => {
  const [indicadores, setIndicadores] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState<boolean>(true)
  const { setTitulo } = useOutletContext<ContextType>()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorageService.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

  const cargarIndicadores = async () => {
      
    try{
      const datosIndicadores = await IndicadorService.obtenerIndicadores()
      setIndicadores(datosIndicadores)
      setLoading(false)
    }catch(error){
      await mostrarMensajeError(error as ErrorResponse)
      AccionError("No hay conexión. Intente nuevamente en unos segundos.")
    }
    setLoading(false)
  }

  const iconMap: { [key: string]: string } = {
    "Recomendaciones": "medal.svg",
    "Libros en sistema": "libros.svg",
    "Usuarios totales": "users.svg",
    "Centros de distribución":"storefront.svg"
  }

  useOnInit(() => {
    setTitulo("Dashboard")
  })

  useOnInit(() => {
    setTimeout(() => {
      cargarIndicadores()
    },2000)
  })

  const borrarUsuarios = async () => {
    try {
      await IndicadorService.borrarUsuariosInactivos()
      accionConfirmada("¡Usuarios eliminados!")
      cargarIndicadores()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(error as ErrorResponse)
      AccionError(errorResponse.response.data.message)
    }
  }

  const borrarCentros = async () => {
    try{
      await IndicadorService.borrarCentrosInactivos()
      accionConfirmada("¡Centros eliminados!")
      cargarIndicadores()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(error as ErrorResponse)
      AccionError(errorResponse.response.data.message)
    }
  }


return (
  <>
    <main className="main-page">
        <div className="seccion-indicadores">
        <h2>Indicadores</h2>
          {loading ? (
            <CircularProgressCustom></CircularProgressCustom>
          ): (
              Object.entries(indicadores).map(([key, value]) => (
                    <div key={key} className="card-indicadores">
                        <div className="icon">
                            <img src={`src/assets/images/${iconMap[key]}`} alt={key} />
                        </div>
                        <div className="info-indicadores">
                            <h3>{value}</h3>
                            <p>{key}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
        <section className="seccion-acciones">
            <h2>Acciones</h2>
            <button className="accion-button" onClick={() =>
              confirmarAccion(
                borrarUsuarios,
                "¿Seguro que querés borrar los usuarios inactivos?",
              )
            }>Borrar usuarios inactivos</button>
            <button className="accion-button" onClick={() =>
              confirmarAccion(
                borrarCentros,
                "¿Seguro que queres borrar los centros inactivos?",
              )
            }>Borrar centros inactivos</button>
        </section>
    </main>
  </>
)
}

export default Indicadores