import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import logoutdoor from './style/logoutdoor.png';


function Header() {
    return (
        <header>
            <div id="headerupper">
                <h1>Bibliotecas municipales de Bilbao</h1>
                <a href="/login"><img src={logoutdoor} alt="Logout door" /></a> 
            </div>
            <div id="menu">
                <Link to="/principal" className="seccionblack">INICIO</Link>
                <Link to="/librosGet" className="seccion">LIBROS</Link>
                <Link to="/bibliotecasGet" className="seccion">BIBLIOTECAS</Link>
                <Link to="/catbibliosGet" className="seccion">CATÁLOGO LIBROS EN BIBLIOTECAS</Link>
                <Link to="/usuariosGet" className="seccion">USUARIOS</Link>
                <Link to="/prestamosGet" className="seccion">PRÉSTAMOS</Link>
                {/* <a className="seccion" href="librosGet.html">LIBROS</a>
                    <a className="seccion" href="bibliotecasGet.html">BIBLIOTECAS</a>
                    <a className="seccion" href="catbibliosGet.html">CATÁLOGO LIBROS EN BIBLIOTECAS</a>
                    <a className="seccion" href="usuariosGet.html">USUARIOS</a>
                    <a className="seccion" href="prestamosGet.html">PRÉSTAMOS</a> */}
            </div>
        </header>
    )
}

export default Header;