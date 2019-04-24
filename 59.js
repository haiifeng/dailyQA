/*
* 第 59 题：给定两个数组，写一个方法来计算它们的交集。
* 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
*/
let nums1 = [1, 2, 2, 1],nums2 = [2, 2];
function filterCommon(arr1,arr2){
    return arr1.filter(item=>{
        return arr2.includes(item)
    })
}