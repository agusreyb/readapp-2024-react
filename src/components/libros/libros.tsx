import { useEffect, useState } from 'react'
import './libros.css'
import { useOnInit } from '../../customHooks/useOnInit.ts'
import LibrosService from '../../services/librosService.ts'
import { Libro } from '../../domain/Libro.ts'
import { LibroCard } from '../cards/card-libro.component.tsx'
import { BtnFlotanteMas } from '../mui-custom/btn-flot-mas.tsx'
import { BarraBusqueda } from '../barra-busqueda/barra-busqueda.tsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { sessionStorageService } from '../../services/sessionStorage/sessionStorageService.ts'

type ContextType = { setTitulo: React.Dispatch<React.SetStateAction<string>> };

export const Libros = ()  => {
  const [librosTotales, setLibrosTotales] = useState<Libro[]>([])
  const { setTitulo } = useOutletContext<ContextType>()

  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorageService.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

 
  useOnInit(() => {
    setTitulo('Libros')
    buscarLibros('')
  })

  const buscarLibros = async (textoBusquedaNuevo: string) => {
    
      const nuevosLibros = await LibrosService.obtenerLibros(textoBusquedaNuevo)
      setLibrosTotales(nuevosLibros)
    
  }

  return (
    <main className="librosContainer">
      <div className="formatoContenido">
        <h2 className="h2">Libros</h2>
        <BarraBusqueda buscar={buscarLibros} />

        <div className="cartas-libros-container"> 
          {librosTotales && librosTotales.length > 0
            ? (
              librosTotales.map((libro, id) => (
                <LibroCard key={id} libro={libro} fetchFuncion={buscarLibros}/>
              ))
            ) : (
              <p className="mensajeError">No se encontraron Libros.</p>
            )} 

        </div>
      </div>
      <BtnFlotanteMas url={`/libro/edicion/0`} />
    </main>
    )
}
