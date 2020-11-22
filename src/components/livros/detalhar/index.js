import React, {useState, useEffect}  from 'react'
import './detalhar-livro.css'
import firebase from '../../../config/firebase';
import { Link } from 'react-router-dom';

function DetalharLivro(props){

    const [tituloLivro, setTituloLivro] = useState('');
    const [editora, setEditora] = useState([]);
    const [autores, setAutores] = useState([]);
    const [detalhes, setDetalhes] = useState('');
    const [imagemBase64, setImagemBase64] = useState([]);
    const [lido, setLido] = useState('off');
    const [numPaginas, setNumPaginas] = useState(0);
    const [id, setId] = useState();

    useEffect(() =>{
        if(props.match.params.id){            
            firebase.firestore().collection('livros').doc(props.match.params.id).get()
            .then(resultado => {
                setTituloLivro(resultado.data().tituloLivro);
                setAutores(resultado.data().autores);
                setDetalhes(resultado.data().detalhes);
                setEditora(resultado.data().editora);
                setImagemBase64(resultado.data().imagem);  
                setNumPaginas(resultado.data().paginas);
                setLido(resultado.data().livroLido);               
                setId(resultado.id)
            })
            console.log("ok")
        }    
        console.log("fail")
    },[])

    return(
        <>
            <h5>
                <Link to="/livros/consultar" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Detalhes do Livro</h5>            
            <hr />
            <div className="row" >
                <img className="img-detalhes col-lg-3 mx-auto" src={imagemBase64} alt="imagem da capa do livro"/>
                <ul class="list-group list-group-flush col-lg-9">
                    <li class="list-group-item">Título: {tituloLivro}</li>                    
                    <li class="list-group-item">Autor(es): {autores.map(autor => autor.nomeAutor)}</li>
                    <li class="list-group-item">Editora: {editora.map(editora => editora.nomeEditora)}</li>
                    <li class="list-group-item">Páginas: {numPaginas}</li>
                    <li class="list-group-item">Detalhes: {detalhes}</li>
                    <li class="list-group-item">Já li?: {lido ? 'SIM' : 'NÃO'}</li>
                   
                </ul>
            </div>
            <div className="mt-2">
                <hr />
                <Link
                    to={'/livros/alterar/' + id} 
                    className="btn btn-info" type="button">Alterar</Link>
            </div>
        </>
    )
}

export default DetalharLivro;