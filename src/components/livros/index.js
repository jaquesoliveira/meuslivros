import React from 'react';
import { Link } from 'react-router-dom';
import './livros.css'
import MenuLivros from './menu-livros';

function Livros(){
    return(
        <>
            <h5>
                <Link to="/" className="top"><i class="fas fa-home top-icone"></i></Link> Livros</h5>
            <hr />
            <MenuLivros />
        </>
    )
}

export default Livros;