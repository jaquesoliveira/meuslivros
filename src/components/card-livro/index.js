import React from 'react'
import './card-livro.css'

function CardLivro(props){
    return(
        <>
            <div className="card text-center card-livro">
                <div className="card-body">
                    <img className="mb-2 img-card-livro" src={props.imagem} alt=""/>                    
                    <h5 className="card-title">{props.titulo}</h5>
                    
                    {props.autor.map( aut => <p className="card-text">Autor(es): {aut.nomeAutor}</p>)}
                    {props.editora.map( edi => <p className="card-text">Editora: {edi.nomeEditora}</p>)}
                    <a href="#" className="btn btn-primary">Detalhes</a>
                </div>
            </div>
        </>
    )
}

export default CardLivro;