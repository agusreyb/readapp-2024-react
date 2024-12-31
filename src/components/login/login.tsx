import { useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import { usuarioService } from '../../services/usuariosService';
import { sessionStorageService } from '../../services/sessionStorage/sessionStorageService';
import './login.css';

export const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({ mail: '', password: '' });

  const navigate = useNavigate();

  const errorMap = {
    mail: [
      { condition: (mail: string) => !mail.trim(), message: 'El campo de correo electrónico no puede estar vacío.' },
      {
        condition: (mail: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail),
        message: 'Introduzca un correo electrónico válido.',
      },
    ],
    password: [
      { condition: (password: string) => !password.trim(), message: 'El campo de contraseña es obligatorio.' },
      { condition: (password: string) => password.length < 8, message: 'La contraseña debe tener al menos 8 caracteres.' },
      {
        condition: (password: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(password), // Cambié para validar carácter especial
        message: 'La contraseña debe contener al menos un carácter especial.',
      },
      {
        condition: (password: string) => !/[0-9]/.test(password),
        message: 'La contraseña debe contener al menos un número.',
      },
      {
        condition: (password: string) => !/[A-Z]/.test(password),
        message: 'La contraseña debe contener al menos una letra mayúscula.',
      },
    ],
  }
  

  const validacionInput = (field: 'mail' | 'password', value: string) => {
    const fieldErrors = errorMap[field]
    const error = fieldErrors
    .find((rule) => rule.condition(value))
    return error ? error.message : ''
  }

  const handleLogin = async () => {
    const mailError = validacionInput('mail', mail)

    if (mailError) {
      setErrorMessages({ mail: mailError, password: '' })
      return;
    }

    const passwordError = validacionInput('password', password)

    if (passwordError) {
      setErrorMessages({ mail: '', password: passwordError })
      return
    }
    
    
    try {
      const response = await usuarioService.validarUsuarioLogin({ mail, contrasenia: password })

      if (response && response.id) {
        sessionStorageService.setItem('userId', response.id.toString())
        navigate('/home'); 

        sessionStorageService.removeItem('userId')
      } else {
        setErrorMessages({ ...errorMessages, mail: response.message })
      }
    } catch (error: unknown) {
      // Errores del service
      let errorMsg = 'Ha ocurrido un error inesperado.'

      if ((error as ErrorResponse).data.message) {
      errorMsg = (error as ErrorResponse).data.message
      } else if (error instanceof Error) {
      errorMsg = error.message
  }

  setErrorMessages({ mail: errorMsg, password: '' })
    }
  
  };

  return (
   <section className="page">
    <div className="login-main-container">
  <form className="login-form">
    <div className="login-title-logIn">
      <img src="src/assets/images/book-bold-white.svg" alt="Logo" />
      <h1>ReadApp</h1>
    </div>

    <div className="login-container">
      <label htmlFor="mail" className="login-label">
        Usuario<span className="login-required">*</span>
      </label>
      <div className="login-input-container">
        <input
          type="text"
          id="mail"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        {errorMessages.mail && <div className="login-error-message">{errorMessages.mail}</div>}
      </div>
    </div>

    <div className="login-container">
      <label htmlFor="contrasenia" className="login-label">
        Contraseña<span className="login-required">*</span>
      </label>
      <div className="login-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          id="contrasenia"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessages.password && <div className="login-error-message">{errorMessages.password}</div>}
        <i
          className="fa-solid fa-eye login-ver-contrasenia"
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
    </div>

    <div className="login-boton-container">
      <button className="login-boton_guardar" type="button" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  </form>
</div>
</section>
  );
}


