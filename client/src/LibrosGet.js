// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import flechaizq from './style/flechaizq.png';
import flechader from './style/flechader.png';
import bin from './style/bin.png';
import LibrosMainLeft from './LibrosMainLeft';
import React, { useEffect, useState } from 'react';

function LibrosGet() {

    let [books, setBooks] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    let [bookboxes, setBookboxes] = useState([]);
    let [counter, setCounter] = useState(0);
    let [disableBut1, setDisableBut1] = useState(true);
    let [disableBut2, setDisableBut2] = useState(false);
    let [numcovers, setNumcovers] = useState(5);
    let [hastacounter, setHastacounter] = useState(5);

    let [counterTable, setCounterTable] = useState(0);
    let [disableBut1Table, setDisableBut1Table] = useState(true);
    let [disableBut2Table, setDisableBut2Table] = useState(false);
    let [total, setTotal] = useState(20); //num random
    let [hastacounterTable, setHastacounterTable] = useState(10);

    // useEffect(function () {
    //     // document.querySelector('.dispXenX').style.display = 'none';
    //     fetch("http://localhost:9000/libros/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);
    //             setBooks(data.map((book, index) => {
    //                 return (
    //                     <tr key={index}>
    //                         <td>{book.titulo}</td>
    //                         <td>{book.autor}</td>
    //                         <td>{book.isbn}</td>
    //                         <td>{book.genero}</td>
    //                     </tr>
    //                 )
    //             }))
    //             // console.log(counter);
    //         })
    // }, [])

    useEffect(function () {
        // document.querySelector('.dispXenX').style.display = 'none';
        fetch("http://localhost:9000/libros/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setTotal(data.length);
                setBooks(data.slice(counterTable, counterTable + 10).map((book, index) => {
                    return (
                        <tr key={index}>
                            <td className="colwidfix">{book.titulo}</td>
                            <td className="colwidfix">{book.autor}</td>
                            <td>{book.isbn}</td>
                            <td>{book.genero}</td>
                            <td><button onClick={delButton} value={book.isbn} className="botonBorrarLibroBin">Eliminar</button></td>
                        </tr>
                    )
                }))  // <img src={bin} alt="bin" className="bin" />
                if (counterTable !== 0) {
                    setDisableBut1Table(false);
                } else {
                    setDisableBut1Table(true);
                }
                if (counterTable >= data.length - 10) {
                    setDisableBut2Table(true);
                } else {
                    setDisableBut2Table(false);
                }

                if (counterTable + 10 > total) {
                    setHastacounterTable(total);
                } else {
                    setHastacounterTable(parseInt(counterTable) + 10);
                }
                // console.log("counterTable: " + counterTable);
                // console.log("counterTable+10: " + (counterTable + 10));
                // console.log("HastacounterTable: " + hastacounterTable);
                // console.log("Total: " + total);
                // console.log(counterTable);
            })
    }, [counterTable, total])


    function anterioresTable() {
        setCounterTable(counterTable - 10);
    }
    function siguientesTable() {
        setCounterTable(counterTable + 10); //sin parseInt me agrega los nums: 3+5: 35 y no 8
    }


    function changenumcovers(event) {
        setNumcovers(event.target.value);
        setCounter(0); //que vuelva al principio
    }

    useEffect(function () {
        fetch("http://localhost:9000/libros/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //recibimos un json (lo que le mandemos del res.json en router.get
            .then(data => {
                // console.log(data);
                // console.log("Counter: " + counter);
                // console.log("Numcovers: " + numcovers);
                setBookboxes(data.slice(counter, parseInt(counter) + parseInt(numcovers)).map((book, index) => { //sin parseInt me agrega los nums: 3+5: 35 y no 8
                    return (
                        <div key={index} className="bookbox">
                            <div className="imgcontainerBook">
                                <img src={book.img} alt="imgbook" />
                            </div>
                            <p style={{ color: "rgb(216, 6, 6)" }}><b>{book.titulo}</b></p>
                            <p>{book.autor}</p>
                            <p><i>{book.genero}</i></p>
                        </div>
                    )
                }))
                if (counter != 0) {
                    setDisableBut1(false);
                } else {
                    setDisableBut1(true);
                }
                if (counter >= data.length - numcovers) {
                    setDisableBut2(true);
                } else {
                    setDisableBut2(false);
                }

                if (parseInt(counter) + parseInt(numcovers) > total) {
                    setHastacounter(total);
                } else {
                    setHastacounter(parseInt(counter) + parseInt(numcovers));
                }
                // console.log(counter);
            })
    }, [counter, numcovers]) //


    function anteriores() {
        setCounter(counter - numcovers);
    }
    function siguientes() {
        setCounter(parseInt(counter) + parseInt(numcovers)); //sin parseInt me agrega los nums: 3+5: 35 y no 8
    }

    ////////////////////DELETE/////////////////////////////////////////////////
    console.log("total1: " + total);
    function delButton(e) {

        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify({ "isbn": e.target.value }), //"isbn": isbn
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
                        // window.location.href = "http://localhost:3000/librosGet";
                        // setMsg("");
                    }

                    // else {
                    //     setMsg(data.mensaje);
                    //     // alert(data.mensaje);
                    // }
                    let arraytotal = [total];
                    let tot = [...arraytotal]; // CLON!!!!
                    setTotal(tot);
                    console.log("total2: " + tot);
                }
            )

        // setCounterTable(counterTable);
        // console.log("counter__table__2:" + counterTable);
    }
    ////////////////////DELETE/////////////////////////////////////////////////



    return (
        <main>
            <LibrosMainLeft />
            <div id="mainright">
                <div className="dispmodelib">
                    <button onClick={() => { document.querySelector('.dispAll').style.display = 'block'; document.querySelector('.dispXenX').style.display = 'none' }} >Tabla general</button>
                    <button onClick={() => { document.querySelector('.dispXenX').style.display = 'block'; document.querySelector('.dispAll').style.display = 'none' }}> Portadas </button>
                </div>
                <div className="dispAll">
                    <h1>CATÁLOGO GENERAL DE LIBROS</h1>
                    <div className="butsdispXenX">
                        <button onClick={anterioresTable} name="anterioresTable" disabled={disableBut1Table}><img src={flechaizq} alt="flechaizqTable" /></button>
                        <p>{counterTable + 1} a {hastacounterTable} (de {total})</p>
                        <button onClick={siguientesTable} name="anterioresTable" disabled={disableBut2Table}><img src={flechader} alt="flechaderTable" /></button>
                    </div>
                    <div id="libros">
                        <table id="tablib">
                            <thead><tr><th>Título</th><th>Autor/a</th><th>ISBN</th><th>Género</th><th>Eliminar</th></tr></thead>
                            <tbody>{books.length > 0 ? books : null}</tbody>
                        </table>
                    </div>
                </div>
                <div className="dispXenX" style={{ display: 'none' }}>
                    <div className="butsdispXenX">
                        <button onClick={anteriores} name="anteriores" disabled={disableBut1}><img src={flechaizq} alt="flechaizq" /></button>
                        <input onChange={changenumcovers} value={numcovers} className="inputnumcov" />
                        <span>&nbsp;&nbsp;&nbsp;{counter + 1} a {hastacounter} (de {total})</span> {/* //()=>{(parseInt(counter) + parseInt(numcovers))>{total} ? {total} : (parseInt(counter) + parseInt(numcovers))} */}
                        <button onClick={siguientes} name="siguientes" disabled={disableBut2}><img src={flechader} alt="flechader" /></button>
                    </div>
                    <div className="dispXenX2">
                        {bookboxes}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LibrosGet;