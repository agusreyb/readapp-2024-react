import {  fireEvent, render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import {  describe, expect, test, vi } from 'vitest'
import { Libro } from '../../domain/Libro'
import { Autor } from '../../domain/Autor'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { LibroCard } from './card-libro.component'


const libro: Libro = new Libro(
    123,                               
    'Título de Ejemplo',              
    new Autor(1, 'Autor 1', 'Apellido 1', 'Español'), 
    'url_de_imagen.jpg',               
    200,                                
    50000,                             
    3,                                  
    ['Inglés'],                         
    100,                            
    true,                            
    false,                         
    true,                     
    400                                
)
    

describe('LibroCard Component', () => {
   

    vi.mock('react-router-dom', async (importOriginal) => {
        const actual = await importOriginal(); // Obtén las exportaciones originales
        const actualAsObject = actual as { [key: string]: unknown };
        return {
            ...actualAsObject, // Utilizamos el operador spread en el tipo 'actual' afirmado como objeto
            useNavigate: vi.fn(), // Mockea solo useNavigate
        }
    })
    
      
    test('deberia redirigir a la página de edicion al hacer clic en el boton editar', () => {
          
        const mockNavigate = vi.fn();

       
        (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
      
        render(
            <MemoryRouter>
              <LibroCard  libro={libro} fetchFuncion={function (): Promise<void> {
                    throw new Error('Function not implemented.')
                } }/>
            </MemoryRouter>
        )


      const editButton = screen.getByTestId('botonEdit')
      fireEvent.click(editButton)
  
      expect(mockNavigate).toHaveBeenCalledWith(`/libro/edicion/${libro.id}`)
    })
})