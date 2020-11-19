import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../../config/firebase';

function ConsultarAutor(){    

    const[autores, setAutores] = useState([]);    
    const [pesquisa, setPesquisa] = useState('');    
    let listaAutores = []; 


    useEffect(() => {
        firebase.firestore().collection('autores').get().then(async(resultado) =>{
            await resultado.docs.forEach(doc => {
                if(doc.data().nomeAutor.indexOf(pesquisa) >= 0)
                {
                    listaAutores.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            console.log(pesquisa)
            setAutores(listaAutores);       
        })
    },[])

    return(
        <>
            <h5> Consultar Autor</h5>
            <hr />

            <form>
                <input className="form-control" placeholder="Nome do Autor"/>
                <button type="button" className="btn btn-info mt-2 mr-2">
                    <i className="fas fa-search"> Consultar</i>
                </button>

                <Link to="/autores" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circl"> voltar</i>
                </Link>
            </form>

            <ul class="list-group list-group-flush mt-4">
                {autores.map(item => <li class="list-group-item">{item.nomeAutor}</li>)}
            </ul>
        </>
    )
}

export default ConsultarAutor;