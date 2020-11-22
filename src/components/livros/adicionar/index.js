import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import './adicionar-livro.css';


import firebase from '../../../config/firebase';


function AdicionarLivro(props){

    const [tituloLivro, setTituloLivro] = useState('');
    const [editora, setEditora] = useState([]);
    const [autores, setAutores] = useState([]);
    const [detalhes, setDetalhes] = useState('');
    //const [nomeAutor, setNomeAutor] = useState(''); 
    const [nomeAutorPesquisa, setNomeAutorPesquisa] = useState(''); 
    const [nomeEditoraPesquisa, setNomeEditoraPesquisa] = useState(''); 
    const [autoresConsultados, setAutoresConsultados] = useState([]);
    const [editorasConsultadas, setEditorasConsultadas] = useState([]);
    const [imagem, setImagem] = useState([]);
    const [imagemBase64, setImagemBase64] = useState([]);

    const [msgTipo, setMsgTipo] = useState();
    //const [msg, setMsg] = useState();
    //const [carregando, setCarregando] = useState();
    const [adicionarAutor, setAdicionarAutor] = useState(0);
    const [adicionarEditora, setAdicionarEditora] = useState(0);

    const db = firebase.firestore();
    let listaAutores = []
    let listaEditoras = []

    useEffect(() =>{
        if(props.match.params.id){
            
            firebase.firestore().collection('livros').doc(props.match.params.id).get()
            .then(resultado => {
                setTituloLivro(resultado.data().tituloLivro);
                setAutores(resultado.data().autores);
                setDetalhes(resultado.data().detalhes);
                setEditora(resultado.data().editora);
                setImagemBase64(resultado.data().imagem);                 
            })
        }    
    },[])

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

    useEffect(() => {
        consultarEditoras()
        console.log(nomeEditoraPesquisa)
    },[nomeEditoraPesquisa])

    function consultarEditoras(){        
        if(nomeEditoraPesquisa.length >1){
            firebase.firestore().collection('editoras')
                .where('nomeEditora','>=', nomeEditoraPesquisa)
                .get()
                .then(async(resultado) =>{
                    await resultado.docs.forEach(doc => {
                        if(doc.data().nomeEditora.indexOf(nomeEditoraPesquisa) >= 0)
                        {
                            listaEditoras.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        }
                    }
                )            
                setEditorasConsultadas(listaEditoras);       
            })
        }else{
            listaEditoras=[]
            setEditorasConsultadas(listaEditoras);
        }
    }

    function incluir(){
        if(props.match.params.id){
            db.collection('livros').doc(props.match.params.id).update({
                tituloLivro: tituloLivro,
                editora : editora,
                autores : autores,
                detalhes : detalhes,
                imagem: imagemBase64
            }).then(() => {
                setMsgTipo('sucesso');
                //setCarregando(0);
                limpar();
            }).catch(erro =>{
                //setMsg(erro);
                setMsgTipo('erro');
                //setCarregando(0);
            });

        }else{
            db.collection('livros').add({
                tituloLivro: tituloLivro,
                editora : editora,
                autores : autores,
                detalhes : detalhes,
                imagem: imagemBase64
            }).then(() => {
                setMsgTipo('sucesso');
                //setCarregando(0);
                limpar();
            }).catch(erro =>{
                //setMsg(erro);
                setMsgTipo('erro');
                //setCarregando(0);
            });
        }
    }

    function limpar(){
        setDetalhes('')
        setTituloLivro('')
        setEditora([])
        setAutores([])
        finalizarAddAutor()
        finalizarAddEditora()
    }   

    function addAutorConsultado(autorSelecionado){ 
        if(autores.length > 0){            
            autores.map(item => listaAutores.push(item))        
        } 

        listaAutores.push(autorSelecionado)        
        setAutores(listaAutores);
        autoresConsultados.splice(autoresConsultados.indexOf(autorSelecionado),1)
    }

    function addEditoraConsultada(editoraSelecionada){         

        listaEditoras.push(editoraSelecionada)        
        setEditora(listaEditoras);
        editorasConsultadas.splice(editorasConsultadas.indexOf(editoraSelecionada),1)
    }

    function finalizarAddAutor(){
        setAdicionarAutor(0);
        setAutoresConsultados([])
    }

    function finalizarAddEditora(){
        setAdicionarEditora(0);
        setAutoresConsultados([])
    }

    function handleIMAGEChange(e){
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImagem(file)
            setImagemBase64(reader.result)
        }
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
                        maxLength="100"
                        value={tituloLivro && tituloLivro} 
                        className="form-control" 
                        placeholder="Nome do livro"
                        onChange={(e) => setTituloLivro(e.target.value)}/>
                </div>

                <div className="card mb-3">
                    <div class="card-header">
                        Editora
                    </div>
                    <div className="card-body">
                        <button 
                            type="button"
                            className="btn btn-info mb-1"
                            onClick={(e) => setAdicionarEditora(1)}>
                            Adicionar editora
                        </button>

                        { adicionarEditora > 0 ? <div className="add-autor p-2">
                            <div class="form-group">                        
                                
                                <div class="form-group inline"> 
                                    <input
                                        className="form-control col-lg-5 " 
                                        placeholder="Digite o nome do autor"
                                        onChange={(e) => setNomeEditoraPesquisa(e.target.value)}
                                        />                        
                                </div>
                            </div>

                            {       
                            editorasConsultadas.map(item =>                              
                                <div class="list-group list-group-flush">                     
                                    <div class="list-group-item list-group-item-action" >
                                        <div class="d-flex w-100 justify-content-between">
                                            <div class="mb-1">{item.key} {item.nomeEditora}</div>
                                            <small>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-list"
                                                    onClick={(e) => addEditoraConsultada(item)}>
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
                                onClick={()=>finalizarAddEditora()}>Finalizar</button>
                        </div>
                        : ''}
                        
                        
                        <table class="table mt-2">                
                            <thead class="thead-dark">                        
                                <tr>
                                <th scope="col" colspan="2">Nome</th>
                                {/* <th scope="col" className="acoes-lista-autores">Ações</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                { editora.map(item =>    
                                <tr>
                                    <td>{item.nomeEditora}</td>
                                    <td className="acoes-lista-autores">
                                        <button className="btn btn-danger float-right">
                                            <i className="fas fa-times-circle"></i>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                                )}                                               
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card mb-3">
                    <div class="card-header">
                        Autores
                    </div>
                    <div className="card-body">
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
                        
                        
                        <table class="table">                
                            <thead class="thead-dark">                        
                                <tr>
                                <th scope="col" colspan="2">Nome</th>
                                {/* <th scope="col" className="acoes-lista-autores">Ações</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                { autores.map(item =>    
                                <tr>
                                    <td>{item.nomeAutor}</td>
                                    <td className="acoes-lista-autores">
                                        <button className="btn btn-danger">
                                            <i className="fas fa-times-circle"></i>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                                )}                                               
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="form-group">
                    <label >Detalhes</label>
                    <textarea 
                        maxLength="500"
                        className="form-control" 
                        placeholder="Nome da editora"
                        value={detalhes && detalhes}
                        onChange={(e) => setDetalhes(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Imagem: </label>
                    <input onChange={(e)=>handleIMAGEChange(e)} type="file" 
                        className="form-control"/>
                </div>
                <div>
                    <img src={imagemBase64 && imagemBase64} alt="..." />
                </div>

                <hr />
                <button 
                    type="button" 
                    className="btn btn-secondary mt-2 mr-2"
                    onClick={incluir}>
                        <i className="fas fa-save"> Salvar</i>
                </button>

                <Link to="/livros" className="btn btn-secondary mt-2">
                    <i className="fas fa-times-circle"> cancelar</i>
                </Link>
            </form>
        </>
    )
}

export default AdicionarLivro;