// 爱奇艺一面

// 1.react项目性能优化
// hooks的好处
// hooks里能不能使用hooks
//大数据下的列表性能优化

var x = 20;

function a(y) {
    var x = 10;
    return get(y);
}

function get(y) {
    return x + y; //x=20
}
console.log(a(10)); //30



const str1 = 'abc'; //'abc'
const str2 = new String('abc'); //String {"abc"}
str1 == str2; //true
str1 === str2 //false
str1.substr(); //"abc"
str2.substr(); //"abc"

// string.substring(from, to)
// string.substr(start,length)