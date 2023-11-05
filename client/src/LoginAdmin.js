import React, { useEffect, useState } from 'react';

let arrayQuotes = ["“It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known”", "“All we have to decide is what to do with the time that is given us”", "“You can steer yourself any direction you choose. And YOU are the one who’ll decide where to go…”", "“It matters not what someone is born, but what they grow to be”", "“Whatever our souls are made of, his and mine are the same”", "“Most people are nice when you finally see them”", "“All endings are also beginnings. We just don’t know it at the time”", "“It’s no use going back to yesterday, because I was a different person then”", "“None of us really changes over time. We only become more fully what we are”", "“When you are imagining, you might as well imagine something worth while”", "“I dream. Sometimes I think that’s the only right thing to do”", "“It is sometimes an appropriate response to reality to go insane”", "“If you’re making mistakes it means you’re out there doing something”", "“Art enables us to find ourselves and lose ourselves at the same time”", "“You never know what worse luck your bad luck has saved you from”"];
    let arrayAuthors = ["A Tale of Two Cities, Charles Dickens", "The Fellowship of the Ring, J.R.R. Tolkien", "Oh, the Places You’ll Go! Dr Seuss", "Harry Potter and the Goblet of Fire, J.K. Rowling", "Wuthering Heights, Emily Bronte", "To Kill a Mockingbird, Harper Lee", "The Five People You Meet In Heaven, Mitch Albom", "Alice’s Adventures in Wonderland, Lewis Carroll", "The Vampire Lestat, Anne Rice", "Anne of Green Gables, Lucy Maud Montgomery", "Sputnik Sweetheart, Haruki Murakami", "Valis, Philip K. Dick", "Make Good Art, Neil Gaiman", "No Man Is an Island, Thomas Merton", "No Country For Old Men, Cormac McCarthy"];
    let randnum = Math.floor(Math.random() * arrayQuotes.length) //del 0 al 14.
    let quote = arrayQuotes[randnum];
    let author = arrayAuthors[randnum];

function LoginAdmin() {

    let [username1, setUsername1] = useState("");
    let [password1, setPassword1] = useState("");
    let [username2, setUsername2] = useState("");
    let [password2, setPassword2] = useState("");
    let [msg1, setMsg1] = useState("");
    let [msg2, setMsg2] = useState("");


    function setValues(event) {
        switch (event.target.name) {
            case "usuario1":
                setUsername1(event.target.value);
                break;
            case "password1":
                setPassword1(event.target.value);
                break;
            case "usuario2":
                setUsername2(event.target.value);
                break;
            case "password2":
                setPassword2(event.target.value);
                break;
        }
    }

    ///// SIGN IN - POST/////
    function butSignIn() {
        setMsg1("");
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({ "username1": username1, "password1": password1 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        fetch("http://localhost:9000/loginAdmin/post", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, se registra correctamente.
                        alert(data.mensaje);
                        document.getElementById('idInnerSignIn').style.display = 'none'
                        document.getElementById('idInnerLogIn').style.display = 'block'
                    }
                    else {
                        setMsg1(data.mensaje);
                        // alert(data.mensaje);
                    }
                }
            )
    }

    ///// LOG IN /////
    function butLogIn() {
        setMsg2("");
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({ "username2": username2, "password2": password2 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        fetch("http://localhost:9000/loginAdmin/entrar", fetchData) //le metemos la ruta en el servidor, y los datos que queremos que le meta. //cuando reciba la respuesta del app.get del index.js, entonces hacemos las 2 siguientes lineas.
            .then(res => res.json()) //SIGNIFICA QUE VAMOS A RECIBIR UN JSON. //// VA A RECIBIR LO QUE LE MANDEMOS DEL RES.SEND EN APP.GET// Lo recibimos y convertimos en json. // estamos recibiendo un array desde index.js (si no es array no recoge el json)
            .then(
                data => {
                    if (data.status) { //si es true, ingresa correctamente.
                        alert(data.mensaje);
                        window.location.href = "http://localhost:3000/principal";
                    }
                    else {
                        setMsg2(data.mensaje);
                        // alert(data.mensaje);
                    }
                }
            )
    }

    

    return (
        <>
            <div id="bodyLogin" > {/* onClick={()=>{document.getElementById('idInnerSignIn').style.display = 'none'; document.getElementById('idInnerLogIn').style.display = 'none' }} */}
                <div id="idUpper">
                    <button onClick={() => { document.getElementById('idInnerSignIn').style.display = 'block'; document.getElementById('idInnerLogIn').style.display = 'none' }} >Registro</button>
                    <button onClick={() => { document.getElementById('idInnerLogIn').style.display = 'block'; document.getElementById('idInnerSignIn').style.display = 'none' }} >Iniciar sesión</button>
                </div>

                <h1> {quote} </h1>   {/* Hoy es un buen día para leer... */}
                <h2> {author} </h2>

                <div id="idInnerSignIn" className="idInner">
                    <div className="imgcontainer">
                        <h3>Registro</h3>
                        <span onClick={() => { document.getElementById('idInnerSignIn').style.display = 'none' }} className="close" title="Close Modal">&times;</span>
                    </div>

                    <div className="logininputs">
                        <label htmlFor="username1"><b>Nombre de usuario/a</b></label>
                        <input onChange={setValues} value={username1} id="username1" type="text" name="usuario1" placeholder="Inserta nombre de usuario/a" required />
                        <label htmlFor="password1"><b>Contraseña</b></label>
                        <input onChange={setValues} value={password1} id="password1" type="password" name="password1" placeholder="Inserta la contraseña" required />
                        <button onClick={butSignIn} id="signin">Registrarse</button>
                        <p><b>{msg1}</b></p>
                    </div>
                </div>

                <div id="idInnerLogIn" className="idInner">
                    <div className="imgcontainer">
                        <h3>Iniciar sesión</h3>
                        <span onClick={() => { document.getElementById('idInnerLogIn').style.display = 'none' }} className="close" title="Close Modal">&times;</span>
                    </div>

                    <div className="logininputs">
                        <label htmlFor="username2"><b>Nombre de usuario/a</b></label>
                        <input onChange={setValues} value={username2} id="username2" type="text" name="usuario2" placeholder="Inserta nombre de usuario/a" required />
                        <label htmlFor="password2"><b>Contraseña</b></label>
                        <input onChange={setValues} value={password2} id="password2" type="password" name="password2" placeholder="Inserta la contraseña" required />
                        <button onClick={butLogIn} id="login">Iniciar sesión</button>
                        <p><b>{msg2}</b></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin;