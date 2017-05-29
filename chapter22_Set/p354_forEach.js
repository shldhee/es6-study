const newSet = new Set(["one", "two"]);
newSet.forEach(function(value,key,obj) {
    console.log(value, this.member);
}, {member: 10});