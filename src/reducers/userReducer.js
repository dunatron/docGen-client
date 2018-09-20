import { ORGANISATION_ID } from "../constants"

const defaultState = {
  currOrgId: null,
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_ORG":
      localStorage.setItem(ORGANISATION_ID, action.payload)
      return {
        ...state,
        currOrgId: action.payload,
      }
    default:
      return state
  }
}
