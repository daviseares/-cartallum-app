import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

import reducerIntegrante from './reducers/reducerIntegrante';


const reducers = combineReducers({
    reducerIntegrante: reducerIntegrante,

})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig;