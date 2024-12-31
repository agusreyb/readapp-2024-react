import React, { useEffect, useState } from 'react'
import { Autor } from '../../../domain/Autor.ts'
import { useOnInit } from '../../../customHooks/useOnInit.ts'
import AutoresService from '../../../services/autoresService.ts'
import { AutorCard } from '../../../components/cards/card_autor.component.tsx'
import { BtnFlotanteMas } from '../../../components/mui-custom/btn-flot-mas.tsx'
import { BarraBusqueda } from '../../../components/barra-busqueda/barra-busqueda.tsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { sessionStorageService } from '../../../services/sessionStorage/sessionStorageService.ts'


type ContextType = { setTitulo: React.Dispatch<React.SetStateAction<string>> };

export const BusquedaAutores = () => {
  const [autores, setAutores] = useState<Autor[]>([])
  const { setTitulo } = useOutletContext<ContextType>()

  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorageService.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

  useOnInit(() => {
    setTitulo("Autores")
    buscarAutores('')
  })


  const buscarAutores = async (textoBusquedaNuevo: string) => {
    const autoresEncontrados = await AutoresService.obtenerAutores(textoBusquedaNuevo)
    setAutores(autoresEncontrados)
  }

  return (
    <main className="librosContainer" data-testid="busqueda-autores">
      <div className="formatoContenido">
        <h2 className="h2">Autores</h2>
        <BarraBusqueda buscar={buscarAutores} data-testid="barra-busqueda" />
        <div className="flex fwrap" data-testid="lista-autores">
          {autores.length > 0 ? (
            autores.map((autor, id) => (
              <AutorCard key={id} autor={autor} fetchFuncion={buscarAutores} />
            ))
          ) : (
            <p className="mensajeError" data-testid="mensaje-error">
              No se encontraron autores.
            </p>
          )}
        </div>
      </div>
      <BtnFlotanteMas url="/autores/edicion/0" data-testid="btn-flotante-mas" />
    </main>
  )
}