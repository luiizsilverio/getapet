import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage';
import PetForm from '../../components/form/PetForm';
import styles from './AddPet.module.scss';

export default function AddPet() {

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Ele ficará disponível para adoção</p>
      </div>

      <PetForm
        btnText="Cadastrar"
      />
    </section>
  )
}
