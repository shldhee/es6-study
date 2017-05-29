const newSet = new Set(["one", () => {}]);
let iteratorObj = newSet.values();

console.log(iteratorObj.next());
console.log(iteratorObj.next());