import React from 'react';
import { Link } from 'react-router-dom';

function ConsultarLivro(){
    return(
        <>
            <h5> Consultar Livros</h5>
            <hr />

            <form>
                <input className="form-control" placeholder="Nome do Autor"/>
                <button type="button" className="btn btn-info mt-2 mr-2">
                    <i className="fas fa-search"> Consultar</i>
                </button>

                <Link to="/livros" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circl"> voltar</i>
                </Link>
            </form>
        </>
    )
}

export default ConsultarLivro;