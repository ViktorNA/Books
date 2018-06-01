var allBooksReducer = function(state = [], action) {
  if (action.type === 'ADD_BOOKS') {
    return action.books;
  }
  return state;
}



export default allBooksReducer;
