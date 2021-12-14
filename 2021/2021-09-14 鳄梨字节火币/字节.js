字节人力模块

// 通过'String'实现一个回文
// 123.getPalindrome({odd:true})//12321
// 'abc'.getPalindrome({odd:false})//abccba
String.prototype.getPalindrome = function (params = { odd: true }) {
    let str = this.valueOf();
    let length = this.length - 1
    if (params.odd) {
        length = this.length - 2;
    }

    while (length >= 0) {
        str += this[length]
        length--;
    }
    return str;
}

console.log('123'.getPalindrome())
console.log('123'.getPalindrome({ odd: false }))