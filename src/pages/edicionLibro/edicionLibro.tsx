import { useState } from 'react'
import './edicionLibro.css';
import { useOnInit } from '../../customHooks/useOnInit.ts'
import LibrosService from '../../services/librosService.ts'
import { Libro } from '../../domain/Libro.ts'
import { PlantillaLibros } from '../../components/libros/plantillaLibros.tsx';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { CircularProgressCustom } from '../../components/mui-custom/circular-progress-custom.tsx';

type ContextType = { setTitulo: React.Dispatch<React.SetStateAction<string>> };

export const EdicionLibros = () => {
  // const [enabled, setEnabled] = useState(true)
  const [libro, setLibro] = useState<Libro>(new Libro())
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const { setTitulo } = useOutletContext<ContextType>();

  useOnInit(() => {
    if(+id! == 0 ){
      setTitulo("Nuevo Libro")
      setIsLoading(false)
    }else{
      setTitulo("Edicion Libro")
      buscarLibro(+id!)
    }
    
  })

  const buscarLibro = async (idLibro: number) => {
      try {
        const nuevosLibro = await LibrosService.obtenerLibroByID(idLibro)
        setLibro(nuevosLibro)
        setIsLoading(false)
      } catch(error) {
        console.info(error)
        navigate("/home")
      }
    
  }

  return (
  <main className="formatoContenido">
      {isLoading ? (
        <CircularProgressCustom/>
      ) : (
        <PlantillaLibros libro={libro} /> 
      )}
  </main>
)
}