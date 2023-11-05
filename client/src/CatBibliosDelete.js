import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import CatBibliosMainLeft from './CatBibliosMainLeft';
import React, { useEffect, useState } from 'react';

function CatBibliosDelete() {

    // GET PARA EL SELECT DE LAS BIBLIOS
    let [barrios, setBarrios] = useState([]);

    useEffect(function () {
        fetch("http://localhost:9000/bibliotecas/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                setBarrios(data.map((catbib, index) => {
                    return (
                        <option value={catbib.barrio} key={index}>{catbib.barrio}</option>
                    )
                }))
            })
    }, [])

    // POST

    let [barrio, setBarrio] = useState("");
    let [isbn, setIsbn] = useState("");

    let [msg, setMsg] = useState("");
    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        switch (event.target.name) {
            case "barrio":
                setBarrio(event.target.value);
                break;
            default:
                setIsbn(event.target.value);
                break;
        }
    }


    function delButton() {
        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify({ "isbn": isbn, "barrio": barrio }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/catbiblios/delete", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, correcto.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/catbibliosGet";
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
            <CatBibliosMainLeft />
            <div id="mainright">
                <h1>Borrar libro del catálogo de una biblioteca</h1>

                {/* <div id="catbiblios"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="isbn">Inserta el ISBN del libro: </label>
                        <input onChange={setValues} value={isbn} id="isbn" type="text" name="isbn" />
                    </p>
                    <p><label htmlFor="barrio">Inserta el nombre de la biblioteca: </label>
                        <select onChange={setValues} value={barrio} name="barrio" id="barrio" required>
                            <option value="">~ Elegir ~</option>
                            {barrios}
                        </select>
                    </p>
                    <button onClick={delButton} id="botonBorrarCatBib">Borrar libro del catálogo</button>
                    <p style={{color: "rgb(119, 23, 6)"}}><b>{msg}</b></p>
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

export default CatBibliosDelete;