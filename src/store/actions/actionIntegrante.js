import { ADD_INTEGRANTE, REMOVE_INTEGRANTE, CLEAN_ALL } from '../actions/actionTypes';


/**
 * Add a location item in the list
 * @param {object} integrante 
 */
export const addIntegrante = (integrante) => {
    return {
        type: ADD_INTEGRANTE,
        payload: integrante,
    }
}


/**
 * delete integrante item in list
 * @param {object} integrante 
 */
export const removeIntegrante = (index) => {
    return {
        type: REMOVE_INTEGRANTE,
        key: index,
        //payload: location
    }
}


/**
 * delete integrante item in list
 * @param {object} integrante 
 */
export const cleanAll = () => {
    return {
        type: CLEAN_ALL,
        //key: index,
        //payload: location
    }
}