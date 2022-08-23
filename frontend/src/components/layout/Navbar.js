import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { List } from "phosphor-react";

import { UserContext } from "../../context/UserContext";
import Logo from '../../assets/img/logo.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { authenticated, logout } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.navbar_logo}>
          <img src={Logo} alt="Get a Pet" />
          <h2>Get a Pet</h2>
        </div>
      </Link>

      <ul className={styles.navbar_menuzao}>
        <li>
          <Link to="/">Adotar</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
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

      <a className={styles.btn_menuzinho} onClick={() => setShowMenu(!showMenu)}>
        <List size={32} color="var(--color-title)" weight="bold" />
      </a>

      {/* <ul className={`${styles.navbar_menuzinho} ${showMenu && "mostrar"}`}> */}
      <ul className={styles.navbar_menuzinho} show={showMenu ? "true" : "false"}>
        <li>
          <Link to="/">Adotar um Pet</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}><a>Sair</a></li>
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
