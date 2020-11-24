const INITIAL_STATE = {
    livros: []
}

function livrosReducer(state = INITIAL_STATE, action){
    const temp = {...state, livros: action.livros }
    
    switch(action.type){
        case 'LISTA_PREENCHIDA': 
        console.log(action)           
            return {...state, livros: action.livros}       
        default:
            return state;    
    }
}

export default livrosReducer;