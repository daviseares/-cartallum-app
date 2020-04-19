import { DATA_INSTITUICAO } from '../actions/actionTypes';

const initialState = {
    instituicao: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA_INSTITUICAO:
            return {
                ...state,
                instituicao: action.payload

            }
        default:
            return state
    }
}

export default reducer