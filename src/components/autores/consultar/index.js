import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './consultar-autor.css';
import firebase from '../../../config/firebase';

function ConsultarAutor(){    

    const[autores, setAutores] = useState([]);    
    const [pesquisa, setPesquisa] = useState('');    
    let listaAutores = [];

    const [excluir, setExcluir] = useState(0);
    //const [excluido, setExcluido] = useState(0);
    const [msgTipo, setMsgTipo] = useState();

    const [autorExcluir, setAutorExcluir] = useState(0);

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
    },[pesquisa])

    function limpar(){
        setPesquisa('');        
    }

    function excluirAutor(item){
        setExcluir(1);

        if(item){
            setAutorExcluir(item);
        }
    }

    function confirmarExclusao(){
        setExcluir(0);
        console.log(autorExcluir)

        firebase.firestore().collection('autores').doc(autorExcluir).delete()
            .then(()=> {
                //setExcluido(1);
                setMsgTipo('sucesso');
                
                limpar();
                listaAutores = [];
                setAutores(listaAutores)
            })
    }

    function negarExclusao(){
        setExcluir(0);
    }

    return(
        <>
            <h5>
                <Link to="/autores" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Consultar Autores</h5>
            <hr />

            {
                excluir > 0 ? 
                <div className="mx-auto text-center msg-confirmar-exclusao p-3 mb-2">
                    <p>Confirmar exclusão?</p>
                    <div>
                        <button onClick={confirmarExclusao} className="btn btn-info mr-2">Sim</button>
                        <button onClick={negarExclusao} className="btn btn-info">Não</button>
                    </div>
                </div>
                : ''
            }

            {
                msgTipo === 'sucesso' ?
                    <div class="alert alert-primary" role="alert">
                        <span>Autor excluido com sucesso! &#128526;</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : ''
                }

            <form>
                <input onChange={(e)=>setPesquisa(e.target.value)}  
                    className="form-control col-sm-12 col-md-4" 
                    placeholder="Nome do Autor"
                    value={pesquisa} />
                <button onClick={limpar} type="button" className="btn btn-info mt-2 mr-2">
                    <i class="fas fa-eraser"> Limpar</i>
                </button>
            </form>

            <hr />
            {       
            autores.map(item =>         
                <div class="list-group list-group-flush">                     
                    <div class="list-group-item list-group-item-action" >
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">{item.key} {item.nomeAutor}</div>
                            <small>
                                {/* <button className="btn btn-danger btn-list">
                                    <i class="fas fa-edit"></i>
                                </button> */}
                                <button onClick={(e) => excluirAutor(item.id)} className="btn btn-danger btn-list">
                                    <i class="fas fa-eraser"></i>
                                </button>
                            </small>
                        </div>
                        <p class="mb-1"></p>
                        <small>
                            
                        </small>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default ConsultarAutor;