import '../../styles/cartas_libros.css'
import { Libro } from '../../domain/Libro'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import LibrosService from '../../services/librosService'
import { accionConfirmada, confirmarAccion } from '../confirmar-accion/confirmarAccion'
import { AccionError, mostrarMensajeError, ErrorResponse } from '../../utils/error-handling'

type LibroCardProps = {
  libro: Libro,
  fetchFuncion: (textoBusqueda: string) =>Promise<void>,

}

export const LibroCard = ({ libro, fetchFuncion}: LibroCardProps) => {  
  const navigate = useNavigate()

  const goToLibroEdicion = () => {
    navigate(`/libro/edicion/${libro.id}`)
  }

  const eliminarLibroPregunta = () => {
    confirmarAccion(eliminarLibro, '¿Seguro que desea eliminar este libro?')
  }
  const eliminarLibro = async () => {
    try{
      await LibrosService.eliminarLibroService(libro.id)
      accionConfirmada("¡Libro eliminado!")
      await fetchFuncion('')
    }catch(error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(error as ErrorResponse)
      AccionError(errorResponse.response.data.message)
    }
  }

return (
  <article className="carta">
    <div className="icono-superior-derecha">
      <IconButton
        aria-label="editar"
        className="icon-button-mui"
        onClick={goToLibroEdicion}
        data-testid="botonEdit"
      >
        <img src="src/assets/images/editar.svg" className="iconos" />
      </IconButton>
      <IconButton
        aria-label="editar"
        className="icon-button-mui"
        onClick={eliminarLibroPregunta}
      >
        <img src="src/assets/images/trash.svg" className="iconos" />
      </IconButton>
    </div>
    <div className="contenido-carta">
      <div className="contenedor-imagen">
        <img
          src={libro.imagen_libro_url}
          alt="Imagen del Libro"
          className="imagen-libro"
        />
      </div>
      <div className="contenedor-texto">
        <header className="primer-division">
          <h3 className="titulo-libro">{libro.titulo_libro || 'Libro'}</h3>
          <div className="iconostrendyycertificate">
            {libro.esDesafiante && (
              <img src="src/assets/images/fire.svg" className="iconos" alt="Hot trendy" />
            )}
            {libro.esBestSeller && (
              <img src="src/assets/images/certificate.svg" className="iconos" alt="Certificado" />
            )}
          </div>
        </header>
        <p className="autor-libro">
          Por {libro.autor.nombre} {libro.autor.apellido}
        </p>
        <ul className="detalles-libro">
          <li>
            <img
              src="src/assets/images/blank-file.svg"
              className="iconoschicos"
              alt="Paginas"
            />
            {libro.cant_pags_libro || 'x'} páginas
          </li>
          <li>
            <img
              src="src/assets/images/text-aa.svg"
              className="iconoschicos"
              alt="Texto"
            />
            {libro.cant_palabras_libro || 'x'} palabras
          </li>
          <li>
            <img
              src="src/assets/images/globe.svg"
              className="iconoschicos"
              alt="Idiomas"
            />
            <span>
              {[libro.autor.lenguaNativa, ...libro.idiomas_libro].join(', ') ||
                'A-B-C-D'}
            </span>
          </li>
          <li>
            <img
              src="src/assets/images/basket.svg"
              className="iconoschicos"
              alt="Ventas"
            />
            {libro.ventas_semanales || 'x'} ventas semanales
          </li>
        </ul>
      </div>
    </div>
  </article>
)
}
