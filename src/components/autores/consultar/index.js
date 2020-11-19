import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './consultar-autor.css';
import firebase from '../../../config/firebase';

function ConsultarAutor(){    

    const[autores, setAutores] = useState([]);    
    const [pesquisa, setPesquisa] = useState('');    
    let listaAutores = [];

    function consultar(){        
        if(pesquisa.length > 3){
            firebase.firestore().collection('autores').where('nomeAutor','>=', pesquisa).get().then(async(resultado) =>{
                await resultado.docs.forEach(doc => {
                    if(doc.data().nomeAutor.indexOf(pesquisa) >= 0)
                    {
                        listaAutores.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })            
                setAutores(listaAutores);       
            })
        }
    }

    useEffect(() => {        
        consultar();
    })

    function limpar(){
        setPesquisa('');        
    }

    // useEffect(() => {
    //     firebase.firestore().collection('autores').get().then(async(resultado) =>{
    //         await resultado.docs.forEach(doc => {
    //             if(doc.data().nomeAutor.indexOf(pesquisa) >= 0)
    //             {
    //                 listaAutores.push({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 })
    //             }
    //         })            
    //         setAutores(listaAutores);       
    //     })
    // },[])

    return(
        <>
            <h5>
                <Link to="/" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Consultar Autores</h5>
            <hr />

            <form>
                <input onChange={(e)=>setPesquisa(e.target.value)}  
                    className="form-control" 
                    placeholder="Nome do Autor"
                    value={pesquisa} />

                {/* <button type="button" className="btn btn-info mt-2 mr-2">
                    <i className="fas fa-search"> Consultar</i>
                </button> */}

                <button onClick={limpar} type="button" className="btn btn-info mt-2 mr-2">
                    <i class="fas fa-eraser">Limpar</i>
                </button>

                {/* <Link to="/autores" className="btn btn-secondary mt-2 mr-2">
                    <i className="fas fa-times-circl">voltar</i>
                </Link> */}
            </form>

            <hr />
            {
                // <ul class="list-group list-group-flush mt-4">
                //     {autores.map(item => 
                //         <li class="list-group-item d-flex justify-content-between align-items-center">{item.nomeAutor}                
                //             <span class="badge badge-pill">
                //                 <button className="btn btn-danger mt-2 mr-2">
                //                     Excluir
                //                 </button>
                //             </span>
                //         </li>
                //     )}
                // </ul>

                <div class="list-group list-group-flush">
                    {autores.map(item => 
                        <div class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{item.nomeAutor}</h5>
                                <small>
                                    <button className="btn btn-danger btn-list">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger btn-list">
                                        <i class="fas fa-eraser"></i>
                                    </button>
                                </small>
                            </div>
                            <p class="mb-1"></p>
                            <small>
                                
                            </small>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default ConsultarAutor;