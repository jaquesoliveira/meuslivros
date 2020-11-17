import React from 'react';
import MenuAutores from './menu-autores';
import { Link } from 'react-router-dom';
import './autores.css'

function Autores(){
    return(
        <>
            <h5>
                <Link to="/" className="top"><i class="fas fa-home top-icone"></i></Link> Autores</h5>
            <hr />
            <MenuAutores />
        </>
    )
}

export default Autores;