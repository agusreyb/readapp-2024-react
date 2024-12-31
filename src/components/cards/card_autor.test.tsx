import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { vi, describe, test, expect } from 'vitest'
import { AutorCard } from "./card_autor.component";

const mockAutor = { id: 1, nombre: "Gabriel", apellido: "García Márquez", lenguaNativa: "Español" };
const mockFetchFuncion = vi.fn();


describe("AutorCard", () => {

  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    const actualAsObject = actual as { [key: string]: unknown };
    return {
      ...actualAsObject,
      useNavigate: vi.fn(),
    }
  })

  test('deberia redirigir a la página de edicion al hacer clic en el boton editar', () => {

    const mockNavigate = vi.fn();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AutorCard  autor={mockAutor} fetchFuncion={mockFetchFuncion}/>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('edicionAutor'))

    expect(mockNavigate).toHaveBeenCalledWith('/autores/edicion/1')
  })
})
