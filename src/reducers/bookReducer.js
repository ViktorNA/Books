var bookReducer = function(state = {}, action) {
  if (action.type === 'ADD_BOOK') {
    return action.book;
  }
  return state;
}



export default bookReducer;
