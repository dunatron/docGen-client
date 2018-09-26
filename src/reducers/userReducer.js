import { ORGANISATION_ID, AUTH_TOKEN } from "../constants"

const defaultState = {
  currOrgId: null,
  name: "",
  email: "",
  role: "",
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_TOKEN":
      localStorage.setItem(AUTH_TOKEN, action.payload)
      localStorage.setItem("jwt", action.payload)
      return {
        ...state,
      }
    case "SET_USER_ORG":
      localStorage.setItem(ORGANISATION_ID, action.payload)
      return {
        ...state,
        currOrgId: action.payload,
      }
    case "SET_USER_DETAILS":
      return {
        ...state,
        ...action.payload,
      }
    case "LOGOUT_USER":
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.removeItem("jwt")
      return {
        ...state,
        name: "",
        email: "",
        role: "",
      }
    default:
      return state
  }
}
