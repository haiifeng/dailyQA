// 1. 反转链表


// 2. 给定一个链表: 1->2->3->4->5, 和 n = 2.

// 当删除了倒数第二个节点后，链表变为 1->2->3->5.
// 说明：

// 给定的 n 保证是有效的。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null
        }
    }
}
var removeNthFromEnd = function(head, n) {
    // your code
    
}

// 3. 实现一个请求控制函数

// 一次性输入多个 url 要求实现按照给定的最大的值并发请求，完成一个请求后自动发送下一个，请求全部结束后调用回调函数

var urls = ['http://1', 'http://2', 'http://3', 'http://4', 'http://5'];

function _fetch(url) {
    return new Promise(resolve => {
        console.log('fetching ', url);
        resolve(url);
    })
}

var requestControl = function(urls, max, callback){
    // your code
    let result=[];
    const promiseArr=urls.map((url=>_fetch(url)));
    let maxQueen=promiseArr.splice(0,max);
    while(maxQueen.length<=max){
        maxQueen.shift()().then((res)=>{
            result.push(res)
            maxQueen.push(promiseArr.shift());
        }).then(()=>{
            if(promiseArr.length==0){
                callback( result )
            }
         })
    }
                             
}

requestControl(urls, 2, () => console.log('done'))
