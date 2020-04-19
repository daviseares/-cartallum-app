import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

import reducerIntegrante from './reducers/reducerIntegrante';
import reducerFamilia from './reducers/reducerFamilia';
import reducerInstituicao from './reducers/reducerInstituicao';


const reducers = combineReducers({
    reducerIntegrante: reducerIntegrante,
    reducerFamilia: reducerFamilia,
    reducerInstituicao: reducerInstituicao
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig;