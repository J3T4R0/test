import { createStore, applyMiddleware, compose} from 'redux'
import combineReducer from '../reducers/index'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const store = createStore(combineReducer, {}, compose(
    applyMiddleware(createLogger(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
