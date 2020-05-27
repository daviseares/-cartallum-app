import { combineReducers } from "redux";

//import todos from "./todos"; exemple import


import reducerIntegrante from './reducerIntegrante';
import reducerFamilia from './reducerFamilia';
import reducerInstituicao from './reducerInstituicao';


export default combineReducers({
    reducerIntegrante,
    reducerFamilia,
    reducerInstituicao
})

 