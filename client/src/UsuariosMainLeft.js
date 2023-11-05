import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function UsuariosMainLeft() {
    return (
        <div id="mainleft">
            <ul>
                <li className="opciones"><Link to='/usuariosGet'>Listado de usuarios</Link></li>
                <li className="opciones"><Link to='/usuariosPost'>Añadir usuario</Link></li>
                <li className="opciones"><Link to='/usuariosPut'>Modificar datos de usuario</Link></li>
                <li className="opciones"><Link to='/usuariosDelete'>Eliminar usuario</Link></li>
            </ul>
        </div>
    )
}

export default UsuariosMainLeft;