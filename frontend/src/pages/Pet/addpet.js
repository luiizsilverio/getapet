import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage';
import styles from './AddPet.module.scss';

export default function AddPet() {

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
    </section>
  )
}
