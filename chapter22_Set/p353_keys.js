const newSet = new Set(["one", () => {}]);
let iteratorObj = newSet.keys();

console.log(iteratorObj.next());
console.log(iteratorObj.next());