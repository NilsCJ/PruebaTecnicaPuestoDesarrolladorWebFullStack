import Swal from 'sweetalert2';

export const showSuccess = (msg: string) => {
  return Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: msg,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const showError = (msg: string) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: msg,
  });
};

export const showConfirm = async (msg: string) => {
  const result = await Swal.fire({
    icon: 'question',
    title: '¿Estás seguro?',
    text: msg,
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
  });

  return result.isConfirmed;
};
