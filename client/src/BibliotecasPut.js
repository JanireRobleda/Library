import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import BibliotecasMainLeft from './BibliotecasMainLeft';
import React, { useEffect, useState } from 'react';

function BibliotecasPut() {

    // GET 
    let [biblios, setBiblios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    
    let [barrio, setBarrio] = useState("");
    let [distrito, setDistrito] = useState("");
    let [direccion, setDireccion] = useState("");
    let [telefono, setTelefono] = useState("");
    let [mail, setMail] = useState("");

    let [msg, setMsg] = useState("");

    //1.- GET PARA HACER EL SELECT DE LAS BIBLIOS
    useEffect(function () {
        fetch("http://localhost:9000/bibliotecas/get")
            .then(res => res.json())
            .then(data => {
                setBiblios(data.map((bib, index) => { 
                    return (
                        <option value={bib.barrio} key={index}>{bib.barrio}</option>
                    )
                }))
            })
    }, [])

    //2.- GET PARA MOSTRAR TODOS LOS DATOS EN LOS INPUTS CUANDO ENCUENTRA UN NOMBRE DE BIBLIO QUE YA TENEMOS (POR SI NO QUEREMOS CAMBIAR TODOS LOS DATOS DE LA BIBLIO SINO UNO/POCOS)
    useEffect(function () {
        fetch("http://localhost:9000/bibliotecas/get")
            .then(res => res.json())
            .then(data => {
                let filarr = data.filter((bib, i) => {
                    return bib.barrio === barrio;
                })
                console.log(filarr);
                if (filarr.length !== 0) {
                    setDistrito(filarr[0].distrito);
                    setDireccion(filarr[0].direccion);
                    setTelefono(filarr[0].telefono);
                    setMail(filarr[0].mail);
                }
            })
    }, [barrio])

    // PUT

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

    function modifButton() {

        let fetchData = {
            method: 'PUT',
            body: JSON.stringify({ "barrio": barrio, "distrito": distrito, "direccion": direccion, "telefono": telefono, "mail": mail }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/bibliotecas/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
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
                <h1>Modificar datos de la biblioteca</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="barrio">Inserta el barrio del cual quieres cambiar los datos: </label>
                        <select onChange={setValues} value={barrio} name="barrio" id="barrio" required>
                            <option value="">~ Elegir ~</option>
                            {biblios}
                        </select>
                    </p>
                    <p><label htmlFor="distrito">Modifica el distrito: </label>
                        <input onChange={setValues} value={distrito} id="distrito" type="text" name="distrito" />
                    </p>
                    <p><label htmlFor="direccion">Modifica la direccion: </label>
                        <input onChange={setValues} value={direccion} id="direccion" type="text" name="direccion" />
                    </p>
                    <p><label htmlFor="telefono">Modifica el teléfono: </label>
                        <input onChange={setValues} value={telefono} id="telefono" type="text" name="telefono" />
                    </p>
                    <p><label htmlFor="mail">Modifica el mail de contacto: </label>
                        <input onChange={setValues} value={mail} id="mail" type="text" name="mail" />
                    </p>
                    <button onClick={modifButton} id="botonAnadirBiblio">Añadir biblioteca</button>
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

export default BibliotecasPut;