import { useState } from "react";
import formStyles from './Form.module.scss';
import Input from './Input';
import Select from "./Select";

const colors = [
  'Branco',
  'Preto',
  'Cinza',
  'Caramelo',
  'Mesclado'
];

export default function PetForm({ petData, btnText, onSubmit }) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);

  function onFileChange(e) {
    setPreview([...e.target.files]);
    setPet({...pet, images: [...e.target.files]});
  }

  function handleColor(e) {
    // setPet({...pet, color: e.target.options[e.target.selectedIndex]});
    setPet({...pet, color: e.target.value});
  }

  function handleChange(e) {
    setPet({...pet, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(pet);
  }

  return (
    <form className={formStyles.form_container} onSubmit={handleSubmit}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
            <img
              src={URL.createObjectURL(image)}
              alt={pet.name}
              key={`${pet.name}-${index}`}
            />
          )) : (
            pet.images &&
            pet.images.map((image, index) => (
              <img
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={pet.name}
              key={`${pet.name}-${index}`}
            />
            ))
          )
        }
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        onChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        onChange={handleChange}
        value={pet.name || ''}
      />
      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        onChange={handleChange}
        value={pet.age || ''}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso"
        onChange={handleChange}
        value={pet.weight || ''}
      />
      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        onChange={handleColor}
        value={pet.color || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}
