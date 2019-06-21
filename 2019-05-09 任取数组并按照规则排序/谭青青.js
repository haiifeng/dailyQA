//获取min-max范围之间长度为num且不重复的随机数
    getRandomAndSort(min,max,num) {
        let arr = [];
        const len = max-min;
        while (arr.length < num) {
            let a = Math.round(Math.random()*len + min);
            if(arr.indexOf(a) === -1) {
                arr.push(a);
            }
        }
        arr.sort(function(a,b){ return a-b});
        this.getRangeArr(arr);
        this.getNearByArr(arr);
        return arr;
    }
    //以10的倍数为一个区间来重组数组
    getRangeArr(newArr) {
        let reArr = [];
        newArr.forEach(item=>{
            let tempData = Math.floor(Number(item)/10);
            reArr[tempData] = reArr[tempData] || [];
            reArr[tempData].push(item);
        })
        let assembleArr = reArr.filter(item=>item.length !== 0);
    }

    //将相邻的值放到一个数组中
    getNearByArr(newArr){
        let tempArr = [];
        let tempIndex = 0;
        newArr.forEach((item,index,array)=>{
            tempArr[tempIndex] = tempArr[tempIndex] || [];
            if(index === 0) {
                tempArr[tempIndex].push(item);
            } else {
                if(Number(array[index-1]) + 1 === Number(item)) {
                    tempArr[tempIndex].push(item);
                } else {
                    tempIndex = tempIndex + 1;
                    tempArr[tempIndex] = [];
                    tempArr[tempIndex].push(item);
                }
            }
        });
        return tempArr;
    }