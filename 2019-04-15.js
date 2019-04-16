/*
* 2019-04-15
* 第 54 题：
* 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？
*/
//时间复杂度： O(n2)

const bubbleSort1=(arr=[],sort=true)=>{
    for(let i=0;i<arr.length;i++){
        for(let j=i+1;j<arr.length;j++){
            let temp=arr[i];
            if(sort&&arr[i]-arr[j]>0){
                temp=arr[j];
                arr[j]=arr[i];
                arr[i]=temp;
                break;
            }
            if(!sort&&arr[i]-arr[j]<0){
                temp=arr[j];
                arr[j]=arr[i];
                arr[i]=temp;
                break;
            }
        }
    }
    return arr;
}

const bubbleSort2=(arr=[],sort=true)=>{
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            let temp=arr[j];
            if(sort&&arr[j+1]-arr[j]>0){
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
            if(!sort&&arr[j+1]-arr[j]<0){
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}