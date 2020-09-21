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

export {
    simple,
    simpleError
}