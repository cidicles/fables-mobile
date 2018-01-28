import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

// Global Async Storage
let storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true
})
global.storage = storage;

async function loadState() {
  storage.load({
  	key: 'appState',
  	autoSync: false
  }).then(ret => {
  	return ret;
  }).catch(err => {
  	console.warn(err.message);
  });
}

// Redux Init
const initialState = {
  ident: {
    user: {
      username: 'nobody'
    },
    token: {}
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
    default:
      return initialState;
  }
};

export default mainReducer;
