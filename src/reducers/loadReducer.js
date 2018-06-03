var loadReducer = function(state = false, action) {
  if (action.type === 'CHANGE_LOAD') {
    return action.isLoad;
  }
  return state;
}



export default loadReducer;
