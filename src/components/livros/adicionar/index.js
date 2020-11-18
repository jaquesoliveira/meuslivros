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
                        <input className="form-control col-6" placeholder="Nome do livro"/>
                    </div>

                    <div class="form-group">
                        <label >Editora</label>
                        <input className="form-control col-3" placeholder="Nome da editora"/>
                    </div>

                    <div class="form-group">                        
                        <label >Autor</label>
                        <div className="row ml-1">
                            <input className="form-control col-5" placeholder="Nome do Autor"/>
                            <button className="btn btn-info "><i className="fas fa-plus"></i></button>
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