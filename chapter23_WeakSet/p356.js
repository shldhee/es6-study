let newString = new String("문자열");
let newNumber = new Number(12345);
const newWeakSet = new WeakSet([newString, newNumber]);

try {
    new WeakSet(["ABC",345]); // ([ 여기 안에다 객체 작성 ])
} catch (e) {
    console.log("object 이외 지정 불가");
};

