

function Principal() {
    return (
        <main>
            <div id="mainleft">
                {/* <ul>
                    <li className="opciones"><a href="librosGet.html">Catálogo de libros</a></li>
                    <li className="opciones"><a href="librosPost.html">Añadir libro</a></li>
                    <li className="opciones"><a href="librosPut.html">Modificar datos de libro</a></li>
                    <li className="opciones"><a href="librosDelete.html">Borrar libro</a></li>
                </ul> */}
            </div>
            <div id="mainright">
                <h1 className="us">Bienvenid@ al portal</h1>
                <h3>Normas de uso</h3>
                <p className="clm">Informamos a las personas usuarias que para garantizar el buen
                funcionamiento de las Bibliotecas Municipales de Bilbao,
                no está permitido:</p>
                <ul>
                    <li>Molestar, ofender, amenazar o acosar a otras personas o al
                    personal que trabaja en la biblioteca.</li>
                    <li>Dañar el mobiliario o materiales de la biblioteca (libros,
                    revistas, CDs, DVDs...).</li>
                    <li>Desobedecer las indicaciones del personal de la biblioteca, por
                    ejemplo:</li>
                    <ul>
                        <li>No mostrar el carné de la biblioteca.</li>
                        <li>No mostrar sus pertenencias cuando suena la alarma
                        antirrobo.</li>
                    </ul>
                </ul>
                <h3>Préstamo</h3>
                <p className="clm">Se prestan todos los materiales de la RBMB que aparecen
                como prestables en el catálogo de la biblioteca:&nbsp;
                <a href="www.katalogoak.euskadi.eus/katalogobateratua">www.katalogoak.euskadi.eus/katalogobateratua</a>
                </p>
                <p className="clm">Los plazos de préstamo, el número de ejemplares por persona,
                el máximo de reservas, etc. pueden consultarse
                en la web de las bibliotecas:&nbsp;<a href="www.bilbao.eus/bibliotecas">www.bilbao.eus/bibliotecas</a></p>
                <p className="clm">Existen condiciones diferentes para público infantil,
                personas adultas, investigadoras e instituciones.</p>
            </div>
        </main>
    )
}

export default Principal;