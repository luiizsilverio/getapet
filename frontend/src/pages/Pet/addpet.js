import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage';
import PetForm from '../../components/form/PetForm';
import styles from './AddPet.module.scss';

export default function AddPet() {
  const [token] = useState(localStorage.getItem('getapet:token') || '');
  const {setFlashMessage} = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    })

    await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    })
    .then((response) => {
      console.log(response.data)
      setFlashMessage(response.data.message, 'success');
      navigate('/pet/mypets');
    })
    .catch((error) => {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    })
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Ele ficará disponível para adoção</p>
      </div>

      <PetForm
        btnText="Cadastrar"
        onSubmit={registerPet}
      />
    </section>
  )
}
