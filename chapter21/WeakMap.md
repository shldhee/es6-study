# WeakMap

* WeakMap 오브젝트의 key에 오브젝만 지정할 수 있고 string, number, symbol과 같은 값을 작성할 수 없다.
* **오브젝트**만 지정이 가능하다.
* value에는 타입 제한이 없다.

## GC(Garbage Collection)

``` js
let music = { title: "음악"};
music = { singer: "가수" };
```

1. `music` 변수에 { title:"음악" } 오브젝트 메모리에 설정
2. { singer: "가수"}도 오브젝트 생성하여 music 변수에 할당하므로 music 변수의 메모리주소 변경
3. { title: "음악"}은 사용하지 않은 메모리이므로 엔진이 지운다.
4. 이것이 바로 **GC**이다.

자동으로 사용하지 않은 메모리를 지우는 기능을 한다.
따라서 제공하는 메소드는 `set(), get(), has(), delete()`만 있다.
WeakMap 인스턴스에 [key, value]를 CRUD(Create, Read, Update, Delete)하기 위한 기본적인 메서드만 있습니다.

## new WeakMap() 인스턴스 생성

``` js
const emptyWeakMap = new WeakMap();
let obj = {};
const newWeakMap = new WeakMap([
    [obj, "오브젝트"]
]);
```

* `WeakMap()`에 파라미터 없어도 인스턴스 생성가능 상황에 따라 추가할려고
* 파라미터에는 이터러블 오브젝트 작성
* key에 오브젝트, value에 값을 작성

## set():key, value

``` js
const newWeakMap = new WeakMap();
(function() {
    var obj = {item: "weakmap"};
    newWeakMap.set(obj, "GC");
    console.log("1:", newWeakMap);
}());

const newMap = new Map();
(function() {
    var obj = {item: "map"};
    newMap.set(obj, "Keep");
}());

console.log("1:", newWeakMap);

setTimeout(function() {
    console.log("1:", newWeakMap); // GC로 죽어서 빈 오브젝트가 출력되야됨 근데 아닌것 같음
    console.log("2:", newMap);
}, 1000);
```

