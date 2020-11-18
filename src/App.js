import React from 'react';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MenuInicial from './components/menu-inicial';
import Autores from './components/autores';
import AdicionarAutor from './components/autores/adicionar';
import ConsultarAutor from './components/autores/consultar';
import Editoras from './components/editoras';
import AdicionarEditora from './components/editoras/adicionar';
import ConsultarEditora from './components/editoras/consultar';
import Livros from './components/livros';
import AdicionarLivro from './components/livros/adicionar';
import ConsultarLivro from './components/livros/consultar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-5 pt-5">          
          <Route exact path='/' component={MenuInicial}></Route>
          <Route exact path='/autores' component={Autores}></Route>
          <Route exact path='/autores/adicionar' component={AdicionarAutor}></Route>
          <Route exact path='/autores/consultar' component={ConsultarAutor}></Route>

          <Route exact path='/editoras' component={Editoras}></Route>
          <Route exact path='/editoras/adicionar' component={AdicionarEditora}></Route>
          <Route exact path='/editoras/consultar' component={ConsultarEditora}></Route>

          <Route exact path='/livros' component={Livros}></Route>
          <Route exact path='/livros/adicionar' component={AdicionarLivro}></Route>
          <Route exact path='/livros/consultar' component={ConsultarLivro}></Route>
        </div>       
      </Router>
    </>
  );
}

export default App;
