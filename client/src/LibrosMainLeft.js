import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function LibrosMainLeft() {
    return (
        <div id="mainleft">
            <ul>
                <li className="opciones"><Link to='/librosGet'>Catálogo de libros</Link></li>
                <li className="opciones"><Link to='/librosPost'>Añadir libro</Link></li>
                <li className="opciones"><Link to='/librosPut'>Modificar datos de libro</Link></li>
                <li className="opciones"><Link to='/librosDelete'>Borrar libro</Link></li>
            </ul>
        </div>
    )
}

export default LibrosMainLeft;