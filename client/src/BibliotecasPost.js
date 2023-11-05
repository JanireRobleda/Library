import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import BibliotecasMainLeft from './BibliotecasMainLeft';
import React, { useEffect, useState } from 'react';

function BibliotecasPost() {

    let [barrio, setBarrio] = useState("");
    let [distrito, setDistrito] = useState("");
    let [direccion, setDireccion] = useState("");
    let [telefono, setTelefono] = useState("");
    let [mail, setMail] = useState("");

    let [msg, setMsg] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        switch (event.target.name) {
            case "barrio":
                setBarrio(event.target.value);
                break;
            case "distrito":
                setDistrito(event.target.value);
                break;
            case "direccion":
                setDireccion(event.target.value);
                break;
            case "telefono":
                setTelefono(event.target.value);
                break;
            default:
                setMail(event.target.value);
                break;
        }
    }

    function addButton() {

        let fetchData = {
            method: 'POST',
            body: JSON.stringify({ "barrio": barrio, "distrito": distrito, "direccion": direccion, "telefono": telefono, "mail": mail }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/bibliotecas/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
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
                <h1>Añadir biblioteca nueva</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="barrio">Inserta el barrio: </label>
                        <input onChange={setValues} value={barrio} id="barrio" type="text" name="barrio" />
                    </p>
                    <p><label htmlFor="distrito">Inserta el distrito: </label>
                        <input onChange={setValues} value={distrito} id="distrito" type="text" name="distrito" />
                    </p>
                    <p><label htmlFor="direccion">Inserta la direccion: </label>
                        <input onChange={setValues} value={direccion} id="direccion" type="text" name="direccion" />
                    </p>
                    <p><label htmlFor="telefono">Inserta el teléfono: </label>
                        <input onChange={setValues} value={telefono} id="telefono" type="text" name="telefono" />
                    </p>
                    <p><label htmlFor="mail">Inserta el mail de contacto: </label>
                        <input onChange={setValues} value={mail} id="mail" type="text" name="mail" />
                    </p>
                    <button onClick={addButton} id="botonAnadirBiblio">Añadir biblioteca</button>
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

export default BibliotecasPost;