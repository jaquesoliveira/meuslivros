import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './adicionar-editora.css';

import firebase from '../../../config/firebase';

function AdicionarEditora(){

    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    const [nomeEditora, setNomeEditora] = useState();

    //const storage = firebase.storage();
    const db = firebase.firestore();

    function incluir(){

        if(nomeEditora){
            console.log(nomeEditora);

            db.collection('editoras').add({
                nomeEditora: nomeEditora
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
                limpar();
            }).catch(erro =>{
                setMsg(erro);
                setMsgTipo('erro');
                setCarregando(0);
            });
        }
    }

    function limpar(){
        setNomeEditora('')
    }

    return(
        <>
            {msgTipo === 'sucesso' ?
                <div class="alert alert-primary" role="alert">
                    <span>Editora cadastrada com sucesso &#128526;</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : ''
            }

            {
                carregando > 0 ?  
                    <div class="spinner-border text-danger mx-auto" role="status">
                    </div>
                : ''    
            } 
            
            <h5>
                <Link to="/editoras" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Adicionar Editora</h5>
            <hr />

            <form>
                <input onChange={(e)=>setNomeEditora(e.target.value)}  className="form-control" placeholder="Nome do Autor"/>
                <button 
                    onClick={(e) => incluir()} 
                    type="button" className="btn btn-secondary mt-2 mr-2">
                        <i className="fas fa-save"> Salvar</i>
                </button>
            </form>
        </>
    )
}

export default AdicionarEditora;