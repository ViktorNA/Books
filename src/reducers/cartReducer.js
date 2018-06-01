
const initialState = {
  cart: []
}


var cartReducer = function(state = [], action) {

  switch (action.type) {
    case 'ADD_BOOK_TO_CART':{
      return [...state, {
        numb: action.numb,
        item: action.item}]
    }; break;

    case 'UPDATE_CART':
      return action.item;
      break;

    default:
      return state;
  }
}



export default cartReducer;
