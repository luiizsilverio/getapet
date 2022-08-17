import { toast } from 'react-toastify';
// import bus from '../utils/bus';

export default function useFlashMessage() {

  function setFlashMessage(message, type) {

    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }

/*
    // não é mais necessário
    bus.emit('flash', {
      message,
      type
    })
*/

  }

  return { setFlashMessage }
}
