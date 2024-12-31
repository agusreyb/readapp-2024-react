import { useState } from 'react'
import './barra-busqueda.css';

interface BarraBusquedaProps {
  buscar: (texto: string) => void
}

export const BarraBusqueda = ({ buscar }: BarraBusquedaProps) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')

  const manejarBusqueda = () => {
      buscar(textoBusqueda)
  }

  return (
    <div className="barra-busqueda flex wrap">
      <input
        type="text"
        placeholder='Buscar...'
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
        data-testid="texto"
      />
      <button
        type="button"
        onClick={manejarBusqueda}
        data-testid="botonBuscar"
      >
        <img src="src/assets/images/magnifying-glass-bold.svg" width="20px" height="15px" />
      </button>
    </div>
  )
}
