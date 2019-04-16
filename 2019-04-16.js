/*
* 2019-04-16
* 第 55 题：
* 某公司 1 到 12 月份的销售额存在一个对象里面，如下：{1:222, 2:123, 5:888}，
* 请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
*
*/
const dataSource={1:222, 2:123, 5:888};
let targetData=[];

const transAbs=()=>{
    let i=1;
    do{
        if(dataSource[i]){
            targetData[i]=dataSource[i]
        }else{
            targetData[i]=null
        }
        i++;
    }while (i<12);
    return targetData;
}