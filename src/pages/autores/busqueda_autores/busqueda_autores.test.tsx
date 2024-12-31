import { render, screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { vi, describe, test, beforeEach, afterEach, expect } from 'vitest'
import { BusquedaAutores } from './busqueda_autores'
import AutoresService from '../../../services/autoresService'
import { Autor } from '../../../domain/Autor.ts'

const mockAutores = [
  new Autor(1, 'Gabriel', 'García Márquez', 'Español'),
  new Autor(1, 'Isabel', 'Allende', 'Español'),
]

describe('Búsqueda Autores', () => {
  const mockSetTitulo = vi.fn()
  const MockLayout = () => <Outlet context={{ setTitulo: mockSetTitulo }} />
  beforeEach(() => {
    vi.mock('../../../services/autoresService', () => ({
      default: {
        obtenerAutores: vi.fn(),
      },
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('el título de la página se renderiza correctamente', async () => {
    render(
      <MemoryRouter initialEntries={['/autores']}>
        <Routes>
          <Route path="autores" element={<MockLayout />}>
            <Route index element={<BusquedaAutores />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(mockSetTitulo).toHaveBeenCalledWith('Autores')
  })

  test('carga autores correctamente', async () => {
    (AutoresService.obtenerAutores as ReturnType<typeof vi.fn>).mockResolvedValue(mockAutores)

    render(
      <MemoryRouter initialEntries={['/autores']}>
        <Routes>
          <Route path="autores" element={<MockLayout />}>
            <Route index element={<BusquedaAutores />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Gabriel García Márquez')).toBeTruthy()
    expect(await screen.findByText('Isabel Allende')).toBeTruthy()
  })
})
