const defaultState = {
  dataConf: {},
  availableConfigs: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_AVAILABLE_CONF":
      const newAvailConfig = action.payload
      let availableConfigs = state.availableConfigs
      availableConfigs.unshift(newAvailConfig)
      return {
        ...state,
        availableConfigs: availableConfigs,
      }
    case "REMOVE_AVAILABLE_CONF":
      return {
        ...state,
        availableConfigs: [
          ...state.availableConfigs.slice(0, action.payload),
          ...state.availableConfigs.slice(action.payload + 1),
        ],
      }
    case "ADD_DATA_CONF":
      const newConfig = action.payload
      let dataConf = state.dataConf

      const camelCaseName = newConfig.name
        .replace(/\s(.)/g, function($1) {
          return $1.toUpperCase()
        })
        .replace(/\s/g, "")
        .replace(/^(.)/, function($1) {
          return $1.toLowerCase()
        })

      dataConf[camelCaseName] = { ...newConfig.confData }

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
