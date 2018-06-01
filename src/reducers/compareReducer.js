
var compareReducer = function(state = [], action) {

  switch (action.type) {
    case 'ADD_BOOK_TO_COMPARE':{
      return [...state, {
        numb: action.numb,
        item: action.item}]
    }; break;

    case 'UPDATE_COMPARE':
      return action.item;
      break;

    default:
      return state;
  }
}



export default compareReducer;
