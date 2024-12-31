//import { Autor } from '../../../domain/Autor.ts'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import LibrosService from '../../../services/librosService.ts'
import { render/*, screen*/ } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { EdicionAutores } from './edicion_autores.tsx'

//const mockAutor = new Autor(1, 'Roberto', 'Carlos', 'Español')

const mockIdiomasDisponibles = ['Inglés', 'Español']

describe('Edición Autores', () => {
  const mockSetTitulo = vi.fn()
  const MockLayout = () => <Outlet context={{ setTitulo: mockSetTitulo }} />

  beforeEach(async () => {
    vi.spyOn(LibrosService, 'obtenerIdiomasDisponibles').mockResolvedValue(mockIdiomasDisponibles)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('el título de la página se renderiza correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/autores']}>
        <Routes>
          <Route path="autores" element={<MockLayout />}>
            <Route index element={<EdicionAutores />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(mockSetTitulo).toHaveBeenCalledWith('Edición Autor')
  })


  // test('se renderizan correctamente los valores del autor en los input', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/autores']}>
  //       <Routes>
  //         <Route path="autores" element={<MockLayout />}>
  //           <Route index element={<EdicionAutores />} />
  //         </Route>
  //       </Routes>
  //     </MemoryRouter>,
  //   )
  //
  //   const nombreInput = (screen.getByTestId('nombre_autor') as HTMLInputElement).value
  //   expect(nombreInput).toBe(mockAutor.nombre)
  //   const apellidoInput = (screen.getByTestId('apellido_autor') as HTMLInputElement).value
  //   expect(apellidoInput).toBe(mockAutor.apellido)
  //
  // })
})
