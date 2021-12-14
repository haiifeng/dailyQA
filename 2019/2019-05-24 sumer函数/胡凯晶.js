/**
 * 算法思路
 */
class Sumer{
    constructor(){
        this.sum=0;
    }
    add(num){
        this.sum=this.sum+num
        return this
    }
    getResult(){
        console.log(this.sum)
    }
}
function sumer(){
    return new Sumer()
}
let b=sumer()
b.add(1).add(2).add(3).getResult()