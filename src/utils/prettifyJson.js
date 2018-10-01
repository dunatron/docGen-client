export const prettifyJson = json => {
  try {
    const prettyJson = JSON.stringify(json, undefined, 4)
    return prettyJson
  } catch (e) {
    alert("JSON not prettified ", e)
  }
}

export const uglifyJson = jsonString => {
  try {
    const uglyJson = JSON.parse(jsonString)
    return uglyJson
  } catch (e) {
    alert("There is an error in your JSON: ", e)
  }
}
