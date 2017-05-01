# class

## class 선언문

class name {}
class name extends super_name {}

name 다음의 extends는 키워드로 super_name(슈퍼 클래스)를 상속받을 때 사용

## class 표현식

let name = class {}
let name = class inner_name {}
let name = class extends super_name {}
let name = class inner_name extends super_name {} // inner_name 자기 자신을 호출

## constructor

constructor는 클래스 인스턴스를 생성하고 생성한 인스턴스를 초기화하는 역할
new Member() 실행하면 Member.prototype.constructor가 호출
클래스에 constructor를 작성하지 않으면 prototype의 constructor가 호출 이를 디폴트 constructor라고 한다. constructor가 없으면 인스턴스를 생성할 수 없다.

``` js
class Member {
	constructor(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
}
let memberObj = new Member("스포츠");
console.log(memberObj.getName());
```

## constructor 반환 값 변경

constructor에 일반적으로 return 문을 작성하지 않으며, 생성한 인스턴스를 반환합니다.
한편, return문으로 인스턴스 이외의 값을 반환할 수 있습니다.
Object 오브젝트(객체)를 return하면 이를 반환

``` js
class Member {
	constructor(){
		return { name: "이순신" }; // { name : "홍길동" } 반환
	}
	getName() {
		return "이름";
	}
};

let memberObj = new Member();
console.log('memberObj.name', memberObj.name);
console.log('memberObj.getName()', memberObj.getName); // 인스턴스를 반환하지 않고  { name : "홍길동" } 반환하므로 getName 메소드가 존재하지 않아 undefined
```

## getter, setter

클래스에 getter, setter 선언할 수 있습니다. 메서드 이름 앞에 "get"을 작성하면 getter, "set"을 작성하면 setter

```js
찾아보자
```

## 상속

클래스를 상속받으면 상속받은 클래스의 메서드와 프로퍼티를 사용할 수 있습니다.
상속해 주는 클래스를 일반적으로 부모 클래스, 슈퍼 클래스라고 부른다.
상속받는 클래스를 일반적으로 자식 클래스, 서브 클래스라고 부른다.

객체지향자바스크립트의 원리 살펴보기!!

```js
function Sports(member) {
	this.member = member;
};
Sports.prototype.setItem = function(item) {
	this.item = item;
};
function Soccer(member) {
	Sports.call(this, member);
};
// setGround를 Sports.prototype에 추가 Sports.prototype에 연결된 메서드를 Soccer.prototype.__proto__에 첨부
Soccer.prototype = Object.create(Sports.prototype, {
	setGround: {
		value: function(ground) {
			this.ground = ground;
		}
	}
});
Soccer.prototype.constructor = Soccer;

var obj = new Soccer(11); // Sports() 호출 후 디폴트 constructor 호출 그래서 Sports()를 생성자(constructor) 함수라고 부른다.
obj.setItem("축구");
obj.setGround("상암");

console.log(obj.member);
console.log(obj.item);
console.log(obj.ground);
```

## extends 키워드

class subClass extends superClass { }

`class Soccer extends Sports{}` Soccer가 상속받는 서브 클래스이고, Sports가 상속해주는 슈퍼 클래스입니다.
new Soccer()로 인스턴스를 생성하면 인스턴스에서 Soccer 클래스 Sports 클래스의 메서드를 호출할 수 있습니다.

***extends 키워드는 서브클래스의 prototype에 __proto__를 만들고 여기에 슈퍼 클래스의 prototype에 연결된 프로퍼티를 연결*** 복사하는것이 아니라 공유!

``` js
class Sports {
	constructor(member) {
		this.member = member;
	}

	getMember() {
		return this.member;
	}
};

class Soccer extends Sports {
	setGround(ground) {
		this.ground = ground;
	}
};

let obj = new Soccer(11);


	1. new Soccer()로 인스턴스를 생성하면
	2. constructor가 호출 된다.
	3. this가 생성하는 인스턴스를 참조하므로
	4. 파라미터로 받은 값을 인스턴스의 member 프로퍼티에 설정이 가능하다.


console.log('obj.getMember()', obj.getMember());
```

## super 키워드

서브 클래스와 슈퍼 클래스는 obj.__proto__ 구조입니다. 따라서 서브 클래스와 슈퍼 클래스에 같은 이름의 메서드가 존대하면 슈퍼 클래스의 메서드가 호출되지 않습니다.
이때 super키워드를 사용하면 슈퍼 클래스의 메서드를 호출할 수 있습니다.

서브 클래스의 constructor에 super()를 작성하면 슈퍼 클래스의 constructor가 호출됩니다.
슈퍼 클래스의 메서드를 호출할려면 super.name()과 같이 super 키워드에 이어서 호출할려는 메서드 이름을 작성합니다.

*메서드 오버라이딩*
서브 클래스와 슈퍼 클래스에 같은 이름의 메서드가 있을 때 서브 클래스의 메서드가 호출되는 것을 메서드 오버라이딩(Overriding)이라고 합니다.

