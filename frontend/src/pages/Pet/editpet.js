import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import api from '../../utils/api';
import styles from './AddPet.module.scss';
import PetForm from '../../components/form/PetForm';
import useFlashMessage from '../../hooks/useFlashMessage';

export default function EditPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('getapet:token') || '');
  const { id } = useParams();
  const {setFlashMessage} = useFlashMessage();

  async function updatePet(pet) {
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

    await api.patch(`pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart-form-data'
      }
    })
    .then((response) => {
      setFlashMessage(response.data.message, 'success');
    })
    .catch((error) => {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    })
  }

  useEffect(() => {
    api.get(`/pets/${id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`
    })
    .then((response) => {
      setPet(response.data.pet);
    })
  }, [token, id]);

  return (
    <section className={styles.pet_header}>
      <div>
        <h1>{pet.name}</h1>
      </div>
      {pet.name && (
        <PetForm onSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  )
}
