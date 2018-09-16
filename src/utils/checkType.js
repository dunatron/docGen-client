// https://webbjocke.com/javascript-check-data-types/

/**
 * String
 * A string is always a string so this one is easy.
 * Except if called with new (new String) typeof will instead return "object".
 * So to also include those strings instanceof can be used.
 */
export const isString = value => {
  return typeof value === "string" || value instanceof String
}

/**
 * Number
 * From typeof more things than just an ordinary number will return "number" like NaN and Infinity. To know if a value really is a number the function isFinite is also required.
 */
export const isNumber = value => {
  return typeof value === "number" && isFinite(value)
}

/**
 * Array
 * In javascript arrays are not true arrays like in java and in other languages.
 * They're actually objects so typeof will return "object" for them.
 * To know if something's really an array its constructor can be compared to Array
 */
export const isArray = value => {
  return value && typeof value === "object" && value.constructor === Array
}

/**
 * Function
 * Functions are functions so here just typeof is enough.
 */
export const isFunction = value => {
  return typeof value === "function"
}

/**
 * Many things are objects in javascript.
 * To know if a value is really an object that can have properties and be looped through,
 * its constructor can be compared to Object.
 */
export const isObject = value => {
  return value && typeof value === "object" && value.constructor === Object
}

/**
 * Most times you don't need to check explicitly for null and undefined since they're both falsy values.
 * However to do it below functions does the trick.
 */
export const isNull = value => {
  return value === null
}

export const isUndefined = value => {
  return typeof value === "undefined"
}

/**
 * For booleans typeof is enough since it returns "boolean" for both true and false.
 */
export const isBoolean = value => {
  return typeof value === "boolean"
}

/**
 * RegExp's are objects so the only thing needed to check is if the constructor is RegExp.
 */
export const isRegExp = value => {
  return value && typeof value === "object" && value.constructor === RegExp
}

/**
 * Errors in javascript are the same as "exceptions" in many other programming languages.
 * They come in a couple different forms like for instance Error, TypeError and RangeError.
 * An instanceof statement is enough for them all, but just to be extra sure we also check for the "message" property that errors have.
 */
export const isError = value => {
  return value instanceof Error && typeof value.message !== "undefined"
}

/**
 * Date isn't really a data type in javascript.
 * But to know if something's a Date object it can be tested with instanceof against Date.
 */
export const isDate = value => {
  return value instanceof Date
}

/**
 * In ES6 the new datatype Symbol was added. Nicely enough typeof returns "symbol" for it so no more logic is required.
 */
export const isSymbol = value => {
  return typeof value === "symbol"
}