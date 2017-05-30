const newWeakSet = new WeakSet();
let newString = new String("문자열");
newWeakSet.add(newString);

let obj = {sports: "스포츠"};
newWeakSet.add(obj);