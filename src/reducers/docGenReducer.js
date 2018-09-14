/**
 * https://stackoverflow.com/questions/44989119/generating-a-pdf-file-from-react-components
 */
const defaultState = {
  pageAttributes: {
    type: "A4",
    screenDPI: 96,
    pageWidth: 794,
    pageHeight: 1123,
    percentage: 100,
  },
}
/**
 *
 * This stuff should be using computed derived data (Reselect):REFACTOR
 * Also it is missing step. You should, pass in DPI. dpi then should determine 1 of many switch cases for the size
 */
const getPageDimensions = type => {
  console.log("Reducer getPageDimensions type ->  ", type)
  switch (type) {
    case "A4":
      return {
        width: 794,
        height: 1123,
      }
    case "A7":
      return {
        width: 280,
        height: 397,
      }
    default:
      return {
        width: 794,
        height: 1123,
      }
  }
}

export default (state = defaultState, action) => {
  console.log("PLEASE JUST BE CALLED")
  switch (action.type) {
    case "SET_DPI":
      //https://www.papersizes.org/a-sizes-in-pixels.htm
      console.log("FFS")

      return {
        ...state,
        pageAttributes: {
          type: "A7",
          screenDPI: 96,
          pageWidth: 794,
          pageHeight: 1123,
        },
      }
    case "SET_PAGE_TYPE":
      // const currDPI = this.state.pageAttributes.screenDPI
      const dimensions = getPageDimensions(action.payload)
      console.log("mobon ", dimensions)
      return {
        ...state,
        pageAttributes: {
          ...state.pageAttributes,
          type: action.payload,
          pageWidth: dimensions.width,
          pageHeight: dimensions.height,
        },
      }
    case "UPDATE_PAGE_PERCENTAGE":
      return {
        ...state,
        pageAttributes: {
          ...state.pageAttributes,
          percentage: parseFloat(action.payload),
        },
      }
    default:
      return state
  }
}
