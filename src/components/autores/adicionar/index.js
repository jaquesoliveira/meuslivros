import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './adicionar-autor.css';
import firebase from '../../../config/firebase';


function AdicionarAutor(){

   

    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    const [nomeAutor, setNomeAutor] = useState();

    //const storage = firebase.storage();
    const db = firebase.firestore();


    function incluir(){
        db.collection('autores').add({
            nomeAutor: nomeAutor
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro =>{
            setMsg(erro);
            setMsgTipo('erro');
            setCarregando(0);
        });
    }
    return(
        <>
            {msgTipo === 'sucesso' ?
                    <div class="alert alert-primary" role="alert">
                        <span><strong>Wow!</strong> Evento cadastrado com sucesso &#128526;</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : ''
                }
            <h5>Adicionar Autor</h5>
            <hr />

            <form>
                <input
                    onChange={(e)=>setNomeAutor(e.target.value)} 
                    className="form-control" placeholder="Nome do Autor" value={nomeAutor && nomeAutor}/>
                <button                    
                    onClick={incluir} type="button" 
                    className="btn btn-secondary mt-2 mr-2">
                    
                        <i className="fas fa-save"> Salvar</i>
                </button>

                <Link to="/autores" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circle"> cancelar</i>
                </Link>
            </form>
        </>
    )
}

export default AdicionarAutor;