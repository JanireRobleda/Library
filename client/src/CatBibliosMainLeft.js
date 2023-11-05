import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function CatBibliosMainLeft() {
    return (
        <div id="mainleft">
            <ul>
                <li className="opciones"><Link to='/catbibliosGet'>Catálogo de libros en bibliotecas</Link></li>
                <li className="opciones"><Link to='/catbibliosPost'>Añadir libro a biblioteca</Link></li>
                <li className="opciones"><Link to='/catbibliosDelete'>Borrar libro de biblioteca</Link></li>
            </ul>
        </div>
    )
}

export default CatBibliosMainLeft;