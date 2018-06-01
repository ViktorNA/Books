import { createStore } from 'redux';
import reducers from './reducers';
import {loadState} from './localStorage'
const persistedState = loadState();

const store = createStore(reducers, persistedState);
export default store;
