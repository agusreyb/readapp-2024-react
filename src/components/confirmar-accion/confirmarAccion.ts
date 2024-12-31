import Swal from "sweetalert2";

export const confirmarAccion = async (
  accion: () => Promise<void>,  
  mensaje: string,            
) => {
  Swal.fire({
    title: mensaje,
    icon: 'warning',
    showCancelButton: true,
    heightAuto: true,
    confirmButtonColor: 'var(--color-bordo)',
    cancelButtonColor: 'var(--color-beige)',
    confirmButtonText: "Sí, estoy seguro!",
    cancelButtonText: "Cancelar",
    customClass: {
      title: 'swal-size-title',
      confirmButton: 'swal-size-button',
      cancelButton: 'swal-size-button',
      popup: 'swal-popup'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      accion()
    }
  })
}

export const accionConfirmada = ( mensajeSatisfactorio : string ) => {
  Swal.fire({
    title: mensajeSatisfactorio,
    icon: "success",
    confirmButtonColor: 'var(--color-beige)',
    customClass: {
      title: 'swal-size-title-grande',
      confirmButton: 'swal-size-button',
      popup: 'swal-popup'
    }
  })
}

