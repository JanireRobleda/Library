// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import UsuariosMainLeft from './UsuariosMainLeft';
import React, { useEffect, useState } from 'react';

function UsuariosPut() {

    let [nombre, setNombre] = useState("");
    let [apellido1, setApellido1] = useState("");
    let [apellido2, setApellido2] = useState("");
    let [dni, setDni] = useState("");
    let [tlfno, setTlfno] = useState("");

    let [msg, setMsg] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    // GET - PARA MOSTRAR TODOS LOS DATOS EN LOS INPUTS CUANDO ENCUENTRA UN DNI QUE YA TENEMOS (POR SI NO QUEREMOS CAMBIAR TODOS LOS DATOS DEL USUARIO SINO UNO/POCOS)
    useEffect(function () { 
        fetch("http://localhost:9000/usuarios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                let filarr = data.filter((us, i) => {
                    return us.dni === dni;
                })
                console.log(filarr);
                if (filarr.length !== 0) {
                    setNombre(filarr[0].nombre);
                    setApellido1(filarr[0].apellido1);
                    setApellido2(filarr[0].apellido2);
                    setTlfno(filarr[0].tlfno);
                }
            })
    }, [dni])

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


    function modifButton() {
        // setObjeto({ "titulo": titulo, "autor": autor, "isbn": isbn, "genero": genero })
        // console.log(objeto);

        let fetchData = { //setFetchData ({...})
            method: 'PUT',
            body: JSON.stringify({ "nombre": nombre, "apellido1": apellido1, "apellido2": apellido2, "dni": dni, "tlfno": tlfno }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/usuarios/put", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
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
                <h1>Modificar datos del usuario</h1>

                {/* <div id="usuarios"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="dni">Inserta el DNI del cual quieres cambiar los datos: </label>
                        <input onChange={setValues} value={dni} id="dni" type="text" name="dni" />
                    </p>
                    <p><label htmlFor="nombre">Modifica el nombre: </label>
                        <input onChange={setValues} value={nombre} id="nombre" type="text" name="nombre" />
                    </p>
                    <p><label htmlFor="apellido1">Modifica el primer apellido: </label>
                        <input onChange={setValues} value={apellido1} id="apellido1" type="text" name="apellido1" />
                    </p>
                    <p><label htmlFor="apellido2">Modifica el segundo apellido: </label>
                        <input onChange={setValues} value={apellido2} id="apellido2" type="text" name="apellido2" />
                    </p>
                    <p><label htmlFor="tlfno">Inserta el teléfono de contacto: </label>
                        <input onChange={setValues} value={tlfno} id="tlfno" type="text" name="tlfno" />
                    </p>
                    <button onClick={modifButton} id="botonModificarLibro" >Modificar usuario</button>
                    <p style={{ color: "rgb(119, 23, 6)" }}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )
}

export default UsuariosPut;