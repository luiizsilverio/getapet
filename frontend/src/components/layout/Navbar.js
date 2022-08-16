import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import Logo from '../../assets/img/logo.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { authenticated, logout } = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.navbar_logo}>
          <img src={Logo} alt="Get a Pet" />
          <h2>Get a Pet</h2>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
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
