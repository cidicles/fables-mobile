// Redux 
const initialState = {
  ident: {
    user: {
      username: 'nobody'
    },
    token: {},
		messages: {}
  }
};

console.log(initialState)

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      console.log(action.user)
      return Object.assign({}, state, {
        ident: action.user
      });
    case 'CHANGE_LOCALSTATE':
      return Object.assign({}, state, {
        localState: action.localState
      });
		case 'CHANGE_MESSAGES':
      return Object.assign({}, state, {
        messages: action.messages
      });
    default:
      return initialState;
  }
};

export default mainReducer;
