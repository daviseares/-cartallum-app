import { SET_INSTITUICAO, SET_TOKEN } from '../actions/actionTypes';

/**
 * 
 * @param {Object} instituicao 
 */
export const storeInstituicao = (instituicao) => {
    return (dispath) => {
        dispath({
            type: SET_INSTITUICAO,
            payload: instituicao
        })
    }
}

/**
 * 
 * @param {Object} token 
 */
export const storeToken = (token) => {

    return (dispath) => {
        dispath({
            type: SET_TOKEN,
            payload: token
        })
    }
}