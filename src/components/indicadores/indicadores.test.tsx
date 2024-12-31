import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import IndicadorService from '../../services/indicadoresService/indicadoresServices'
import Swal from 'sweetalert2'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import Indicadores from './indicadores.tsx'
import { act } from 'react'

const mockIndicadores = {
  Recomendaciones: 45,
  'Libros en sistema': 120,
  'Usuarios totales': 75,
  'Centros de distribución': 10,
}

describe('Indicadores', () => {
  const mockSetTitulo = vi.fn()
  const MockLayout = () => <Outlet context={{ setTitulo: mockSetTitulo }} />

  beforeEach(async () => {

    await act(async () => {

      vi.spyOn(IndicadorService, 'obtenerIndicadores').mockResolvedValue(mockIndicadores)
      vi.spyOn(IndicadorService, 'borrarUsuariosInactivos').mockResolvedValue()
      vi.spyOn(IndicadorService, 'borrarCentrosInactivos').mockResolvedValue()
      vi.spyOn(Swal, 'fire').mockResolvedValue({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false
      })

    })
  })

  describe('cuando se confirman las acciones', () => {

    test('se llama al servicio para borrar usuarios inactivos', async () => {
      render(
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="home" element={<MockLayout />}>
              <Route index element={<Indicadores />} />
            </Route>
          </Routes>
        </MemoryRouter>,
      )
      const botonBorrarUsuarios = await screen.findByText('Borrar usuarios inactivos')
      botonBorrarUsuarios.click()

      await waitFor(() => expect(IndicadorService.borrarUsuariosInactivos).toHaveBeenCalled())
    })

    test('se llama al servicio para borrar centros inactivos', async () => {
      render(
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="home" element={<MockLayout />}>
              <Route index element={<Indicadores />} />
            </Route>
          </Routes>
        </MemoryRouter>,
      )
      const botonBorrarCentros = await screen.findByText('Borrar centros inactivos')
      botonBorrarCentros.click()

      await waitFor(() => expect(IndicadorService.borrarCentrosInactivos).toHaveBeenCalled())
    })
  })

  describe('cuando el servicio responde correctamente', () => {
    test('se muestran los indicadores y sus íconos en la página', async () => {
      render(
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="home" element={<MockLayout />}>
              <Route index element={<Indicadores />} />
            </Route>
          </Routes>
        </MemoryRouter>,
      )
      setTimeout(() => {
        expect( screen.findByText('Recomendaciones')).toBeInTheDocument()
        expect( screen.findByText('45')).toBeInTheDocument()


        expect( screen.findByText('Libros en sistema')).toBeInTheDocument()
        expect( screen.findByText('120')).toBeInTheDocument()

        expect( screen.findByText('Usuarios totales')).toBeInTheDocument()
        expect( screen.findByText('75')).toBeInTheDocument()

        expect( screen.findByText('Centros de distribución')).toBeInTheDocument()
        expect( screen.findByText('10')).toBeInTheDocument()
      }, 1000)
      })
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })
})
