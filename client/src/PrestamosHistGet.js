// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import PrestamosMainLeft from './PrestamosMainLeft';
import React, { useEffect, useState } from 'react';

function PrestamosHistGet() {

    let [loans, setLoans] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)

    useEffect(function () {
        fetch("http://localhost:9000/prestamosHist/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                // console.log(data);
                setLoans(data.map((lo, index) => {
                    return (
                        <tr key={index}>
                            <td>{lo.nombre}</td>
                            <td>{lo.apellido1}</td>
                            <td>{lo.apellido2}</td>
                            <td>{lo.dni}</td>
                            <td>{lo.titulo}</td>
                            <td>{lo.autor}</td>
                            <td>{lo.isbn}</td>
                            <td>{lo.barrio}</td>
                            <td>{lo.fechaIni}</td>
                            <td>{lo.fechaFin}</td>
                        </tr>
                    )
                }))
            })
    }, [])

    return (
        <main>
            <PrestamosMainLeft />
            <div id="mainright">
                <h1>Historial de préstamos finalizados</h1>

                <div id="prestamosHist">
                    <table id="tabpres">
                        <thead><tr><th>Nombre usuario/a</th><th>Primer apellido</th><th>Segundo apellido</th><th>DNI</th><th>Título</th><th>Autor/a</th><th>ISBN</th><th>Biblioteca</th><th>Prestado desde</th><th>Prestado hasta</th></tr></thead>
                        <tbody>{loans.length > 0 ? loans : null}</tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default PrestamosHistGet;