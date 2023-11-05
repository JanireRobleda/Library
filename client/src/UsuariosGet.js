// import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import flechaizq from './style/flechaizq.png';
import flechader from './style/flechader.png';
import UsuariosMainLeft from './UsuariosMainLeft';
import React, { useEffect, useState } from 'react';

function UsuariosGet() {

    let [usuarios, setUsuarios] = useState([]);  // al principio cuando la tabla está vacia (useState("") da error, así lo evitamos)
    
    let [counterTable, setCounterTable] = useState(0);
    let [disableBut1Table, setDisableBut1Table] = useState(true);
    let [disableBut2Table, setDisableBut2Table] = useState(false);
    let [total, setTotal] = useState("");
    let [hastacounterTable, setHastacounterTable] = useState(10);

    // useEffect(function () {
    //     fetch("http://localhost:9000/usuarios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
    //         .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
    //         .then(data => {
    //             // console.log(data);
    //             setUsuarios(data.map((us, index) => {
    //                 return (
    //                     <tr key={index}>
    //                         <td>{us.nombre}</td>
    //                         <td>{us.apellido1}</td>
    //                         <td>{us.apellido2}</td>
    //                         <td>{us.dni}</td>
    //                         <td>{us.tlfno}</td>
    //                     </tr>
    //                 )
    //             }))
    //         })
    // }, [])

    useEffect(function () {
        fetch("http://localhost:9000/usuarios/get") //hace una llamada a la url del app.get. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. // VA A RECIBIR LO QUE LE MANDEMOS DEL RES.JSON EN APP.GET // Lo recibimos y convertimos en json. //// estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(data => {
                // console.log(data);
                setTotal(data.length);
                setUsuarios(data.slice(counterTable, counterTable + 10).map((us, index) => {
                    return (
                        <tr key={index}>
                            <td>{us.nombre}</td>
                            <td>{us.apellido1}</td>
                            <td>{us.apellido2}</td>
                            <td>{us.dni}</td>
                            <td>{us.tlfno}</td>
                        </tr>
                    )
                }))
                if (counterTable != 0){
                    setDisableBut1Table(false);
                }else{
                    setDisableBut1Table(true);
                }
                if (counterTable >= data.length-10) {
                    setDisableBut2Table(true);
                }else{
                    setDisableBut2Table(false);
                }

                if (parseInt(counterTable) + 10 > total) {
                    setHastacounterTable(total);
                } else {
                    setHastacounterTable(parseInt(counterTable) + 10);
                }
                // console.log(counterTable);
            })
    }, [counterTable])

    function anterioresTable(){
        setCounterTable(counterTable - 10);
    }
    function siguientesTable(){
        setCounterTable(counterTable + 10); //sin parseInt me agrega los nums: 3+5: 35 y no 8
    }

    return (
        <main>
            <UsuariosMainLeft />
            <div id="mainright">
                <h1>USUARIOS REGISTRADOS</h1>
                <div className="butsdispXenX">
                        <button onClick={anterioresTable} name="anterioresTable" disabled={disableBut1Table}><img src={flechaizq} alt="flechaizqTable" /></button>
                        <p>{counterTable + 1} a {hastacounterTable} (de {total})</p>
                        <button onClick={siguientesTable} name="anterioresTable" disabled={disableBut2Table}><img src={flechader} alt="flechaderTable" /></button>
                </div>
                <div id="usuarios">
                    <table id="tabus">
                        <thead><tr><th>Nombre</th><th>Primer apellido</th><th>Segundo apellido</th><th>DNI</th><th>Teléfono</th></tr></thead>
                        <tbody>{usuarios.length > 0 ? usuarios : null }</tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default UsuariosGet;