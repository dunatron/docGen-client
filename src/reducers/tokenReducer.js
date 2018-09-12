const defaultState = {
  token: localStorage.getItem("jwt"),
  validToken: false,
  code: null,
  message: "",
  userName: localStorage.getItem("userName"),
  firstName: localStorage.getItem("firstName"),
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_TOKEN_IS_VALID":
      return {
        ...state,
        validToken: true,
      }
    case "SET_TOKEN_IS_NOT_VALID":
      return {
        ...state,
        validToken: false,
      }
    case "SET_TOKEN":
      localStorage.setItem("jwt", action.payload)

      return {
        ...state,
        token: action.payload,
        validToken: true,
      }
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      }
    case "SET_FIRST_NAME":
      localStorage.setItem("firstName", action.payload)
      return {
        ...state,
        firstName: action.payload,
      }
    case "LOGOUT":
      localStorage.removeItem("jwt")
      localStorage.removeItem("userName")
      localStorage.removeItem("firstName")
      return {
        ...state,
        token: null,
        userName: null,
        firstName: null,
        validToken: false,
      }
    default:
      return state
  }
}