const defaultState = {
  /**
  var myArray = []; // creating a new array object
  myArray['a'] = 200; // setting the attribute a to 200
  myArray['b'] = 300; // setting the attribute b to 300
   */
  dataConfigs: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_DATA_CONF":
      const newConfig = action.payload
      let dataConfigs = state.dataConfigs
      dataConfigs.unshift(newConfig)
      return {
        ...state,
        dataConfigs: dataConfigs,
      }
    case "REMOVE_DATA_CONF":
      //1. get the payload which is docIdx
      //2. get the loadedDocuments from store state
      //3. slice out the interested index
      return {
        ...state,
        dataConfigs: [
          ...state.dataConfigs.slice(0, action.payload),
          ...state.dataConfigs.slice(action.payload + 1),
        ],
      }
    default:
      return state
  }
}
