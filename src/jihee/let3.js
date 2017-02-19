"use strict";

var sports="축구";
let music="재즈";

function get(){
    var sports="농구";
    let music="클래식";
    console.log("1: ", sports);
    console.log("2: ", this.sports);
    console.log("3: ", this.music); //window.get => undefined : memory에는 있으나 초기화 되지 않음
}

window.get();
get(); // undefined.get() 으로 호출함