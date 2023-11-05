import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

import LoginAdmin from './LoginAdmin';
import Header from './Header';
import Footer from './Footer';
import Principal from './Principal';
import LibrosGet from './LibrosGet';
import LibrosPost from './LibrosPost';
import LibrosPut from './LibrosPut';
import LibrosDelete from './LibrosDelete';
import BibliotecasGet from './BibliotecasGet';
import BibliotecasPost from './BibliotecasPost';
import BibliotecasPut from './BibliotecasPut';
import BibliotecasDelete from './BibliotecasDelete';
import CatBibliosGet from './CatBibliosGet';
import CatBibliosPost from './CatBibliosPost';
import CatBibliosDelete from './CatBibliosDelete';
import UsuariosGet from './UsuariosGet';
import UsuariosPost from './UsuariosPost';
import UsuariosPut from './UsuariosPut';
import UsuariosDelete from './UsuariosDelete';
import PrestamosGet from './PrestamosGet';
import PrestamosPost from './PrestamosPost';
import PrestamosDelete from './PrestamosDelete';
import PrestamosHistGet from './PrestamosHistGet';
// import Superheroes from './Superheroes';

function App() {

  /////ESTÁ SIN TERMINAR (ESPERAR A LO DE PEIO)

  // let [apiResponse, setApiResponse] = useState("");
  // let [name, setName] = useState("");
  // let [surname, setSurname] = useState("");

  // useEffect(()=>{
  //   fetch('http://localhost:9000/users/') //estoy llamando a la api (el back)
  //   .then(res => res.text()) //porque mi users me devuelve text!! (en api>routes>users.js)
  //   .then(data =>{
  //     setApiResponse(data);
  //   })
  // },[])

  // function setValues(event){
  //   switch
  // }
  // return (
  //   {apiResponse}


  // );

  return (
    <>
      <BrowserRouter>
        <Route exact path="/login">
          <LoginAdmin />
        </Route>

        <Route exact path="/principal">
          <Header />
          <Principal />
          <Footer />
        </Route>
        <Route path="/librosGet">
          <Header />
          <LibrosGet />
          <Footer />
        </Route>
        <Route path="/librosPost">
          <Header />
          <LibrosPost />
          <Footer />
        </Route>
        <Route path="/librosPut">
          <Header />
          <LibrosPut />
          <Footer />
        </Route>
        <Route path="/librosDelete">
          <Header />
          <LibrosDelete />
          <Footer />
        </Route>
        <Route path="/bibliotecasGet">
          <Header />
          <BibliotecasGet />
          <Footer />
        </Route>
        <Route path="/bibliotecasPost">
          <Header />
          <BibliotecasPost />
          <Footer />
        </Route>
        <Route path="/bibliotecasPut">
          <Header />
          <BibliotecasPut />
          <Footer />
        </Route>
        <Route path="/bibliotecasDelete">
          <Header />
          <BibliotecasDelete />
          <Footer />
        </Route>
        <Route path="/catbibliosGet">
          <Header />
          <CatBibliosGet />
          <Footer />
        </Route>
        <Route path="/catbibliosPost">
          <Header />
          <CatBibliosPost />
          <Footer />
        </Route>
        <Route path="/catbibliosDelete">
          <Header />
          <CatBibliosDelete />
          <Footer />
        </Route>
        <Route path="/usuariosGet">
          <Header />
          <UsuariosGet />
          <Footer />
        </Route>
        <Route path="/usuariosPost">
          <Header />
          <UsuariosPost />
          <Footer />
        </Route>
        <Route path="/usuariosPut">
          <Header />
          <UsuariosPut />
          <Footer />
        </Route>
        <Route path="/usuariosDelete">
          <Header />
          <UsuariosDelete />
          <Footer />
        </Route>
        <Route path="/prestamosGet">
          <Header />
          <PrestamosGet />
          <Footer />
        </Route>
        <Route path="/prestamosPost">
          <Header />
          <PrestamosPost />
          <Footer />
        </Route>
        <Route path="/prestamosDelete">
          <Header />
          <PrestamosDelete />
          <Footer />
        </Route>
        <Route path="/prestamosHistGet">
          <Header />
          <PrestamosHistGet />
          <Footer />
        </Route>
        {/* <Route path="/superheroes">
          <Superheroes />
        </Route> */}


        {/* 
        <Route path="/bibliotecasGet">
          <Bibliotecas />
        </Route>
        <Route path="/catbibliosGet">
          <Catbiblios />
        </Route>
        <Route path="/usuariosGet">
          <Usuarios />
        </Route>
        <Route path="/prestamosGet">
          <Préstamos />
        </Route>  */}


      </BrowserRouter>
    </>
  );
}

export default App;
