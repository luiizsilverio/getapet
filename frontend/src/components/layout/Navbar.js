import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import Logo from '../../assets/img/logo.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const {authenticated} = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get a Pet" />
        <h2>Get a Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (<p>Logado</p>) : (
          <>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/register">Cadastrar</Link>
          </li>
          </>
        )}
      </ul>
    </nav>
  )
}
