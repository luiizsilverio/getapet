import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

export default function MyPets() {
  const [pets, setPets] = useState([]);

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div>
        {pets.length > 0 && <p>Meus Pets cadastrados</p>}
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  )
}
