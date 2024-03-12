export const capitaliseFirstLetter = (string: string): string => {
  return String(string).charAt(0).toUpperCase() + string.slice(1)
}
