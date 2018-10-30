export const extractNumber = str => {
  try {
    // const theNum = str.replace(/^\D+/g, "")
    var string = "border-radius:10px 20px 30px 40px"
    // var numbers = string.match(/\d+/g).map(Number)
    var numbers = string.match(/\d+/g)
    console.log("Check these numbers out => ", numbers)
    return 12
  } catch (e) {
    // alert("could not extract number ", e)
    return str
  }
}
