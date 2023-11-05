// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import PrestamosMainLeft from './PrestamosMainLeft';
import React, { useEffect, useState } from 'react';

function BibliotecasPost() {

    // GET PARA EL SELECT DE LAS BIBLIOS
    let [biblios, setBiblios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    
    useEffect(function () {
        fetch("http://localhost:9000/catbiblios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                let bibNoRepes = [];
                data.forEach((catbib,index)=>{
                    if (!bibNoRepes.includes(catbib.barrio)){
                        bibNoRepes.push(catbib.barrio);
                    }
                })
                setBiblios(bibNoRepes.map((barr, index) => {
                    return (
                        <option value={barr} key={index}>{barr}</option>
                    )
                }))
                //// Antes hacíamos así, pero coge todas las biblios independientemente de que estén repes en la lista.
                // setBiblios(data.map((bib, index) => {
                //     return (
                //         <option value={bib.barrio} key={index}>{bib.barrio}</option>
                //     )
                // }))
            })
    }, [])

    // PUT

    let [dni, setDni] = useState("");
    let [isbn, setIsbn] = useState("");
    let [barrio, setBarrio] = useState("");

    let [msg, setMsg] = useState("");
    
    // let [objeto, setObjeto] = useState({});
    // let [fetchData, setFetchData] = useState({});

    function setValues(event) {
        switch (event.target.name) {
            case "dni":
                setDni(event.target.value);
                break;
            case "isbn":
                setIsbn(event.target.value);
                break;    
            default: //case "barrio":
                setBarrio(event.target.value);
                break;
        }
    }

    function addButton() {

        let fetchData = {
            method: 'POST',
            body: JSON.stringify({ "dni": dni, "isbn": isbn, "barrio": barrio }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("http://localhost:9000/prestamos/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, correcto.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/prestamosGet";
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
            <PrestamosMainLeft />
            <div id="mainright">
                <h1>Añadir nuevo préstamo</h1>

                {/* <div id="libros"></div> */}
                <div className="clinputs">
                    <p><label htmlFor="dni">Inserta el DNI: </label>
                        <input onChange={setValues} value={dni} id="dni" type="text" name="dni" />
                    </p>
                    <p><label htmlFor="isbn">Inserta el ISBN: </label>
                        <input onChange={setValues} value={isbn} id="isbn" type="text" name="isbn" />
                    </p>
                    <p><label htmlFor="barrio">Inserta el nombre de la biblioteca: </label>
                        <select onChange={setValues} value={barrio} name="barrio" id="barrio" required>
                            <option value="">~ Elegir ~</option>
                            {biblios}
                        </select>
                    </p>
                    <button onClick={addButton} id="botonAnadirPrestamo">Añadir préstamo</button>
                    <p style={{color: "rgb(119, 23, 6)"}}><b>{msg}</b></p>
                </div>
            </div>
        </main>
    )
}

export default BibliotecasPost;