# ES6

### var, let
global변수 (전역 번수)
var는 window 오브젝트 참고
let은 window 오브젝트에 참고되지 않는다.

### const
상수
const에 할당된 값은 변경할 수 없다.
선언만 할 수 없고 초깃값을 할당해야 한다.
변수 안 Object, Array 등의 오브젝트를 할당할 수 있다.

### => (화살표 함수)

```js
let es6 = (one, two) => {
    return one + two;
}
let total = (one, two) => one + two;
let get = value => value + 10;
let noParam = () => 3 + 5;

{key : value} 형태의 Object 오브젝트 반환
let sports = () => {};
sports(); // undefined;

// {} 블록스코프로 인식해 return 값이 없는걸로 판단

let sports = () => ({sports: "soccer"});
soccer(); // Object {sports: "soccer"}
```

* new 연산자 사용 불가(p.52)
* arguments 프로퍼티 사용 불가 대신 rest 파라미터 사용

#### this
```js
"use strict";

let Sports = function () {
    this.count = 20;
}

Sports.prototype = {
    plus: function() {
        this.count += 1;
    },
    get: function() {
        setTimeout(function() {
            console.log(this === window);
            console.log(this.plus);
        }, 1000);
    }
};

let newSports = new Sports();
newSports.get();
```
newSports.get() 호출하면
setTimeout 안 this가 window를 가리킨다.


```js
"use strict";

let Sports = function() {
    this.count = 20;
};

Sports.prototype = {
    plus: function() {
        this.count += 1;
    },
    get: function() {
        setTimeout(() => {
            this.plus();
            console.log(this.count);
        }, 1000);
    }
};

let newSports = new Sports();
newSports.get();
```
newSports.get() 호출하면
setTimeout 안 this가 newSports인스턴스를 가리킨다.

#### prototype
prototype에 연결하면 this가 메서드를 호출한 인스턴스를 참조하지 않고 window 오브젝트를 참조한다.
따라서 화살표 함수가 아닌 function 키워드 함수를 prototype에 연결한다.

#### Spread 연산자
[...iterableObject]
```js
let one = [11, 12];
let two = [21, 22];
let spreadObj = [51, ...one, 52, ...two];

spreadObj.length; // 6

let spreadObjj = [..."music"];
console.log('spreadObjj', spreadObjj); //["m", "u", "s", "i", "c"]
//spread 연산자로 작성한 "music"이 전개 대상입니다. String 오브젝트가 이터러블 오브젝트이므로 문자열 사용이 가능하다.


//함수 파라미터 호출하는 함수에 사용
const values = [10,20,30];
get(...values);

function get(one, two, three) {
    console.log('[one+two+three]', one+two+three);
};
```

### rest 파라미터
```js
// 호출 받는 함수에 사용
let get = (...rest) => {
    console.log('rest', rest);
    console.log('Array.isArray(rest)', Array.isArray(rest));
}

get(...[1,2,3]);

let get = (one, ...ccc) => {
    console.log('one', one); // 1
    console.log('rest', ccc); // [2,3]
};

get(...[1,2,3]);
```

***spread파라미터는 배열을 엘리먼트로 분리, 전개, rest파라미터는 전개된 엘리먼트를 다시 배열에 설정***

#### Array-like

Array는 아니지만 Array처럼 사용할 수 있는 Object 오브젝트를 Array-like라고 한다.

{key: value} 형태의 Object 오브젝트 특징을 유지하면서 배열의 특징을 가미한 것이 Array-like입니다.
{key: value} 형태에서 key에 0부터 1씩 증가하면서 값을 부여합니다.
배열의 인덱스 값을 프로퍼티 key 값으로 사용하는 것과 같다.
values["0"] 형태로 프로퍼티를 읽을 수 있다.
```js
let values = {
    0: "zero",
    1: "one",
    2: "two",
    length: 3

};

for (var key in values) {
    console.log(key, ':', values[key]);
};

//for-in문은 Object 오브젝트를 전개시 사용
//for-in문으로 values 오브젝트를 전개하면 length 프로퍼티도 전개되므로 적절하지 않습니다.
//즉, for-in문으로 Array-like를 전개하면 length 프로퍼티를 제외시킨다. (객체는 length 프로퍼티가 존재하지 않기 때문?????)

for (var i = 0; i < values.length; i++) {
    console.log(values[i]);
};
```
for() 문은 배열을 전개할 때 주로 사용합니다. for() 문으로 values 오브젝트를 전개하면 length 프로퍼티가 전개되지 않습니다.
형태는 Object 오브젝트지만 배열처럼 사용할 수 있습니다. Array-like(ES6의 여러프로젝트에서 사용)

//Array-like의 프로퍼티 키 값은 0부터 1씩 증가하면서 순차적으로 작성해야 한다.

let values = {10: "ten", zoo: "동물원", 2: "two", length:3 }; //프로퍼티 값이 10, zoo, 2 이므로 완전한 Array-like 형태가 아니다.
```js
for (var i = 0; i < values.length; i++) {
    console.log('values[i]',values[i]);
}
```

처음 values[0] 호출했는데 values 오브젝트 키 값이 0인 프로퍼티가 없으므로 undefined
values[1] 역시 undefined, values[2]는 "two"이므로 출력

Array-like는
***프로퍼티 키 값을 0부터 1씩 증가하면서 순차적으로 작성
length를 프로퍼티 키로 하여 전체 프로퍼티 수를 작성(프로퍼티 length 입력, values.length에서 가져옴)***
둘중 하나라도 만족하지 않으면 Array-like가 아니다.

#### rest와 arguments의 차이

arguments오브젝트가 Array-like이므로 Array오브젝트의 메서드 사용 불가, Object오브젝트 메서드 사용 가능하지만 모든 오브젝트에 Object 오브젝트가 상속된다......

rest 파라미터가 배열이므로 Array 오브젝트의 메서드를 사용 가능, 화살표 함수 블록에서 rest 파라미터 사용 가능, 따라서 arguments 오브젝트보다 rest 파라미터가 효율적


```js

```