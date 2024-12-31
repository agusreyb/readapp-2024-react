import Swal from 'sweetalert2'

const INTERNAL_SERVER_ERROR = 500;

export const mostrarMensajeError = async (error: ErrorResponse) => {
  const status = error.response?.status;
  const mensajeError =
    status >= INTERNAL_SERVER_ERROR
      ? 'Ocurrió un error. Consulte al administrador del sistema.'
      : !status
      ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema.'
      : error.response.data.message;

  if (status >= INTERNAL_SERVER_ERROR) {
    console.error(error);
  }
  return mensajeError
};

export type ErrorResponse = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};


export const AccionError = (errorMessage : string) => {
  Swal.fire({
    icon: 'error',
    title: '  Pucha :(',
    confirmButtonColor: 'var(--color-beige)',
    customClass: {
      title: 'swal-size-title-grande',
      confirmButton: 'swal-size-button',
      popup: 'swal-popup',
      validationMessage: 'swal-size-text-validation',
    },
    didOpen() {
      Swal.showValidationMessage(errorMessage)
    },
  })
}