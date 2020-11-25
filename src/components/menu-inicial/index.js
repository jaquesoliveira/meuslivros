import React from 'react';
import './menu-inicial.css';

import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function MenuInicial(){

    const dispatch = useDispatch();
    const usuarioStored = useSelector(state => state.usuarioEmail);

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
                        <Link to="/livros">
                            <div className="card-body menu-item">
                                <i class="fas fa-book fa-2x"></i>
                                <div>
                                    Livros
                                </div>
                            </div>
                        </Link>
                    </div>             
                </div>                
            </div>
        </>
    )
}

export default MenuInicial;