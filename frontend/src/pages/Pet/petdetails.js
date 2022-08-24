import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage';
import styles from './PetDetails.module.scss';

export default function PetDetails() {
  const [pet, setPet] = useState({});
  const {id} = useParams();
  const {setFlashMessage} = useFlashMessage();
  const [token] = useState(localStorage.getItem('getapet:token') || '');
  const [msgVisita, setMsgVisita] = useState('');

  async function schedule() {
    await api.patch(`pets/schedule/${id}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setFlashMessage(response.data.message, 'success');
      setMsgVisita("Visita agendada com sucesso.");
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
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    })
  }, [id])

  if (pet.name) {
    return (
      <section className={styles.pet_container}>
        <div className={styles.pet_header}>
          <h1>Conhecendo o pet: {pet.name}</h1>
          {msgVisita ? (
            <p>{ msgVisita }</p>
          ) : (
            <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
          )}
        </div>
        <div className={styles.pet_images}>
          {pet.images.map((image, index) => (
            <img
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={pet.name}
              key={index}
            />
          ))}
        </div>
        <p><span className="bold">Peso: </span>{pet.weight}</p>
        <p><span className="bold">Idade: </span>{pet.age}</p>
        {token ? (
          <button onClick={schedule} disabled={!!msgVisita}>
            Solicitar uma Visita
          </button>
        ) : (
          <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita.</p>
        )}
      </section>
    )
  }
}