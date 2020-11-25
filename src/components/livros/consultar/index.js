import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';
import CardLivro from '../../card-livro';

import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../loading';

function ConsultarLivro(){

    const [tituloLivroPesquisa, setTituloLivroPesquisa] = useState('');
    const [livrosConsultados, setLivrosConsultados] = useState([])
    let listaLivros = []

    const [excluir, setExcluir] = useState(0);
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();
    const [livroExcluir, setLivroExcluir] = useState(0);
    
    const dispatch = useDispatch();
    const consultaStored = useSelector(state => state.livros)
       
    useEffect(() => {
        consultarLivros()
    },[tituloLivroPesquisa])

    function consultarLivros(){  
        setCarregando(1)      
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
                            console.log(resultado.docs.length)                           
                        }
                    }                     
                )            
                setLivrosConsultados(listaLivros);
                dispatch({type: 'LISTA_PREENCHIDA', livros: listaLivros})                
                setCarregando(0)
            })
        }else{
            setCarregando(0)
            setLivrosConsultados(consultaStored)
            console.log(consultaStored);
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
            <h5> 
                <Link to="/livros" className="top">
                    <i class="fas fa-reply top-icone"></i>
                </Link> Consultar livros

                <Link to="/livros/adicionar" className="top">
                    <i class="fas fa-plus top-icone float-right mr-2"></i>
                </Link>
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
            <div className="container-fluid row col-12">
            {   

            carregando > 0 ? 
                    <Loading />
                :
            livrosConsultados.map(item =>  
                 
                
                <div className="col-lg-4 col-sm-12 ">
                    <CardLivro 
                        key={item.id}
                        id={item.id}
                        titulo={item.tituloLivro}
                        autor={item.autores}
                        editora={item.editora}
                        imagem={item.imagem}      />
                </div>
                   
            )}
            </div>            
        </>
    )
}

export default ConsultarLivro;