import {  render, screen, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, test, vi } from 'vitest'
import { Libros } from './libros'
import { Libro } from '../../domain/Libro'
import LibrosService from '../../services/librosService'
import { Autor } from '../../domain/Autor'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom' 

const mockLibros: Libro[] = [
    new Libro(
      1, 
      'Libro 1', 
      new Autor(1, 'Autor 1', 'Apellido 1', 'Español'), 
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
    ),
    
    new Libro(
      2, 
      'Libro 2', 
      new Autor(2, 'Autor 2', 'Apellido 2', 'Inglés'), 
      'url_imagen_2', 
      250, 
      85000, 
      2, 
      ['Inglés'], 
      70, 
      false, 
      true, 
      false, 
      0
    ),
]


describe('Libros Component', () => {
  vi.mock('../../services/librosService', () => ({
    default: {
      obtenerLibros: vi.fn(),
    }
  }))

  const mockSetTitulo = vi.fn();
  const MockLayout = () => (
    <Outlet context={{ setTitulo: mockSetTitulo }} />
  )

    test('pruebo que se renderice el titulo de la pagina', async () => {
    
      render(
        <MemoryRouter initialEntries={['/libros']}>
        <Routes>
          <Route path="libros" element={<MockLayout />}>
            <Route index element={<Libros />} />
          </Route>
        </Routes>
      </MemoryRouter>
      )

      await waitFor(() => {
        expect(mockSetTitulo).toHaveBeenCalledWith('Libros')
      })
    })

    
    test('debería setear librosTotales con una lista de libros al renderizar', async () => {
     
      (LibrosService.obtenerLibros as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockLibros)
  
      
      render(
        <MemoryRouter initialEntries={['/libros']}>
        <Routes>
          <Route path="libros" element={<MockLayout />}>
            <Route index element={<Libros />} />
          </Route>
        </Routes>
      </MemoryRouter>
      )

      await waitFor(() => {
        mockLibros.forEach((libro) => {
          expect(screen.getByText(libro.titulo_libro)).toBeInTheDocument()
          expect(screen.getByText(`${libro.cant_pags_libro} páginas`)).toBeInTheDocument();

        })
      })
  
    })
})