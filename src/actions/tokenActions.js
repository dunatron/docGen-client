export function setToken(token) {
  return {
    type: 'SET_TOKEN',
    payload: token
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name
  }
}

export function setFirstName(name) {
  return {
    type: 'SET_FIRST_NAME',
    payload: name
  }
}

export function logoutUser() {
  return {
    type: 'LOGOUT',
  }
}

export function setTokenIsValid() {
  return {
    type: 'SET_TOKEN_IS_VALID'
  }
}

export function setTokenIsNotValid() {
  return {
    type: 'SET_TOKEN_IS_NOT_VALID'
  }
}