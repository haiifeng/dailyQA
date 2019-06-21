
// 上n阶楼梯方法的总数，每次只能上1阶或者2阶
function test(n){
    let countTwo = Math.floor(n/2);
    let allTips = 0;
    for(let index = 0; index <= countTwo; index++){
        let countLen = n - (2*index) + index;  //子数组的长度
        if(index === 0){
            allTips = allTips+1;
        }else {

           let al = n - (2 * index);
        //    this.getDetailSort(al,index,countLen)
           let sums = 1;
           let ds = 1;
           for(let i = 0; i < index; i++){
              sums = sums * (countLen-i);
              ds = ds*(index-i)
           }
           allTips += sums/ds;
        }
    }
    return allTips;
}



// 采用递归方法实现获取具体的方式

// 实现思路依次for循环固定一个2，循环次数为走2阶的个数，n为台阶数，
// 1、每次循环结束可以得到一个数组，将数组存入一组数组集合中，
// 2、直到循环结束，获得一个拥有n个数据的数组集allArray
// 3、依次遍历allArray，将allArray里的每一项转为字符串，之后去重，将获得不重复的实现方式；
// 4、再依次将转化的字符串转化为数组
// （其中3,4步骤也可以直接将数组allArray转化为Set()格式进行去重）


function getDetailSort(al,bl,allLen){
    // 循环bl-1次，及
    let array = [];
    arr.length = allLen;

    this.getArray(bl,[]);
}


function getArray(count,array){
    for(let a1 = 0; a1 < array.length; a1++){
        if(!array[a1]){
            array[a1] = 2;
            this.getArray(count--,array);
        }
    }
    return count;
}



