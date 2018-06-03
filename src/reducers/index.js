import { combineReducers } from 'redux';

// Reducers
import bookReducer from './bookReducer'
import allBooksReducer from './allBooksReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import compareReducer from './compareReducer'
import loadReducer from './loadReducer'
// Combine Reducers
var reducers = combineReducers({
    book: bookReducer,
    books: allBooksReducer,
    cart: cartReducer,
    auth: userReducer,
    compare: compareReducer,
    isLoad: loadReducer
});

export default reducers;
