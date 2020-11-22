const INITIAL_STATE = {
    livros: []
}

function livrosReducer(state = INITIAL_STATE, action){
    console.log({...state, livros: action.livrosConsultados})
    switch(action.type){
        case 'LISTA_PREENCHIDA':            
            return {...state, livros: action.livrosConsultados}       
        default:
            return state;    
    }
}

export default livrosReducer;