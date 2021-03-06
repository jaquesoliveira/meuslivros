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
import { Provider } from 'react-redux';
import {store, persistor} from '../src/store';
import DetalharLivro from './components/livros/detalhar';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './components/login';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar />
            <Route exact path='/' component={Login}></Route>
            
            <div className="container mt-4 pt-5">
              <Route exact path='/inicio' component={MenuInicial}></Route>
              <Route exact path='/autores' component={Autores}></Route>
              <Route exact path='/autores/adicionar' component={AdicionarAutor}></Route>
              <Route exact path='/autores/consultar' component={ConsultarAutor}></Route>

              <Route exact path='/editoras' component={Editoras}></Route>
              <Route exact path='/editoras/adicionar' component={AdicionarEditora}></Route>
              <Route exact path='/editoras/consultar' component={ConsultarEditora}></Route>

              <Route exact path='/livros' component={Livros}></Route>
              <Route exact path='/livros/adicionar' component={AdicionarLivro}></Route>
              <Route exact path='/livros/consultar' component={ConsultarLivro}></Route>
              <Route exact path='/livros/detalhes/:id' component={DetalharLivro}></Route>
              <Route exact path='/livros/alterar/:id' component={AdicionarLivro}></Route>
            </div>       
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
