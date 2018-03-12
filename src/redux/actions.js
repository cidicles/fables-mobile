export const CHANGE_USER = 'CHANGE_USER';
export function changeUser(user) {
  return {
    type: CHANGE_USER,
    user
  }
}

export const CHANGE_LOCALSTATE = 'CHANGE_LOCALSTATE';
export function changeLocalState(localState) {
  return {
    type: CHANGE_LOCALSTATE,
    localState
  }
}

export const CHANGE_MESSAGES = 'CHANGE_MESSAGES';
export function changeMessages(localState) {
  return {
    type: CHANGE_MESSAGES,
    messages
  }
}
