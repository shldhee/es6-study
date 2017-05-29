/*  
    Set오브젝트는 값을 배열로 작성
    추가한 순서로 인덱스를 부여
    순서대로 읽힘
    key 개념이므로 value1, value2가 값이면서 키 역할도 한다.
    (value값이 같으면 나중에 추가한 값은 추가되지 않는다.)
*/    

const setObj = new Set();
const ㅁㄴㄹㅁㄴㅇㄹ = new Set([1, 2, 1, 2, "스포츠"]);
console.log(ㅁㄴㄹㅁㄴㅇㄹ.size);

for (let element of ㅁㄴㄹㅁㄴㅇㄹ) {
    console.log(element);
}

console.dir(ㅁㄴㄹㅁㄴㅇㄹ);

// 파라미터엔 이터러블 오브젝트를 작성하고 그 안에 value를 작성