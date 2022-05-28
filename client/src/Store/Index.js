import {createStore, applyMiddlewere} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../Reducer'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddlewere(thunk)));