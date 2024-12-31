import { Autor } from '../../domain/Autor.ts'
import './card_autor.component.css'
import { useNavigate } from 'react-router-dom'
import { accionConfirmada, confirmarAccion } from '../confirmar-accion/confirmarAccion.ts'
import AutoresService from '../../services/autoresService.ts'
import { AccionError, ErrorResponse, mostrarMensajeError } from '../../utils/error-handling.tsx'


type AutorCardProps = {
  autor: Autor,
  fetchFuncion: (textoBusqueda: string) =>Promise<void>,

}

export const AutorCard = ({ autor, fetchFuncion}: AutorCardProps) => {
  const navigate = useNavigate()

  const irAEditarAutor = () => {
    navigate(`/autores/edicion/${autor.id}`)
  }

  const eliminarAutor = async () => {
    try{
      await AutoresService.eliminarAutorService(autor.id)
      accionConfirmada("¡Autor eliminado!")
      await fetchFuncion('')
    }catch(error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(error as ErrorResponse)
      AccionError(errorResponse.response.data.message)
    }
  }

  return (
    <article className="card-autor" data-testid={`autor-${autor.id}`}>
      <section>
            <header>
              <h3>{autor.nombre} {autor.apellido}</h3>
              <div className="flex">
                <button onClick={irAEditarAutor} data-testid="edicionAutor">
                  <img src="src/assets/images/pencil-simple.svg" className="icono" alt="" />
                </button>
                <button onClick={() =>
                  confirmarAccion(
                    eliminarAutor,
                    "¿Seguro que queres borrar este autor?",
                  )
                } data-testid="eliminarAutor">
                  <img src="src/assets/images/trash.svg" className="icono" alt="Eliminar" />
                </button>
              </div>
            </header>
            <h4>{autor.lenguaNativa}</h4>
      </section>
    </article>
  )
}
