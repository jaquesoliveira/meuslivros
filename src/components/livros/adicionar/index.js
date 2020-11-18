import React from 'react';
import { Link } from 'react-router-dom';
import './adicionar-livro.css';

function AdicionarLivro(){
    return(
        <>
            <h5>Adicionar Livro</h5>
            
            <hr />

            <form>                
                    <div class="form-group row">
                        <label >Título do livro</label>
                        <input className="form-control" placeholder="Nome do livro"/>
                    </div>

                    <div class="form-group row">
                        <div className="col-6">
                            <label >Autor</label>
                            <div className="row">
                                <input className="form-control col-5" placeholder="Nome do Autor"/>
                                <button className="btn btn-info "><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
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
                                    
                                </tbody>
                            </table>
                        </div>

                    <div class="form-group row">
                        <div className="col-6">
                            <label >Editora</label>
                            <input className="form-control " placeholder="Nome da editora"/>
                        </div>                       
                    </div>

                    <div className="row">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cia das Letras</th>                                
                                <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="btn btn-danger"><i className="fas fa-times-circle"></i>Excluir</button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                
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