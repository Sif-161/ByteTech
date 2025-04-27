import "./styles.css"
import logo from "../../assets/logo.png"
import { LuSearch, LuShoppingBag, LuUserRound } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container-menu">
        <ul className="menu">
          <li id="logo">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </li>
          <li id="search">
            <form action="/search" method="get">
              <div className="search-box">
                <input type="text" name="q" placeholder="Pesquisar..." autoComplete="off" />
                <button type="submit" aria-label="Buscar">
                  <LuSearch className="search-icon" />
                </button>
              </div>
            </form>
          </li>
          <li id="icons">
            <div className="icons-wrapper">
              {/*<a href="/cart" aria-label="Carrinho" title="Carrinho">
                <LuShoppingBag className="cart-icon" />
              </a>*/}
              <Link to={"/login"} aria-label="Login" title="Login">
                <LuUserRound className="user-icon" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
      {/*<Navbar />*/}
    </header>
  );
};

{/*const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        {["DEPARTAMENTOS", "HARDWARE", "PC GAMER", "COMPUTADORES", "PERIFÉRICOS", "ESCRITÓRIO"].map((item) => (
          <li key={item}>
            <a href="#"><strong>{item}</strong></a>
          </li>
        ))}
      </ul>
    </nav>
  );
};*/}

export default Header;
