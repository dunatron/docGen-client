export function setUserToken(token) {
  return {
    type: "SET_USER_TOKEN",
    payload: token,
  }
}

export function setUserOrg(orgId) {
  return {
    type: "SET_USER_ORG",
    payload: orgId,
  }
}

export function setUserDetails(user) {
  return {
    type: "SET_USER_DETAILS",
    payload: user,
  }
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
  }
}
