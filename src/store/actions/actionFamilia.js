import { FAMILIA_ALL } from '../actions/actionTypes';

import api from '../../services/api';


/**
 * Lista de familia
 * @param {}  
 */
export const familiaAll = () => {

    try {
        return (dispath) => {
            api.get('data/get_familia')
                .then(response => {
                    dispath({
                        type: FAMILIA_ALL,
                        payload: response.data.familia
                    })
                })
                .catch(err => {
                    console.log('Action: ',err)
                })
        }
    } catch (error) {
        setErro('Erro ao carrega familias')
    }

}