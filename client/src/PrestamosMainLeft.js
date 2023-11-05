import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function PrestamosMainLeft() {
    return (
        <div id="mainleft">
            <ul>
                <li className="opciones"><Link to='/prestamosGet'>Listado de préstamos activos</Link></li>
                <li className="opciones"><Link to='/prestamosPost'>Realizar préstamo</Link></li>
                <li className="opciones"><Link to='/prestamosDelete'>Devolver libro</Link></li>
                <li className="opciones"><Link to='/prestamosHistGet'>Historial de préstamos finalizados</Link></li>
            </ul>
        </div>
    )
}

export default PrestamosMainLeft;