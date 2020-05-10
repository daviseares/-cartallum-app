import { FAMILIA_ALL } from '../actions/actionTypes';

import api from '../../services/api';


/**
 * Lista de familia
 * @param {}  
 */
export const familiaAll = (data) => {

    try {
        return (dispath) => {

            dispath({
                type: FAMILIA_ALL,
                payload: data
            })

        }
    } catch (error) {
        setErro('Erro ao carrega familias')
    }

}

/**
 * Lista de familia
 * @param {}  
 */
export const familiaFilter = (familia) => {

    try {
        return (dispath) => {

            dispath({
                type: FAMILIA_ALL,
                payload: familia
            })
        }


    } catch (error) {
        setErro('Erro ao buscar família')
    }

}