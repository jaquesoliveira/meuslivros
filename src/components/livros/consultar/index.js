import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';
import CardLivro from '../../card-livro';

function ConsultarLivro(){

    const [tituloLivroPesquisa, setTituloLivroPesquisa] = useState('');
    const [livrosConsultados, setLivrosConsultados] = useState([])
    let listaLivros = []

    const [excluir, setExcluir] = useState(0);
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();
    const [livroExcluir, setLivroExcluir] = useState(0);

    useEffect(() => {
        consultarLivros()
    },[tituloLivroPesquisa])

    function consultarLivros(){        
        if(tituloLivroPesquisa.length >1){
            firebase.firestore().collection('livros')
                .where('tituloLivro','>=', tituloLivroPesquisa)
                .get()
                .then(async(resultado) =>{
                    await resultado.docs.forEach(doc => {
                        if(doc.data().tituloLivro.indexOf(tituloLivroPesquisa) >= 0)
                        {
                            listaLivros.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        }
                    }
                )            
                setLivrosConsultados(listaLivros);       
            })
        }else{
            listaLivros=[]
            setLivrosConsultados(listaLivros);
        }
    }

    function limpar(){
        setTituloLivroPesquisa('');        
    }

    function confirmarExclusao(){
        setExcluir(0);
        setCarregando(1)

        firebase.firestore().collection('livros').doc(livroExcluir).delete()
            .then(()=> {
                //setExcluido(1);
                setMsgTipo('sucesso');
                
                limpar();
                listaLivros = [];
                setLivrosConsultados(listaLivros)
                setCarregando(0)
            })
    }

    function negarExclusao(){
        setExcluir(0);
    }

    function excluirLivro(item){
        setExcluir(1);

        if(item){
            setLivroExcluir(item);
        }
    }

    return(
        <>
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
                        <span>Livro excluido com sucesso! &#128526;</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : ''
            }

            <h5> 
                <Link to="/livros" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Consultar livros
            </h5>
            <hr />

            <form>
                <input  
                    onChange={(e) => setTituloLivroPesquisa(e.target.value)} 
                    className="form-control" 
                    placeholder="Título do livro"/> 

                <button onClick={limpar} type="button" className="btn btn-info mt-2 mr-2">
                    <i class="fas fa-eraser"> Limpar</i>
                </button>              
            </form>

            <hr />
            {       
            livrosConsultados.map(item =>  
                carregando > 0 ? 
                    <div className="text-center"> 
                        <div class="spinner-border text-danger" role="status">
                        </div>
                    </div>
                :        
                <div className="col-lg-4 col-sm-12">
                    <CardLivro 
                        key={item.id}
                        id={item.id}
                        titulo={item.tituloLivro}
                        autor={item.autores}
                        editora={item.editora}
                        imagem={item.imagem}      />
                         
                </div>
            )}
        </>
    )
}

export default ConsultarLivro;