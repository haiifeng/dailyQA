function createRandomArr(){            //或者直接生成10个随机数
    let arr=[]
    for(let i=0;i<10;i++){
        arr.push(Math.floor(Math.random()*100))
    }
    return arr
}
function sortArr(list){                 //数组相邻合并排序
   let arr=JSON.parse(JSON.stringify(list))
   for(let i=0;i<list.length;i++){
       if(list[i]===list[i-1]+1){
           arr[i]=(arr[i-1]+','+arr[i]).split(',')     
           arr[i-1]=null
       }
   }
   let data=arr.filter(item=>{
       return item
   })
   return data
}
function sortList(list){        //按区间排序
   let arr=[]
   for(let i=0;i<list.length;i++){
       let index=Math.floor(list[i]/10)
       arr[index]=arr[index]||[]
       arr[index].push(list[i])
   }
   for(let i=0;i<10;i++){
       if(arr[i]&&arr[i].length>1){
           arr[i].sort((a,b)=>a-b)
       }
   }
   return arr
}
let arr=createRandomArr()
let list1=sortArr(arr.sort((a,b)=>a-b))
console.log(list1)
let list2=sortList(arr)
console.log(list2)