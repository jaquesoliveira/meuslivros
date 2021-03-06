import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';

function ConsultarEditora(){

    const[editoras, setEditoras] = useState([]);    
    const [pesquisa, setPesquisa] = useState('');    
    let listaEditoras = [];

    const [excluir, setExcluir] = useState(0);
    const [msgTipo, setMsgTipo] = useState();

    const [editoraExcluir, setEditoraExcluir] = useState(0);
    const [carregando, setCarregando] = useState();

    function consultar(){        
        if(pesquisa.length > 3){
            firebase.firestore().collection('editoras').where('nomeEditora','>=', pesquisa).get()
            .then(async(resultado) =>{
                
                await resultado.docs.forEach(doc => {
                    if(doc.data().nomeEditora.indexOf(pesquisa) >= 0)
                    {
                        listaEditoras.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })            
                setEditoras(listaEditoras);       
            })
        }
    }

    useEffect(() => {        
        consultar();
    },[pesquisa])

    function limpar(){
        setPesquisa('');        
    }

    function excluirEditora(item){
        setExcluir(1);        

        if(item){
            setEditoraExcluir(item);
        }
    }

    function confirmarExclusao(){
        setExcluir(0); 
        setCarregando(1);       

        firebase.firestore().collection('editoras').doc(editoraExcluir).delete()
            .then(()=> {
                setMsgTipo('sucesso');
                
                limpar();
                listaEditoras = [];
                setEditoras(listaEditoras)
                setCarregando(0);
            })
    }

    function negarExclusao(){
        setExcluir(0);
    }

    return(
        <>
            <h5>
                <Link to="/editoras" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Consultar Editora</h5>
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
                    <span>Editora excluida com sucesso! &#128526;</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : ''
            }

            <form>
                <input onChange={(e)=>setPesquisa(e.target.value)} 
                    className="form-control" placeholder="Nome da editora" value={pesquisa}/>
                <button onClick={limpar} type="button" className="btn btn-info mt-2 mr-2">
                    <i class="fas fa-eraser"> Limpar</i>
                </button>
            </form>

            
            <hr />
            {       
                editoras.map(item => 
                    
                    carregando > 0 ? 
                    <div className="text-center"> 
                        <div class="spinner-border text-danger" role="status">
                        </div>
                    </div>
                :     
                <div class="list-group list-group-flush">                     
                    <div class="list-group-item list-group-item-action" >
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">{item.key} {item.nomeEditora}</div>
                            <small>
                                <button onClick={(e) => excluirEditora(item.id)} className="btn btn-danger btn-list">
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

export default ConsultarEditora;