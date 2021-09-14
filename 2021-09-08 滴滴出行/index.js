({}) instanceof Object
([]) instanceof Object
Function instanceof Object
Array instanceof Object


setTimeout(()=>{
    console.log(1)
})

promise.resolve(2).then(res=>console.log(res))
new Promise(function(){})






// 实现一个itearator
function _iterator(arr){
    let index=0;
    return {
        next:()=>({
            value:arr[inex++],
            done:index>arr.length
        })
    }
}
const arr=[1,4,5];
const it=_iterator(arr);
it.next()