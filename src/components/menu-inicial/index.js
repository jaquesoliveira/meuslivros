import React from 'react';
import './menu-inicial.css';

import {Link} from 'react-router-dom';

function MenuInicial(){
    return(
        <>
            <div className="">
                <h5>Menu inicial</h5>
                <hr />
            </div>
            <div className="row">
                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <Link to="/autores">
                        <div className="card-body menu-item">
                            <i class="fas fa-users fa-2x"> </i>

                            <div>
                                Autores
                            </div>
                        </div>
                        </Link>
                    </div>             
                </div>

                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <Link to="/editoras">
                            <div className="card-body menu-item">
                            <i class="far fa-newspaper fa-2x"></i>

                                <div>
                                    Editoras
                                </div>
                            </div>
                        </Link>
                    </div>             
                </div>

                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <div className="card-body menu-item">
                        <i class="fas fa-book fa-2x"></i>

                            <div>
                                Livros
                            </div>
                        </div>
                    </div>             
                </div>

                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <div className="card-body menu-item">
                            <i class="fas fa-share fa-2x"></i>

                            <div>
                                Emprestar Livro
                            </div>
                        </div>
                    </div>             
                </div>

                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <div className="card-body menu-item">
                            <i class="fas fa-users-cog fa-2x"></i>

                            <div>
                                Usuário
                            </div>
                        </div>
                    </div>             
                </div>
            </div>
        </>
    )
}

export default MenuInicial;