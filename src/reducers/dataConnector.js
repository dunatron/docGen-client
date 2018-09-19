const defaultState = {
  dataConf: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_DATA_CONF":
      const newConfig = action.payload
      let dataConf = state.dataConf
      dataConf[newConfig.id] = { ...newConfig.confData }
      return {
        ...state,
        dataConf: dataConf,
      }
    case "REMOVE_DATA_CONF":
      const keyToRemove = action.payload
      let currDataConf = state.dataConf
      delete currDataConf[keyToRemove]
      currDataConf
      return {
        ...state,
        currDataConf,
      }
    default:
      return state
  }
}
