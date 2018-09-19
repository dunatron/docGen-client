const defaultState = {
  loadedDocuments: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_LOADED_DOCUMENT":
      const newDocument = action.payload
      console.log("The new document ", newDocument)
      let loadedDocuments = state.loadedDocuments
      console.log("Original documents ", loadedDocuments)
      loadedDocuments.unshift(newDocument)
      console.log("updated docuemnts ", loadedDocuments)
      return {
        ...state,
        loadedDocuments: loadedDocuments,
      }
    case "REMOVE_LOADED_DOCUMENT":
      //1. get the payload which is docIdx
      //2. get the loadedDocuments from store state
      //3. slice out the interested index
      return {
        ...state,
        loadedDocuments: [
          ...state.loadedDocuments.slice(0, action.payload),
          ...state.loadedDocuments.slice(action.payload + 1),
        ],
      }
    default:
      return state
  }
}
