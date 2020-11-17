import React from 'react';
import { Link } from 'react-router-dom';
import './adicionar-editora.css';
function AdicionarEditora(){
    return(
        <>
            <h5>Adicionar Editora</h5>
            <hr />

            <form>
                <input className="form-control" placeholder="Nome do Autor"/>
                <button type="button" className="btn btn-secondary mt-2 mr-2">
                    <i className="fas fa-save"> Salvar</i>
                </button>

                <Link to="/editoras" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circle"> cancelar</i>
                </Link>
            </form>
        </>
    )
}

export default AdicionarEditora;