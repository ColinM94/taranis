const isObject = (object: any) => {
  return object != null && typeof object === 'object'
}

/**
 * Compare two objects by value
 * @param object1
 * @param object2
 * @returns boolean if objects are same or not.
 */
export const compareObjects = (object1: any, object2: any) => {
  if (!object1 || !object2) return false

  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (const key of objKeys1) {
    const value1 = object1[key]
    const value2 = object2[key]

    const isObjects = isObject(value1) && isObject(value2)

    if ((isObjects && !compareObjects(value1, value2)) || (!isObjects && value1 !== value2)) {
      return false
    }
  }
  return true
}
