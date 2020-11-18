import React from 'react';
import { Link } from 'react-router-dom';
import './adicionar-livro.css';

function AdicionarLivro(){
    return(
        <>
            <h5>Adicionar Livro</h5>
            
            <hr />

            <form>                
                    <div class="form-group">
                        <label >Título do livro</label>
                        <input className="form-control col-lg-6 col-sm-12" placeholder="Nome do livro"/>
                    </div>

                    <div class="form-group">
                        <label >Editora</label>
                        <input className="form-control col-lg-3 col-sm-12" placeholder="Nome da editora"/>
                    </div>

                    <div class="form-group">                        
                        <label >Autor</label>
                        <div class="form-group inline"> 
                            <input className="form-control col-lg-5 " placeholder="Nome do Autor"/>
                            <button className="btn btn-info col-sm-1 mt-1"><i className="fas fa-plus"></i></button>
                        </div>
                    </div>                       
                                        

                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Stephen Hawking</td>
                            <td><button className="btn btn-danger"><i className="fas fa-times-circle"></i>Excluir</button></td>
                            </tr>

                            <tr>
                            <th scope="row">1</th>
                            <td>Stephen Hawking</td>
                            <td><button className="btn btn-danger"><i className="fas fa-times-circle"></i>Excluir</button></td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <div class="form-group">
                        <label >Detalhes</label>
                        <textarea className="form-control" placeholder="Nome da editora"/>
                    </div>
                <hr />
                <button type="button" className="btn btn-secondary mt-2 mr-2">
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