const newSet = new Set();
newSet.add("축구").add("농구");
newSet.add("축구");

for (let element of newSet) {
    console.log(element);
}