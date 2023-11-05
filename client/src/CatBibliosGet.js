import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import maillogo from './style/maillogo.png';
import CatBibliosMainLeft from './CatBibliosMainLeft';
import React, { useEffect, useState } from 'react';

function CatBibliosGet() {

    let [catbiblios, setCatbiblios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    // let [color, setColor] = useState("");

    useEffect(function () {
        fetch("http://localhost:9000/catbiblios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                // console.log(data);
                setCatbiblios(data.map((catbib, index) => {
                    let color;
                    if (catbib.disponibilidad === "Disponible") {
                        // setColor("green");
                        color= "green";
                    } else {
                        // setColor("red");
                        color= "red";
                    }
                    return (
                        <tr key={index}>
                            <td>{catbib.titulo}</td>
                            <td>{catbib.autor}</td>
                            <td>{catbib.isbn}</td>
                            <td>{catbib.genero}</td>
                            <td>{catbib.barrio}</td>
                            <td>{catbib.distrito}</td>
                            <td className="disponib" style={{color: color}}>{catbib.disponibilidad}</td>
                            <td>{catbib.direccion}</td>
                            <td>{catbib.telefono}</td>
                            <td><a href={catbib.mail}><img src={maillogo} alt="Mail logo" id="maillogo" /></a></td>
                        </tr>
                    )
                }))
            })
    }, [])

    return (
        <main>
            <CatBibliosMainLeft />
            <div id="mainright">
                <h1>CATÁLOGO DE LIBROS Y DISPONIBILIDAD EN BIBLIOTECAS</h1>

                <div id="catbiblios">
                    <table id="tabcatlib">
                        <thead><tr><th>Título</th><th>Autor/a</th><th>ISBN</th><th>Género</th><th>Biblioteca</th><th>Distrito</th><th>Estado</th><th>Dirección</th><th>Teléfono</th><th>Contacto</th></tr></thead>
                        <tbody>{catbiblios.length > 0 ? catbiblios : null}</tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default CatBibliosGet;