import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const simple = (title) => {
    const swal = withReactContent(Swal);
    return swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
};

const simpleError = title => {
    const swal = withReactContent(Swal);
    return swal.fire({
        position: 'top-end',
        icon: 'error',
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
};

const confirmation = () => {
    const swal = withReactContent(Swal);
    return swal.fire({
        title: '¿Estás seguro de querer borrar la publicación?',
        text: "La publicación se borrará permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    })
};

export {
    simple,
    simpleError,
    confirmation
}