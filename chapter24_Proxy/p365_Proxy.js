let target = { food: "밥"};
let middle = new Proxy(target, {
    get(target, key) {
        return target[key] + ",수저";
    }
});
let left = middle.food;
console.log(left);
