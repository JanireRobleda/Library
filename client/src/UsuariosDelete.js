// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import UsuariosMainLeft from './UsuariosMainLeft';
import React, { useEffect, useState } from 'react';

function UsuariosDelete() {

    let [dni, setDni] = useState("");

    let [msg, setMsg] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        setDni(event.target.value);
    }


    function delButton() {

        let fetchData = { 
            method: 'DELETE',
            body: JSON.stringify({ "dni": dni }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/usuarios/delete", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
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
                <h1>Eliminar usuario de la base de datos general</h1>

                {/* <div id="usuarios"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="isbn">Inserta el DNI del usuario a borrar: </label>
                        <input onChange={setValues} value={dni} id="dni" type="text" name="dni" />
                    </p>
                    <button onClick={delButton} id="botonBorrarUsuario" >Eliminar usuario</button>
                    <p style={{color: "rgb(119, 23, 6)"}}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )
}

export default UsuariosDelete;