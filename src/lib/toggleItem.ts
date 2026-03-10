// Adds item to array if not present, removes it if it is.
const toggleItem = (arr: string[], item: string): string[] =>
  arr.includes(item) ? arr.filter(v => v !== item) : [...arr, item];

export default toggleItem;