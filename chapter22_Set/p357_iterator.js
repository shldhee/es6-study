const newSet = new Set([1, "스포츠"]);
let iteratorObj = newSet[Symbol.iterator]();

console.log(iteratorObj.next());
console.log(iteratorObj.next());