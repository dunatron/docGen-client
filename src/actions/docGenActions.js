export function setDPI(dpi) {
  console.log("doc Gen action DPI")
  return {
    type: "SET_DPI",
    payload: dpi,
  }
}

export function setPageType(type) {
  return {
    type: "SET_PAGE_TYPE",
    payload: type,
  }
}

export function updatePagePercentage(percentage) {
  return {
    type: "UPDATE_PAGE_PERCENTAGE",
    payload: percentage,
  }
}
