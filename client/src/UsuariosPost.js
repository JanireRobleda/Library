// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import UsuariosMainLeft from './UsuariosMainLeft';
import React, { useEffect, useState } from 'react';

function UsuariosPost() {

    let [nombre, setNombre] = useState("");
    let [apellido1, setApellido1] = useState("");
    let [apellido2, setApellido2] = useState("");
    let [dni, setDni] = useState("");
    let [tlfno, setTlfno] = useState("");

    let [dnival, setdnival] = useState("");
    let [dnivalcol, setdnivalcol] = useState("");
    let [msg, setMsg] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        switch (event.target.name) {
            case "nombre":
                setNombre(event.target.value);
                break;
            case "apellido1":
                setApellido1(event.target.value);
                break;
            case "apellido2":
                setApellido2(event.target.value);
                break;
            case "dni":
                setDni(event.target.value);
                break;
            case "tlfno":
                setTlfno(event.target.value);
                break;
        }
    }

    useEffect(function () {
        setMsg("");
        // console.log(dni.length);
        let lastchar = dni[dni.length - 1];
        let onetoeightchars = dni.substring(0, 8);
        if (dni.length >= 5) {
            if (dni.length != 9 || !/[A-Z]/.test(lastchar) || !/[0-9]/.test(onetoeightchars)) {
                setdnival("No es un formato válido de DNI");
                setdnivalcol("rgb(119, 23, 6)");
            } else {
                setdnival("Formato DNI válido");
                setdnivalcol("green");
            }
        } else {
            setdnival("");
        }
    }, [dni])

    function addButton() {
        let fetchData = { //setFetchData ({...})
            method: 'POST',
            body: JSON.stringify({ "nombre": nombre, "apellido1": apellido1, "apellido2": apellido2, "dni": dni, "tlfno": tlfno }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/usuarios/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, correcto.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/usuariosGet";
                        setMsg("");
                    }
                    else {
                        setMsg(data.mensaje);
                        setdnival("");
                        // alert(data.mensaje);
                    }
                }
            )
    }

    // useEffect(function () {

    // }, [objeto])


    return (
        <main>
            <UsuariosMainLeft />
            <div id="mainright">
                <h1>Añadir usuario nuevo</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="nombre">Inserta el nombre: </label>
                        <input onChange={setValues} value={nombre} id="nombre" type="text" name="nombre" />
                    </p>
                    <p><label htmlFor="apellido1">Inserta el primer apellido: </label>
                        <input onChange={setValues} value={apellido1} id="apellido1" type="text" name="apellido1" />
                    </p>
                    <p><label htmlFor="apellido2">Inserta el segundo apellido: </label>
                        <input onChange={setValues} value={apellido2} id="apellido2" type="text" name="apellido2" />
                    </p>
                    <p><label htmlFor="dni">Inserta el DNI: </label>
                        <input onChange={setValues} value={dni} id="dni" type="text" name="dni" />
                        <span style={{ color: dnivalcol }}>&nbsp;&nbsp;{dnival}</span>
                    </p>
                    <p><label htmlFor="tlfno">Inserta el teléfono de contacto: </label>
                        <input onChange={setValues} value={tlfno} id="tlfno" type="text" name="tlfno" />
                    </p>
                    <button onClick={addButton} id="botonAnadirUsuario" >Añadir usuario</button>
                    <p style={{ color: "rgb(119, 23, 6)" }}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )
}

export default UsuariosPost;