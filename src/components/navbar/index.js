import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import {useSelector} from 'react-redux';

function Navbar(){

    const usuarioStored = useSelector(state => state.usuarioEmail);

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark ">
                <Link to="/" className="navbar-brand" href="#">
                    <i class="fas fa-book-reader"><span className="ml-2">Meus Livros</span></i>
                </Link>
                <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link to="/" className="nav-link" href="#"
                                data-target="#navbarSupportedContent"
                                data-toggle="collapse">
                                Início
                            </Link>
                        </li>

                        

                        <li className="nav-item ">
                            <Link to="" className="nav-link">
                                Sair 
                                <span className="sr-only"></span>
                            </Link>
                        </li>
                        
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    {/* <img className="img-perfil mr-2" src="https://firebasestorage.googleapis.com/v0/b/sisbronse.appspot.com/o/perfil.jpeg?alt=media&token=18fa0133-4642-4ddf-99d0-480178c55016" alt=""/> */}
                    <Link to="">{usuarioStored}</Link>
                </div>
                </nav>
        </>
    )
}

export default Navbar;