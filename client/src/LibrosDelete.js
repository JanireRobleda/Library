import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import LibrosMainLeft from './LibrosMainLeft';
import React, { useEffect, useState } from 'react';

function LibrosDelete() {

    let [isbn, setIsbn] = useState("");

    let [msg, setMsg] = useState("");

    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        setIsbn(event.target.value);
    }


    function delButton() {

        let fetchData = { 
            method: 'DELETE',
            body: JSON.stringify({ "isbn": isbn }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/libros/delete", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
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
                <h1>Eliminar libro de la base de datos general</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="isbn">Inserta el ISBN del libro a borrar: </label>
                        <input onChange={setValues} value={isbn} id="isbn" type="text" name="isbn" />
                    </p>
                    <button onClick={delButton} id="botonBorrarLibro" >Eliminar libro</button>
                    <p style={{color: "rgb(119, 23, 6)"}}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )
}

export default LibrosDelete;