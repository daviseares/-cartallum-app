import { DATA_INSTITUICAO } from '../actions/actionTypes';

/**
 * Lista de familia
 * @param {}  
 */
export const dataInstituicao = (instituicao) => {


    return (dispath) => {

        dispath({
            type: DATA_INSTITUICAO,
            payload: instituicao
        })
    }

}