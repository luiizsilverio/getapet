import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import api from "../utils/api";
import styles from './Home.module.scss';

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then(response => {
      setPets(response.data.pets);
    })
  }, []);

  return (
    <section>
      <div className={styles.pet_header}>
        <h1>Adote um Pet</h1>
        <p>Veja as características de cada um e entre em contato com o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              <div
                className={styles.pet_image}
                style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}}
              >
              </div>
              <h3>{pet.name}</h3>
              <p><span className="bold">Peso:</span> {pet.weight}</p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado</p>
              )}
            </div>
          ))
        ) : (
          <p>Não há pets disponíveis para adoção no momento.</p>
        )}
      </div>
    </section>
  )
}
