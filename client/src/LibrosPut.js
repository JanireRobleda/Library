import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import LibrosMainLeft from './LibrosMainLeft';
import React, { useEffect, useState } from 'react';

function LibrosPut() {

    let [titulo, setTitulo] = useState("");
    let [autor, setAutor] = useState("");
    let [isbn, setIsbn] = useState("");
    let [genero, setGenero] = useState("");
    let [img, setImg] = useState("");

    let [msg, setMsg] = useState("");

    // GET - PARA MOSTRAR TODOS LOS DATOS EN LOS INPUTS CUANDO ENCUENTRA UN DNI QUE YA TENEMOS (POR SI NO QUEREMOS CAMBIAR TODOS LOS DATOS DEL USUARIO SINO UNO/POCOS)
    useEffect(function () {
        fetch("http://localhost:9000/libros/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                let filarr = data.filter((lib, i) => {
                    return lib.isbn === isbn;
                })
                console.log(filarr);
                if (filarr.length !== 0) {
                    setTitulo(filarr[0].titulo);
                    setAutor(filarr[0].autor);
                    setGenero(filarr[0].genero);
                    setImg(filarr[0].img)
                }
            })
    }, [isbn])

    function setValues(event) {
        switch (event.target.name) {
            case "titulo":
                setTitulo(event.target.value);
                break;
            case "autor":
                setAutor(event.target.value);
                break;
            case "isbn":
                setIsbn(event.target.value);
                break;
            case "genero":
                setGenero(event.target.value);
                break;
            case "img":
                setImg(event.target.value);
        }
    }


    function modifButton() {
        // setObjeto({ "titulo": titulo, "autor": autor, "isbn": isbn, "genero": genero })
        // console.log(objeto);

        let fetchData = { //setFetchData ({...})
            method: 'PUT',
            body: JSON.stringify({ "titulo": titulo, "autor": autor, "isbn": isbn, "genero": genero, "img": img }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/libros/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, correcto.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/librosGet";
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
            <LibrosMainLeft />
            <div id="mainright">
                <h1>Modificar datos del libro</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="isbn">Inserta el ISBN del cual quieres cambiar los datos: </label>
                        <input onChange={setValues} value={isbn} id="isbn" type="text" name="isbn" />
                    </p>
                    <p><label htmlFor="title">Modifica el título: </label>
                        <input onChange={setValues} value={titulo} id="title" type="text" name="titulo" />
                    </p>
                    <p><label htmlFor="author">Modifica el/la autor/a: </label>
                        <input onChange={setValues} value={autor} id="author" type="text" name="autor" />
                    </p>
                    <p><label htmlFor="genre">Modifica el género: </label>
                        <input onChange={setValues} value={genero} id="genre" type="text" name="genero" />
                    </p>
                    <p><label htmlFor="img">Modifica el link de imagen de portada: </label>
                        <input onChange={setValues} value={img} id="img" type="text" name="img" />
                    </p>
                    <button onClick={modifButton} id="botonModificarLibro" >Modificar libro</button>
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

export default LibrosPut;