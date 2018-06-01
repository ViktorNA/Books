
var userReducer = function(state = 0, action) {

  switch (action.type) {
    case 'SET_AUTH':{
      return action.auth;
    }; break;

    default:
      return state;
  }
}



export default userReducer;