* 서브 클래스와 슈퍼 클래스의 메서드가 같은 목적을 가진 것을 나타내면서 서브 클래스의 목적에 맞도록 보완할 때 사용합니다.
* 슈퍼 클래스의 메서드 기능을 사용하면서 서브 클래스에서 기능을 추가, 변경할 때 사용합니다.
* 슈퍼 클래스와 서브 클래스의 메서드 기능/목적이 다를 때는 같은 이름을 사용하지 않습니다.

``` js
class Sports {
	setGround(ground) {
		this.ground = ground;
	}
};
class Soccer extends Sports {
	setGround(ground) {
		super.setGround();
		this.ground = ground;
	}
};
let obj = new Soccer(11);
obj.setGround('상암구장');
console.log(obj.ground); // '상암구장'

Sports클래스, Soccer클래스 둘다 setGround()가 있다.
sub클래스(Soccer클래스)에서 setGround가 오버라이딩되서 sub클래스의 메서드가 호출된다.
이때 super.setGround()는 슈퍼클래스의 setGround() 호출 한다. 하지만 파라미터가 없으므로 this.ground 는 undefined를 설정 (이는 의도적인것으로 ground 프로퍼티를 슈퍼 클래스와 서브클래스에서 공유하려는 의도)
즉, 일관성을 갖고 grond프로퍼티를 사용하기 위한 것
super.setGround()를 실행한 후 다음라인이 this.ground에서 파라미터로 받은 값을 설정합니다.
```

``` js
class Sports {
	constructor(member) {
		this.member = member;
		console.log(this.memeber);
	}
};
class Soccer extends Sports {
	constructor(member) {
		super(member); // 슈퍼 클래스의 constructor를 호출하면서 파라미터로 받은 값(1,2,3)을 넘겨줍니다.
		this.member = 456;
		console.log(this.member);
	}
};

let obj = new Soccer(123);

* 슈퍼클래스의 constructor를 호출할려면 서브 클래스 constructor의 첫째 줄에 super()를 작성
* super() 앞에 변수를 선언하거나 변수에 값을 할당하는 코드는 작성해도 되지만, this 키워드는 사용할 수 없다.
```

## 빌트인 오브젝트 상속

``` js
class ExtendArray extends Array { // ExtendArray 클래스에서 빌트인 Array 오브젝트를 상속받는다.
	constructor() {
		super(); // super()가 상속받은 클래스의 constructor를 호출하므로 Array 오브젝트의 constructor를 호출
	}
	getTotal() {
		let total = 0;
		for (var value of this) { // this는 obj 참조 ojb 인스턴스는 [10, 20], Array 오브젝트를 상속받아서 length 프로퍼티도 존재 즉 이터레이션을 수행할수있다.
			total += value;
		};
		return total;
	}
};
let obj = new ExtendArray(); // new 연산자로 인스턴스를 생성하면 인스턴스는 Array 오브젝트의 특징을 갖게 된다. 따라서 push()와 같은 Array 오브젝트 메서드를 직접 호출
obj.push(10,20);
console.log(obj.getTotal());
```

* "[].push(1,2,3)" 이 아닌 "인스턴스.push(1,2,3)" 형태로 호출
* 인스턴스.__proto__ 자기 자신 객체 메서드 포함
* 인스턴스.__proto__.__proto__ 상위 가리킴 Array.prototype
* for(var value of this) === for(var value of [10, 20])

## Object에서 super 사용

두 개의 Object 오브젝트가 연결된 구조에서 super.name() 형태로 슈퍼 오브젝트의 메서드를 호출할 수 있습니다.

``` js
let Sports = {
	getTitle() {
		console.log('Sports', Sports);
	}
};
let Soccer = {
	getTitle() {
		super.getTitle();
		console.log('Soccer', Soccer);
	}
};
Object.setPrototypeOf(Soccer, Sports); // Soccer.__proto__에 Sports 오브젝트의 프로퍼티가 첨부
Soccer.getTitle();
```

## static 키워드

클래스에 static(정적) 메서드를 정의합니다.

`static name() { code }`

정적 메서드는 클래스의 prototype에 연결되지 않고 클래스에 직접 연결됩니다.
prototype에 연결된 메서드는 인스턴스를 생성하여 호출 하지만,
정적 메서드는 인스턴스를 생성하지 않고 호출 합니다.
"클래스이름.정적 메서드 이름()" 형태로 작성

``` js
class Sports {
	static getGround() { // static 키워드 작성 정적 메서드
		return "상암구장";
	}
};
console.log(Sports.getGround()); // 클래스네임.정적메서드 호출
```

## Class 호이스팅

클래스는 호이스팅(hoisting)이 되지 않습니다. 이는 클래스 선언문과 클래스 표현식 모두 해당

