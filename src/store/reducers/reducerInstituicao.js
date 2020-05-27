import { SET_INSTITUICAO, SET_TOKEN } from '../actions/actionTypes';

const initialState = {
    instituicao: {},
    token: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INSTITUICAO:
            return {
                ...state,
                instituicao: action.payload

            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload

            }
        default:
            return state
    }
}

export default reducer