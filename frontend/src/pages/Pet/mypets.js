import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import RoundedImage from '../../components/layout/RoundedImage';
import useFlashMessage from '../../hooks/useFlashMessage';
import api from '../../utils/api';
import styles from "./Pet.module.scss";

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('getapet:token') || '');
  const {setFlashMessage} = useFlashMessage();

  async function concludeAdoption(id) {
    console.log(id)
    await api.post(`/pets/conclude/${id}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      const idx = pets.findIndex(pet => pet._id === id)
      if (idx >= 0) {
        const newPets = [...pets];
        newPets[idx].available = false;
        setPets([...newPets]);
      }
      setFlashMessage(response.data.message, 'success');
    })
    .catch((error) => {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    });
  }

  async function removePet(id) {
    await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      const newPets = pets.filter((pet) => pet._id !== id);
      setPets(newPets);
      setFlashMessage(response.data.message, 'success');
      return response.data;
    })
    .catch((error) => {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    });
  }


  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => setPets(response.data.pets))

  }, [token]);


  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
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
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => concludeAdoption(pet._id)}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      className={styles.pet_del}
                      onClick={() => removePet(pet._id)}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet adotado</p>
                )}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  )
}
