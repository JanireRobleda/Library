import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import maillogo from './style/maillogo.png';
import BibliotecasMainLeft from './BibliotecasMainLeft';
import React, { useEffect, useState } from 'react';

function BibliotecasGet() {

    let [biblios, setBiblios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    
    useEffect(function () {
        fetch("http://localhost:9000/bibliotecas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                // console.log(data);
                setBiblios(data.map((bib, index) => {
                    return (
                        <tr key={index}>
                            <td>{bib.barrio}</td>
                            <td>{bib.distrito}</td>
                            <td>{bib.direccion}</td>
                            <td>{bib.telefono}</td>
                            <td><a href={bib.mail}><img src={maillogo} alt="Mail logo" id="maillogo" /></a></td>
                        </tr>
                    )
                }))
            })
    }, [])

    return (
        <main>
            <BibliotecasMainLeft />
            <div id="mainright">
                <h1>BIBLIOTECAS MUNICIPALES DE BILBAO</h1>

                <div id="bibliotecas">
                    <table id="tabbib">
                        <thead><tr><th>Barrio</th><th>Distrito</th><th>Dirección</th><th>Teléfono</th><th>Contacto</th></tr></thead>
                        <tbody>{biblios.length > 0 ? biblios : null }</tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default BibliotecasGet;