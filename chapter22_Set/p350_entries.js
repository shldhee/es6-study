const newSet = new Set(["one", () => {}]);
let iteratorObj = newSet.entries();

console.log(iteratorObj.next());
console.log(iteratorObj.next());