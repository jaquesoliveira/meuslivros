import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './adicionar-livro.css';

import firebase from '../../../config/firebase';


function AdicionarLivro(){

    const [tituloLivro, setTituloLivro] = useState('');
    const [editora, setEditora] = useState();
    const [autores, setAutores] = useState([]);
    const [detalhes, setDetalhes] = useState('');
    //const [nomeAutor, setNomeAutor] = useState(''); 
    const [nomeAutorPesquisa, setNomeAutorPesquisa] = useState(''); 
    const [autoresConsultados, setAutoresConsultados] = useState([]);

    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();
    const [adicionarAutor, setAdicionarAutor] = useState(0);

    const db = firebase.firestore();
    let listaAutores = []
    //let listaAutoresSelecionados = []    

    useEffect(() => {
        consultarAutores()
    },[nomeAutorPesquisa])

    function consultarAutores(){        
        if(nomeAutorPesquisa.length >1){
            firebase.firestore().collection('autores')
                .where('nomeAutor','>=', nomeAutorPesquisa)
                .get()
                .then(async(resultado) =>{
                    await resultado.docs.forEach(doc => {
                        if(doc.data().nomeAutor.indexOf(nomeAutorPesquisa) >= 0)
                        {
                            listaAutores.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        }
                    }
                )            
                setAutoresConsultados(listaAutores);       
            })
        }else{
            listaAutores=[]
            setAutoresConsultados(listaAutores);
        }
    }

    function incluir(){
        db.collection('livros').add({
            tituloLivro: tituloLivro,
            editora : editora,
            autores : autores,
            detalhes : detalhes
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

    function limpar(){
        setDetalhes('')
        setTituloLivro('')
        setEditora('')
        setAutores([])
    }   

    function addAutorConsultado(autorSelecionado){ 
        if(autores.length > 0){            
            autores.map(item => listaAutores.push(item))        
        } 

        listaAutores.push(autorSelecionado)
        
        setAutores(listaAutores);

        autoresConsultados.splice(autoresConsultados.indexOf(autorSelecionado),1)

    }

    function finalizarAddAutor(){
        setAdicionarAutor(0);
        setAutoresConsultados([])
    }

    return(
        <>
            {msgTipo === 'sucesso' ?
                <div class="alert alert-primary" role="alert">
                    <span>Livro cadastrado com sucesso</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : ''
            }
            <h5>
                <Link to="/livros" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Adicionar Livro</h5>            
            <hr />
            <form className="mb-4">                
                <div class="form-group">
                    <label >Título do livro</label>
                    <input
                        value={tituloLivro && tituloLivro} 
                        className="form-control col-lg-6 col-sm-12" 
                        placeholder="Nome do livro"
                        onChange={(e) => setTituloLivro(e.target.value)}/>
                </div>

                <div class="form-group">
                    <label >Editora</label>
                    <input
                        value={editora && editora} 
                        className="form-control col-lg-3 col-sm-12" 
                        placeholder="Nome da editora"
                        onChange={(e) => setEditora(e.target.value)}/>
                </div>

                <button 
                    type="button"
                    className="btn btn-info mb-1"
                    onClick={(e) => setAdicionarAutor(1)}>
                    Adicionar autor
                </button>

                { adicionarAutor > 0 ? <div className="add-autor p-2">
                    <div class="form-group">                        
                        {/* <label >Autor</label> */}
                        <div class="form-group inline"> 
                            <input
                                className="form-control col-lg-5 " 
                                placeholder="Digite o nome do autor"
                                onChange={(e) => setNomeAutorPesquisa(e.target.value)}
                                />                        
                        </div>
                    </div>

                    {       
                    autoresConsultados.map(item =>                              
                        <div class="list-group list-group-flush">                     
                            <div class="list-group-item list-group-item-action" >
                                <div class="d-flex w-100 justify-content-between">
                                    <div class="mb-1">{item.key} {item.nomeAutor}</div>
                                    <small>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-list"
                                            onClick={(e) => addAutorConsultado(item)}>
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </small>
                                </div>
                                <p class="mb-1"></p>
                                <small>
                                    
                                </small>
                            </div>
                        </div>
                    )}
                    <button
                        type="button" 
                        className="btn btn-info mt-1"
                        onClick={()=>finalizarAddAutor()}>Finalizar</button>
                </div>
                : ''}
                

                <h5>Autores</h5>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { autores.map(item =>    
                        <tr>
                            <td>{item.nomeAutor}</td>
                            <td>
                                <button className="btn btn-danger">
                                    <i className="fas fa-times-circle"></i>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                        )}                                               
                    </tbody>
                </table>

                <div class="form-group">
                    <label >Detalhes</label>
                    <textarea 
                        className="form-control" 
                        placeholder="Nome da editora"
                        value={detalhes && detalhes}
                        onChange={(e) => setDetalhes(e.target.value)}/>
                </div>
                <hr />
                <button 
                    type="button" 
                    className="btn btn-secondary mt-2 mr-2"
                    onClick={incluir}>
                        <i className="fas fa-save">Salvar</i>
                </button>

                <Link to="/livros" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circle">cancelar</i>
                </Link>
            </form>
        </>
    )
}

export default AdicionarLivro;