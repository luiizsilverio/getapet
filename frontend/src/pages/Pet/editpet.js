import styles from './AddPet.module.scss';
import PetForm from '../../components/form/PetForm';

export default function EditPet() {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Edição do Pet: "pet.name"</h1>
      </div>
    </section>
  )
}
