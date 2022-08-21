import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import RoundedImage from '../../components/layout/RoundedImage';
import api from '../../utils/api';
import styles from './Pet.module.scss';

export default function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('getapet:token') || '');

  useEffect(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then(response => setPets(response.data.pets));
  }, [token])

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_item}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p><span className="bold">Ligue para:</span> {pet.user.phone}</p>
                <p><span className="bold">Fale com:</span> {pet.user.name}</p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em andamento</p>
                ) : (
                  <p>Você já adotou esse pet</p>
                )}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && (
          <p>Ainda não há nenhuma adoção de pets.</p>
        )}
      </div>
    </section>
  )
}