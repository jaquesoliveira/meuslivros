import React from 'react'
import './card-livro.css'
import { Link } from 'react-router-dom';


function CardLivro(props){
    return(
        <>
            <div className="card text-center card-livro mx-auto mb-3">
                <div className="card-body">
                    <img className="mb-2 img-card-livro" src={props.imagem} alt=""/>                    
                    <h5 className="card-title">{props.titulo}</h5>
                    
                    <p className="card-text">Autor(es): {props.autor ? props.autor.map(aut => aut.nomeAutor + '; '): ''}</p>
                    {props.editora ? props.editora.map( edi => <p className="card-text">Editora: {edi.nomeEditora}; </p>) : ''}
                    <Link to={'/livros/detalhes/' + props.id} className="btn btn-primary mr-1">Detalhes</Link>
                    <Link to={'/livros/alterar/' + props.id} className="btn btn-primary">Alterar</Link>
                </div>
            </div>
        </>
    )
}

export default CardLivro;