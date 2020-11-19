import React from 'react'

function ItemListAutor(props){

    function excluirAutor(item){
        //setExcluir(1);

        if(item){
            //setAutorExcluir(item);
        }
        console.log('test');
    }
    return(
        <>
            <div class="list-group list-group-flush">                     
                    <div class="list-group-item list-group-item-action" >
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">{props.key} {props.nomeAutor}</div>
                            <small>
                                 <button className="btn btn-danger btn-list">
                                     <i class="fas fa-edit"></i>
                                 </button>
                                 <button onClick={excluirAutor(props.key)} className="btn btn-danger btn-list">
                                     <i class="fas fa-eraser"></i>
                                 </button>
                             </small>
                         </div>
                         <p class="mb-1"></p>
                         <small>
                             
                         </small>
                     </div>
                 
             </div>

        </>
    )
}

export default ItemListAutor;