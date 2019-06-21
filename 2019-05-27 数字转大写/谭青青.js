/**
 * 算法思路
 *在这里分三个数组,单位级数组unitArr、单位数组unit1、数字单位fingerUnit
 */

function turnUnit(money) {
    const unitArr = ['','万','亿','万亿'];
    const unit1 = ['','十','百','千'];
    const fingerArr = ['零','一','二','三','四','五','六','七','八','九'];
    money =  money.toString();
    let ms = money.split('.');   //将数组分成整数与小数两个数组
    let tanslterS = '';
    let ds = '';
    //对小数进行处理，不加单位，只进行数字转换
    if(ms[1]){
        for(let i = 0; i < ms[1].length; i ++) {
            if(i ===0 && ms[1][i] === ms[1][i-1] && Number(ms[1][i]) === 0 ) {
                return ;
            }
            ds += fingerArr[Number(ms[1][i])];
        }
    }
    //整数处理，将字符串位置倒置
    let ml = ms[0].split('').reverse().join('');
    for( let i = ml.length - 1 ; i >= 0 ; i-- ) {
        let tempS = '';
        // unitArr单位，如果是四的倍数则加上大单位
        let u2 = '';
        if(i / 4 === Math.ceil(i/4)) {
            u2 = unitArr[i/4];
        }
        // 单位，对应十百千，四位一单位组;
        let u1 = unit1[i%4];    //unit1单位

        if(Number(ml[i]) === 0) {
            //如果有连续的0出现，并且该处为4的倍数，则前面连续的0都不显示；
            //前一位为0吗？并且前一位不是4的倍数的话
            if( ( i!== ml.length-1 &&  Number(ml[i+1]) === 0 ) && (i+1) % 4 !== 0 ) {
                if( i % 4 === 0 ) {
                    //这是最后一位吗
                    let len = tanslterS.length-1;
                    tanslterS = tanslterS.substring(0,len);
                }
                tempS = u2;
            }else {
                //前一位不为0？
                if( i % 4 === 0 ) {
                    // 是最后一位的话,只加单位
                    tempS = u2;
                } else {
                    tempS = fingerArr[Number(ml[i])] + u2;
                }

            }
        } else {
            if(Number(ml[i]) === 1 && i % 4 === 1 && isNaN(ml[i+1]) ) {
                //如果为1且前面没有值的话，则直接用单位表示即可,例如-十亿可以直接用十亿替换
                tempS = u1 + u2;
            } else {
                tempS = fingerArr[Number(ml[i])] + u1 + u2;
            }
        }
        tanslterS = tanslterS + tempS;
    }
    if(ms[1]) {
        tanslterS = tanslterS + '点' + ds;
    }
    return tanslterS;
}
