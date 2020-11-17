import React from 'react';
import {Link} from 'react-router-dom';

function MenuAutores(){
    return(
        <>
            <div className="row">
                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <Link to="/autores/adicionar">
                        <div className="card-body menu-item">
                            <i class="fas fa-user-plus fa-2x"> </i>

                            <div>
                                Adicionar
                            </div>
                        </div>
                        </Link>
                    </div>             
                </div>

                <div class="col-md-2 col-sm-12  p-2">
                    <div className="card">
                        <Link to="/autores/consultar">
                        <div className="card-body menu-item">
                        <i class="fas fa-search fa-2x"></i>
                            <div>
                                Consultar
                            </div>
                        </div>
                        </Link>
                    </div>             
                </div>
            </div>   

        </>
    )
}

export default MenuAutores;