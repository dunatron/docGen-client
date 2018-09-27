export const flattenDataDescriptions = (json, masterKey) => {
  const flattenedObj = Object.entries(json).reduce(
    (descriptions, [key, value]) => ({
      ...descriptions,
      [`${masterKey}.${key}`]: `${value.name} - ${value.description} `,
    }),
    {}
  )
  console.log("The flattedned Keys With name - Descriptions ", flattenedObj)
  return flattenedObj
}

export const flattenDataValues = (json, masterKey) => {
  const flattenedObj = Object.entries(json).reduce(
    (values, [key, value]) => ({
      ...values,
      [`agreement.${key}`]: value.value,
    }),
    {}
  )
  console.log("The flattedned Values ", flattenedObj)
  return flattenedObj
}
