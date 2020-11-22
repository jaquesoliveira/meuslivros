import React, {useState, useEffect}  from 'react'

import firebase from '../../../config/firebase';

function DetalharLivro(props){

    const [tituloLivro, setTituloLivro] = useState('');
    const [editora, setEditora] = useState([]);
    const [autores, setAutores] = useState([]);
    const [detalhes, setDetalhes] = useState('');
    const [imagemBase64, setImagemBase64] = useState([]);
    const [lido, setLido] = useState('off');
    const [numPaginas, setNumPaginas] = useState(0);

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
            })
        }    
    },[])

    return(
        <>
               {console.log( props.match.params.id)}         
        </>
    )
}

export default DetalharLivro;