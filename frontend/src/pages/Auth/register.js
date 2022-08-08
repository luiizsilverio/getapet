import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import styles from "../../components/form/Form.module.scss";

export default function Register() {

  function handleChange(e) {

  }

  return (
    <section className={styles.form_container}>
      <h1>Cadastro</h1>
      <form>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          onChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Telefone"
          onChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
        />
        <Input
          text="Confirme a Senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a senha"
          onChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  )
}
