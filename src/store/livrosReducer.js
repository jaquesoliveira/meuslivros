const INITIAL_STATE = {
    livros: []
}

function livrosReducer(state = INITIAL_STATE, action){
    
    switch(action.type){
        case 'LISTA_PREENCHIDA': 
        console.log(action)           
            return {...state, livros: action.livros}
        case 'LOG_IN':
            console.log(INITIAL_STATE.usuarioEmail)
            return {...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail}
        case 'LOG_OUT':
                return {...state, usuarioLogado: 0, usuarioEmail: null}
        default:
            return state;    
    }
}

export default livrosReducer;