export function addDataConf(conf) {
  return {
    type: "ADD_DATA_CONF",
    payload: conf,
  }
}

export function removeDataConf(confIdx) {
  return {
    type: "REMOVE_DATA_CONF",
    payload: confIdx,
  }
}
