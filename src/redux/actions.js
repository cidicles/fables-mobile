export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_LOCALSTATE = 'CHANGE_LOCALSTATE';

export function changeUser(user) {
  return {
    type: CHANGE_USER,
    user
  }
}

export function changeLocalState(localState) {
  return {
    type: CHANGE_LOCALSTATE,
    localState
  }
}
