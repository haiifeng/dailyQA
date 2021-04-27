// 找出字符串中连续出现最多的字符和个数
const str = 'nabbccedeefgghijikkkklmn';
const findMaxByte=(s)=>{
    let obj={};
    s.split('').forEach(item=>{
        if(obj[item]){
            obj[item]++;
        }else{
            obj[item]=1;
        }
    });
    
}


// 给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
const nums = [19, 0, 2, 24, 20, 25, 85, 190, 109, 534, 190, 202, 200]
const toMaxValue = (arr) => {
    // return arr.sort().reverse().join(''); //使用sort默认会根据ascii码排序，但是对于2 20 200会排成[200,20,2]不符合要求
    return arr.sort((a, b) => Number(`${b}${a}`) - Number(`${a}${b}`)).join('');
}



// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
const arr = [2, 5, 1, 6, 7, 3, 4, 9, 0, 3];