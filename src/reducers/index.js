import { combineReducers } from 'redux';

// Reducers
import bookReducer from './bookReducer'
import allBooksReducer from './allBooksReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import compareReducer from './compareReducer'
// Combine Reducers
var reducers = combineReducers({
    book: bookReducer,
    books: allBooksReducer,
    cart: cartReducer,
    auth: userReducer,
    compare: compareReducer
});

export default reducers;