``` js
try {
	let result = Memeber;
} catch (e) {
	console.log('호이스팅 불가');
};

class Member {
	static getMember() {
		return "memeber"
	}
};

* 만약 호이스팅이 된다면 result 변수에 Member 클래스가 할당 되지만, 호이스팅이 되지 않으면 Member를 인식하지 못해 에러 발생
* result 변수에 undefined가 설정되면 호이스팅이 된것으로 에러가 발생하는 것과 다르다.
* try 블록 스코프에 Member 클래스가 없으므로 밖으로 나가 Member 클래스를 찾습니다.
* try 문 아래에 Member 클래스가 작성되어 있지만 인식하지 못해 '호이스팅 불가' 출력
```

## computed name

클래스의 메서드 이름을 조합(computed name)하여 작성할 수 있습니다.

``` js
let type = "Type";
class Sports {
	static ["get" + type](kind) { // static getType(kind)
		return kind ? "스포츠" : "음악";
	}
}
console.log(Sports["get"+ type](1));

* 대괄호 [] 안에 조합할 이름을 작성
```

## this
정적 메서드에서 this는 클래스 오브젝트를 참조합니다.
constructor 안에서 this.constructor.name() 형태로 정적 메서드를 호출할 수 있습니다.

``` js
class Sports {
	static setGround(ground) {
		this.ground = ground; // this.ground에서 this가 Sports 클래스를 참조하므로 Sports 클래스에 { ground: '상암구장' } 형태로 설정
	}
	static getGround(ground) {
		return this.ground;
	}
};

Sports.setGround('상암구장');
console.log(Sports.getGround());
```

``` js
class Sports {
	constructor() {
		console.log(Sports.getGround());
		console.log(this.constructor.getGround());
	}
	static getGround() {
		return '상암 구장';
	}
	setGround() {
		console.log('1');
	}
};

let obj = new Sports();

* new Sports() 실행하면 constructor가 호출
* this가 new Sports()로 생성한 인스턴스를 참고하고, getGround가 정적 메서드이므로 인스턴스에 존재하지 않아 this.getGround() 형태로 호출할 수 없습니다.
* 하지만, constructor가 Sports 클래스를 참조하며 인스턴스의 __proto__에 constructor가 첨부되어 있으므로 this.constructor.getGround() 형태로 정적 메서드를 호출할 수 있습니다.
```

## 제네레이터

클래스 안에 제너레이터 함수(메서드라고 쓰는것이 어색하여 함수로)를 작성할 수 있다. 클래스 안에 작성하 제너레이터 함수는 prototype에 연결됩니다. 따라서 정적 메서드로 호출 할 수 없고 인스턴스를 생성하여 호출해야 한다.

``` js
class Member {
	*gen() {
		yield 10;
		yield 20;
	}
};

let obj = new Member(); // Member 인스턴스 생성
let genObj = obj.gen(); // 인스턴스의 제너레이터 함수 호출

console.log(genObj.next()); // { value : 10, done: false }
console.log(genObj.next()); // { value : 20, done: false }

* 클래스 안에 메서드를 정의할 때 function 키워드를 작성하지 않으므로 *gen() {} 형태로 제너레이터 함수를 정의.
* yield 2개 작성했으며, next() 2 번 호출한다는 것을 암시
```

## new.target

new.target은 메타(meta) 프로퍼티로 생성자 함수와 클래스에서 constructor를 참조합니다.
new 연산자로 인스턴스를 생성하지 않으면 new.target 값은 undefined입니다.

``` js
let sports = function(){
	console.log(new.target);
}

sports(); // sports()와 같이 함수로 호출하면 undefined
new sports();

* 생성자 함수로 호출하면 new.target은 constructor를 참조.
* sports 함수에 constructor를 작성하지 않았으므로 디폴트 constructor가 호출 constructor가 sport 전체를 참조하므로 sports 함수 코드 출력
디폴트 constructor =  function(){
	console.log(new.target);
}
```

**name 프로퍼티**
ES5에도 name 프로퍼티가 있었지만, 값이 설정되지 않아서 그다지 사용하지 않았다.
ES6는 클래스, 함수, 오브젝트에 name 프로퍼티가 존재하며 이름이 설정됩니다.

```js
class Sports {
	constructor() {
		console.log("Sports" , new.target.name);
	}
};

class Soccer extends Sports {
	constructor() {
		super();
		console.log("Soccer", new.target.name);
	}
};

let sportsObj = new Sports();
let soccerObj = new Soccer();

* Sports 클래스이므로 클래스의 name 프로퍼티에 "Sports"가 설정되어 있다.
* constructor에서 new.target은 constructor를 참조
* constructor가 Sports 클래스를 참조하므로 name 프로퍼티 값으로 "Sports"값 출력

//Soccer
* constructor에서 super()로 인해 슈퍼 클래스의 constructor호출
* 슈퍼 클래스 constructor에서 new.target은 super()로 호출한 constructor(Soccer)를 참조하므로 Soccer 출력
```

## Image 오브젝트 상속
