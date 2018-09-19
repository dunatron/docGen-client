export function addLoadedDocument(document) {
  return {
    type: "ADD_LOADED_DOCUMENT",
    payload: document,
  }
}

export function removeLoadedDocument(docIdx) {
  return {
    type: "REMOVE_LOADED_DOCUMENT",
    payload: docIdx,
  }
}
