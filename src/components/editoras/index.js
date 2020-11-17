import React from 'react';
import MenuAutores from './menu-editoras';
import { Link } from 'react-router-dom';
import './editoras.css'

function Editoras(){
    return(
        <>
            <h5>
                <Link to="/" className="top"><i class="fas fa-home top-icone"></i></Link> Editoras</h5>
            <hr />
            <MenuAutores />
        </>
    )
}

export default Editoras;