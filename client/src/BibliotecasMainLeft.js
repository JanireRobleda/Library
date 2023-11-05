import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function BibliotecasMainLeft() {
    return (
        <div id="mainleft">
            <ul>
                <li className="opciones"><Link to='/bibliotecasGet'>Listado de bibliotecas</Link></li>
                <li className="opciones"><Link to='/bibliotecasPost'>Añadir biblioteca</Link></li>
                <li className="opciones"><Link to='/bibliotecasPut'>Modificar datos de biblioteca</Link></li>
                <li className="opciones"><Link to='/bibliotecasDelete'>Borrar biblioteca</Link></li>
            </ul>
        </div>
    )
}

export default BibliotecasMainLeft;