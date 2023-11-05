import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import BibliotecasMainLeft from './BibliotecasMainLeft';
import React, { useEffect, useState } from 'react';

function BibliotecasDelete() {

    // GET PARA EL SELECT DE LAS BIBLIOS
    let [biblios, setBiblios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    let [msg, setMsg] = useState("");

    useEffect(function () {
        fetch("http://localhost:9000/bibliotecas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                setBiblios(data.map((bib, index) => {
                    return (
                        <option value={bib.barrio} key={index}>{bib.barrio}</option>
                    )
                }))
            })
    }, [])

    // PUT

    let [barrio, setBarrio] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        setBarrio(event.target.value);
    }

    function delButton() {

        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify({ "barrio": barrio }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/bibliotecas/delete", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, correcto.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/bibliotecasGet";
                        setMsg("");
                    }
                    else {
                        setMsg(data.mensaje);
                        // alert(data.mensaje);
                    }
                }
            )
    }

    // useEffect(function () {

    // }, [objeto])


    return (
        <main>
            <BibliotecasMainLeft />
            <div id="mainright">
                <h1>Eliminar biblioteca de la base de datos general</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="barrio">Inserta el barrio del cual quieres cambiar los datos: </label>
                        <select onChange={setValues} value={barrio} name="barrio" id="barrio" required>
                            <option value="">~ Elegir ~</option>
                            {biblios}
                        </select>
                    </p>
                    <button onClick={delButton} id="botonBorrarBiblio">Eliminar biblioteca</button>
                    <p style={{ color: "rgb(119, 23, 6)" }}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )

    ///// POST/////
    // document.querySelector("#botonAnadirLibro").addEventListener("click", function () {
    //     let objeto = {
    //         titulo: document.querySelector("#title").value,
    //         autor: document.querySelector("#author").value,
    //         isbn: document.querySelector("#isbn").value,
    //         genero: document.querySelector("#genre").value
    //     }
    //     let fetchData = {
    //         method: 'POST',
    //         body: JSON.stringify(objeto),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8'
    //         }
    //     }
    //     useEffect(function () {
    //         fetch("/libros/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    //             .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
    //             .then(
    //                 data => {
    //                     if (data.status) { //si es true, correcto.
    //                         alert(data.mensaje);
    //                         location.href = "http://localhost:3000/librosGet.html";
    //                     }
    //                     else {
    //                         alert(data.mensaje);
    //                     }
    //                 }
    //             )
    //     })
    // }, [])


}

export default BibliotecasDelete;