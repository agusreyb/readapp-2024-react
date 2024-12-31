import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, expect, test, beforeEach, describe, afterEach } from 'vitest'
import { Libro } from '../../domain/Libro.ts'
import { Autor } from '../../domain/Autor.ts'
import { BrowserRouter } from 'react-router-dom'
import { PlantillaLibros } from './plantillaLibros.tsx'
import LibrosService from '../../services/librosService.ts'
import AutoresService from '../../services/autoresService.ts'

const mockLibro: Libro = new Libro(
  1,
  'Libro 1',
  new Autor(1, 'Roberto', 'Carlos', 'Español'),
  'url_imagen_1',
  300,
  100000,
  1,
  ['Español'],
  50,
  true,
  false,
  true,
  300
)

const mockAutoresObtenidos = [
  new Autor(1, 'Roberto', 'Carlos', 'Español'),
  new Autor(2, 'Juan', 'Gomez', 'Inglés'),
]

const mockIdiomasDisponibles = ['Inglés', 'Español']

describe('Plantilla Libros', () => {
  beforeEach(async () => {
    vi.spyOn(AutoresService, 'obtenerAutores').mockResolvedValue(mockAutoresObtenidos)
    vi.spyOn(LibrosService, 'obtenerIdiomasDisponibles').mockResolvedValue(mockIdiomasDisponibles)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('debería renderizar el título del libro en el formulario (solo para ver si anda)', () => {
    render(
      <BrowserRouter>
        <PlantillaLibros libro={mockLibro} />
      </BrowserRouter>
    )
    const titulo = screen.getByText('Libro')
    expect(titulo).toBeInTheDocument()
  })


  test('debería renderizar correctamente los valores del mockLibro en los CustomTextField', async () => {
    render(
      <BrowserRouter>
        <PlantillaLibros libro={mockLibro} />
      </BrowserRouter>
    )

    setTimeout(() => {
      waitFor(() => {
        const tituloInput = (screen.getByLabelText(/Titulo/i) as HTMLInputElement).value
        expect(tituloInput).toBe(mockLibro.titulo_libro)

        const edicionesInput = (screen.getByTestId('EdicionesCtmTextField') as HTMLInputElement).value
        expect(edicionesInput).toBe(mockLibro.cant_ediciones.toString())

        const paginasInput = (screen.getByLabelText('Cantidad de paginas') as HTMLInputElement).value
        expect(paginasInput).toBe(mockLibro.cant_pags_libro.toString())

        const palabrasInput = (screen.getByLabelText('Cantidad de palabras') as HTMLInputElement).value
        expect(palabrasInput).toBe(mockLibro.cant_palabras_libro.toString())

        const ventasInput = (screen.getByLabelText('Ventas semanales')  as HTMLInputElement).value
        expect(ventasInput).toBe(mockLibro.ventas_semanales.toString())

        const lecturaComplejaCheckbox = (screen.getByTestId('checkbox-lecturacompleja')as HTMLInputElement).value
        expect(lecturaComplejaCheckbox).toBe(mockLibro.esDesafiante)
      })
    }, 1000)
  })

  test('debería renderizar correctamente los idiomas', async () => {
    setTimeout(() => {
      const idiomaAutorCheckbox = (screen.getByTestId('checkbox-idiomaautor')as HTMLInputElement).value
      expect(idiomaAutorCheckbox).toBe(mockLibro.esDesafiante)

      const idiomasCheckboxes = (screen.getAllByTestId('checkbox-idiomas'))
      expect(idiomasCheckboxes.length).toBe(1)
      console.log(idiomasCheckboxes)
    }, 1000)
  })

})
