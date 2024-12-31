import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './login';
import { usuarioService } from '../../services/usuariosService';
import { sessionStorageService } from '../../services/sessionStorage/sessionStorageService';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Login Component', () => {
  beforeEach(() => {
    vi.spyOn(usuarioService, 'validarUsuarioLogin').mockResolvedValue({ id: 1 });
    vi.spyOn(sessionStorageService, 'setItem').mockImplementation(() => {});
    vi.spyOn(sessionStorageService, 'removeItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('debe renderizar los campos de correo y contraseña correctamente', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  test('debe mostrar mensaje de error si el mail es incorrecto', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);

    const mailInput = screen.getByLabelText(/usuario/i);
    fireEvent.change(mailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Introduzca un correo electrónico válido.')).toBeInTheDocument();
    });
  });

  

  test('debe redirigir a home si el login es exitoso', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);

    const mailInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(mailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    const submitButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usuarioService.validarUsuarioLogin).toHaveBeenCalledWith({ mail: 'user@example.com', contrasenia: 'Password123!' });
    });

    expect(sessionStorageService.setItem).toHaveBeenCalledWith('userId', '1');
  });

  /* test('debe mostrar un error general si el servicio de login falla', async () => {
    
    vi.spyOn(usuarioService, 'validarUsuarioLogin').mockRejectedValue(new Error('Error de conexión'));

    render(<BrowserRouter><Login /></BrowserRouter>);

    const mailInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(mailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    const submitButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Ha ocurrido un error inesperado.')).toBeInTheDocument();
    });
  }); */
});
