/**
 * 算法思路:创建一个类，定义一个公共参数this.sum，每次调用add(n)方法，this.sum+n,调用getResult()方法就将this.sum打印
 */
 class Sumer {
    constructor() {
        this.sum = 0;
    }
    add(n) {
        this.sum = this.sum + n;
    }
    getResult(){
        console.log(this.sum);
    } 
}
function sumer(){
    return new Sumer();
}

// let a = sumer();
// a.add(2);
// a.add(3);
// a.getResult();  ====>5
