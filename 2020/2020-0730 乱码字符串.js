// # js 去除?� 乱码

// ## 需求
// - 将这段字符串 "I'm?���driving�??�to�?beijing�?��after�breakfast"，格式化为："I'm driving to Beijing after breakfast"。
 
// ## 思路
// - 将字符串根据�拆分成数组，清除�的影响
// - 过滤空串或者无效的数组元素(这里指'?'字符串)
// - 匹配首位是否是?号，有的话就将第二个字符转成大写
// - 数组拼接为字符串
// ## 代码实现

let str = "I'm?���driving�??�to�?beijing�?��after�breakfast"

//截取成数组
strArr = str.split("�");
//strArr ["I'm?", "", "", "driving", "??", "?to", "?beijing", "?", "", "after", "breakfast"]
//过滤??和空字符串
strArr=strArr.filter(item=>{return !/^\?+$/.test(item) && item!==''});
//strArr ["I'm?", "driving", "?to", "?beijing", "after", "breakfast"]

//循环数组并把首字母改成大写并拼接
strArr=strArr.map(item=>{
    // 匹配首位是否是?号
    let reg = /^[?]/g;
    if(reg.test(item)){
        //JavaScript字符串是不可变的，因此不能通过使用运算符来改变字符串
        //slice(start,stop?)
        //表示截取从下标start 到下标stop（不包括该元素）的之间的元素，并返回新数组/新字符串，并不修改原数组/原字符串
        item=item.charAt(1).toUpperCase()+item.slice(2);
    };
    return item;
})
//strArr ["I'm?", "driving", "to", "Beijing", "after", "breakfast"]

//数组转字符串
strArr = strArr.join(" ").split('?').join('')
//I'm driving to Beijing after breakfast"
 
let temp='?beijing';
temp.charAt(1).toUpperCase();//返回B
console.log(temp);//还是返回'?beijing'
