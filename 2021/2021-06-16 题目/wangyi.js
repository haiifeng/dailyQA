/**
 * 在开发中，我们可能会遇到一些对异步请求数做并发量限制的场景，
比如说微信小程序的request并发最多为5个，又或者我们需要做一些批量处理的工作，可是我们又不想同时对服务器发出太多请求（可能会对服务器造成比较大的压力）。这个时候我们就可以对请求并发数进行限制，并且使用排队机制让请求有序的发送出去。
实现一个对请求并发数做限制的通用 Request 类,对应真实场景是控制并发请求数，并且需要返回请求的结果，模拟浏览器的并发请求控制
**/

class RequestDecorator {
    constructor({
        maxLimit = 5,
        requestApi,
    }) {
        // 最大并发量
        this.maxLimit = maxLimit;
        // 请求队列,若当前请求并发量已经超过maxLimit,则将该请求加入到请求队列中
        this.requestQueue = [];
        // 当前并发量数目
        this.currentConcurrent = 0;
    }

    // 发起请求api
    async request(...args) {
        // 若当前请求数并发量超过最大并发量限制，则将其阻断在这里。
        // startBlocking会返回一个promise，并将该promise的resolve函数放在this.requestQueue队列里。这样的话，除非这个promise被resolve,否则不会继续向下执行。
        // 当之前发出的请求结果回来/请求失败的时候，则将当前并发量-1,并且调用this.next函数执行队列中的请求
        // 当调用next函数的时候，会从this.requestQueue队列里取出队首的resolve函数并且执行。这样，对应的请求则可以继续向下执行。

        if (this.currentConcurrent >= this.maxLimit) {
            await this.startBlocking();
        }

        try {
            this.currentConcurrent++;
            const result = await this.requestApi(...args);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        } finally {
            console.log('当前并发数:', this.currentConcurrent);
            this.currentConcurrent--;
            this.next();
        }
    }

    // 新建一个promise,并且将该reolsve函数放入到requestQueue队列里。
    // 当调用next函数的时候，会从队列里取出一个resolve函数并执行。
    startBlocking() {
        let _resolve;
        let promise2 = new Promise((resolve, reject) => _resolve = resolve);
        this.requestQueue.push(_resolve);
        return promise2;
    }

    // 从请求队列里取出队首的resolve并执行。
    next() {
        if (this.requestQueue.length <= 0) return;
        const _resolve = this.requestQueue.shift();
        _resolve();
    }
}

module.exports = RequestDecorator;


function handleRequest(arr, max, cb) {
    let ajaxNum = 0;
    let length = arr.length;
    let result = [];

    const getFetch = (url) => {
        return new Promise((resolve) => {
            fetch(url).then((res) => {
                resolve(res.blob());
            })
        })
    }

    const handle = (urls) => {
        while (ajaxNum <= max && urls.length) {
            ajaxNum++;
            getFetch(urls.shift()).then((res) => {
                result.push(res);
                handle(urls);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                ajaxNum--;
                result.length === length && typeof cb === 'function' && cb(result);
            })
        }
    }
    handle(arr);
}


/**
 * *给定一个正整数，返回它在 Excel 表中相对应的列名称。例如，   
1 -> A    
2 -> B
3 -> C
...
26 -> Z
    
27 -> AA
28 -> AB 
29 -> AC
30 -> AD
 */
//核心是10进制转26进制
var convertToTitle = function (n) {
    if (n <= 0) return "";

    let res = [];
    while (n) {
        n--; // 通过让 n - 1，使得余数 remain 减少 1 
        let remain = n % 26;
        res.unshift(String.fromCharCode(remain + 65));
        n = Math.floor(n / 26);
    }
    return res.join("");
};



/**
 * 题目：树层序遍历
 * 输出[[A], [B, E], [C, D, F, G]]
 *          A
 *         / \
          B   E
         / \ / \
        C   DF  G
 * 输出[[A], [B, E], [C, D, F, G]]        
 **/
var levelOrder = function (root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }

    return ret;
};

// 反转链表
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};