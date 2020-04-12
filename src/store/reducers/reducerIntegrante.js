import { ADD_INTEGRANTE, REMOVE_INTEGRANTE, CLEAN_ALL } from '../actions/actionTypes';

const initialState = {
    listaIntegrantes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //add item in ListLocation    
        case ADD_INTEGRANTE:
            //console.log('Elemento para adicionar: ', action.payload)
            return {
                ...state,
                listaIntegrantes: state.listaIntegrantes.concat(action.payload),

            }
        //remove item for list
        case REMOVE_INTEGRANTE:
            //console.log('Elemento a Remover', action.key)
            return {
                listaIntegrantes: [
                    ...state.listaIntegrantes.slice(0, action.key),
                    ...state.listaIntegrantes.slice(action.key + 1)
                ]
            }
        case CLEAN_ALL:
            //console.log('CLEAN ')
            return {
                ...state,
                listaIntegrantes: [],

            }

        default:
            return state
    }
}

export default reducer