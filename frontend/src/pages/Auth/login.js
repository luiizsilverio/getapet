import {useState, useContext} from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from "../../context/UserContext";
import Input from '../../components/form/Input';
import styles from '../../components/form/Form.module.scss';

export default function Login() {
  const [user, setUser] = useState({});
  const {login} = useContext(UserContext);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          onChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </section>
  )
}
