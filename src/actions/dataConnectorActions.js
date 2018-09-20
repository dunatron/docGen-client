export function addDataConf(conf) {
  return {
    type: "ADD_DATA_CONF",
    payload: conf,
  }
}

export function removeDataConf(confKey) {
  return {
    type: "REMOVE_DATA_CONF",
    payload: confKey,
  }
}

export function addAvailableConf(conf) {
  return {
    type: "ADD_AVAILABLE_CONF",
    payload: conf,
  }
}

export function removeAvailableConf(confIdx) {
  return {
    type: "REMOVE_AVAILABLE_CONF",
    payload: confIdx,
  }
}
