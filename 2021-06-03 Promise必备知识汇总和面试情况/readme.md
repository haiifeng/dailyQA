# Promise必备知识汇总和面试情况

## 写在前面
Javascript异步编程先后经历了四个阶段，分别是Callback阶段，Promise阶段，Generator阶段和Async/Await阶段。Callback很快就被发现存在回调地狱和控制权问题，Promise就是在这个时间出现，用以解决这些问题，Promise并非一个新事务，而是按照一个规范实现的类，这个规范有很多，如 Promise/A，Promise/B，Promise/D以及 Promise/A 的升级版 Promise/A+，最终 ES6 中采用了 Promise/A+ 规范。后来出现的Generator函数以及Async函数也是以Promise为基础的进一步封装，可见Promise在异步编程中的重要性。
关于Promise的资料已经很多，但每个人理解都不一样，不同的思路也会有不一样的收获。这篇文章会着重写一下Promise的实现以及笔者在日常使用过程中的一些心得体会。

## 实现Promise
### 规范解读
Promise/A+规范主要分为术语、要求和注意事项三个部分，我们重点看一下第二部分也就是要求部分，以笔者的理解大概说明一下，具体细节参照完整版Promise/A+标准。
- 1、Promise有三种状态pending，fulfilled和rejected。（为了一致性，此文章称fulfilled状态为resolved状态）
    - 状态转换只能是pending到resolved或者pending到rejected；
    - 状态一旦转换完成，不能再次转换。
- 2、Promise拥有一个then方法，用以处理resolved或rejected状态下的值。
    - then方法接收两个参数onFulfilled和onRejected，这两个参数变量类型是函数，如果不是函数将会被忽略，并且这两个参数都是可选的。
    - then方法必须返回一个新的promise，记作promise2，这也就保证了then方法可以在同一个promise上多次调用。（ps：规范只要求返回promise，并没有明确要求返回一个新的promise，这里为了跟ES6实现保持一致，我们也返回一个新promise）
    - onResolved/onRejected有返回值则把返回值定义为x，并执行[[Resolve]](promise2, x);
    - onResolved/onRejected运行出错，则把promise2设置为rejected状态；
    - onResolved/onRejected不是函数，则需要把promise1的状态传递下去。
- 3、不同的promise实现可以的交互。
    - 规范中称这一步操作为promise解决过程，函数标示为[[Resolve]](promise, x)，promise为要返回的新promise对象，x为onResolved/onRejected的返回值。如果x有then方法且看上去像一个promise，我们就把x当成一个promise的对象，即thenable对象，这种情况下尝试让promise接收x的状态。如果x不是thenable对象，就用x的值来执行 promise。
    - [[Resolve]](promise, x)函数具体运行规则：
        - 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise;
        - 如果 x 为 Promise ，则使 promise 接受 x 的状态;
        - 如果 x 为对象或者函数，取x.then的值，如果取值时出现错误，则让promise进入rejected状态，如果then不是函数，说明x不是thenable对象，直接以x的值resolve，如果then存在并且为函数，则把x作为then函数的作用域this调用，then方法接收两个参数，resolvePromise和rejectPromise，如果resolvePromise被执行，则以resolvePromise的参数value作为x继续调用[[Resolve]](promise, value)，直到x不是对象或者函数，如果rejectPromise被执行则让promise进入rejected状态；
        - 如果 x 不是对象或者函数，直接就用x的值来执行promise。
### 代码实现
规范解读第1条，代码实现：
```
class Promise {
  // 定义Promise状态，初始值为pending
  status = 'pending';
  // 状态转换时携带的值，因为在then方法中需要处理Promise成功或失败时的值，所以需要一个全局变量存储这个值
  data = '';

  // Promise构造函数，传入参数为一个可执行的函数
  constructor(executor) {
    // resolve函数负责把状态转换为resolved
    function resolve(value) {
      this.status = 'resolved';
      this.data = value;
    }
    // reject函数负责把状态转换为rejected
    function reject(reason) {
      this.status = 'rejected';
      this.data = reason;
    }

    // 直接执行executor函数，参数为处理函数resolve, reject。因为executor执行过程有可能会出错，错误情况需要执行reject
    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }
}
```
第1条就是实现完毕了，相对简单，配合代码注释很容易理解。
规范解读第2条，代码实现：
```
/**
    * 拥有一个then方法
    * then方法提供：状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
    * 返回一个新的Promise
  */
  then(onResolved, onRejected) {
    // 设置then的默认参数，默认参数实现Promise的值的穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) { return e };
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e };
    
    let promise2;
    
    promise2 =  new Promise((resolve, reject) => {
      // 如果状态为resolved，则执行onResolved
      if (this.status === 'resolved') {
        try {
          // onResolved/onRejected有返回值则把返回值定义为x
          const x = onResolved(this.data);
          // 执行[[Resolve]](promise2, x)
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
      // 如果状态为rejected，则执行onRejected
      if (this.status === 'rejected') {
        try {
          const x = onRejected(this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }
    });
    
    return promise2;
  }
  ```
  现在我们就按照规范解读第2条，实现了上述代码，上述代码很明显是有问题的，问题如下
- resolvePromise未定义；
- then方法执行的时候，promise可能仍然处于pending状态，因为executor中可能存在异步操作（实际情况大部分为异步操作），这样就导致onResolved/onRejected失去了执行时机；
- onResolved/onRejected这两个函数需要异步调用(官方Promise实现的回调函数总是异步调用的)。

解决办法：
- 根据规范解读第3条，定义并实现resolvePromise函数；
- then方法执行时如果promise仍然处于pending状态，则把处理函数进行储存，等resolve/reject函数真正执行的的时候再调用。
- promise.then属于微任务，这里我们为了方便，用宏任务setTiemout来代替实现异步，具体细节特别推荐这篇文章。
好了，有了解决办法，我们就把代码进一步完善：
```
class Promise {
  // 定义Promise状态变量，初始值为pending
  status = 'pending';
  // 因为在then方法中需要处理Promise成功或失败时的值，所以需要一个全局变量存储这个值
  data = '';
  // Promise resolve时的回调函数集
  onResolvedCallback = [];
  // Promise reject时的回调函数集
  onRejectedCallback = [];

  // Promise构造函数，传入参数为一个可执行的函数
  constructor(executor) {
    // resolve函数负责把状态转换为resolved
    function resolve(value) {
      this.status = 'resolved';
      this.data = value;
      for (const func of this.onResolvedCallback) {
        func(this.data);
      }
    }
    // reject函数负责把状态转换为rejected
    function reject(reason) {
      this.status = 'rejected';
      this.data = reason;
      for (const func of this.onRejectedCallback) {
        func(this.data);
      }
    }

    // 直接执行executor函数，参数为处理函数resolve, reject。因为executor执行过程有可能会出错，错误情况需要执行reject
    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }
  /**
    * 拥有一个then方法
    * then方法提供：状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
    * 返回一个新的Promise
  */
  then(onResolved, onRejected) {

    // 设置then的默认参数，默认参数实现Promise的值的穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) { return e };
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e };

    let promise2;

    promise2 =  new Promise((resolve, reject) => {
      // 如果状态为resolved，则执行onResolved
      if (this.status === 'resolved') {
        setTimeout(() => {
          try {
            // onResolved/onRejected有返回值则把返回值定义为x
            const x = onResolved(this.data);
            // 执行[[Resolve]](promise2, x)
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为rejected，则执行onRejected
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为pending，则把处理函数进行存储
      if (this.status = 'pending') {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }

    });

    return promise2;
  }

  // [[Resolve]](promise2, x)函数
  resolvePromise(promise2, x, resolve, reject) {
    
  }
  
}
```
至此，规范中关于then的部分就全部实现完毕了。代码添加了详细的注释，参考注释不难理解。
规范解读第3条，代码实现：
```
// [[Resolve]](promise2, x)函数
  resolvePromise(promise2, x, resolve, reject) {
    let called = false;

    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }
    
    // 如果x仍然为Promise的情况
    if (x instanceof Promise) {
      // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值，所以需要继续调用resolvePromise
      if (x.status === 'pending') {
        x.then(function(value) {
          resolvePromise(promise2, value, resolve, reject)
        }, reject)
      } else { 
        // 如果x状态已经确定了，直接取它的状态
        x.then(resolve, reject)
      }
      return
    }
  
    if (x !== null && (Object.prototype.toString(x) === '[object Object]' || Object.prototype.toString(x) === '[object Function]')) {
      try {
        // 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用，所以通过变量called进行控制
        const then = x.then 
        // then是函数，那就说明x是thenable，继续执行resolvePromise函数，直到x为普通值
        if (typeof then === 'function') { 
          then.call(x, (y) => { 
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            if (called) return;
            called = true;
            reject(r);
          })
        } else { // 如果then不是函数，那就说明x不是thenable，直接resolve x
          if (called) return ;
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
  ```
  这一步骤非常简单，只要按照规范转换成代码即可。
最后，完整的Promise按照规范就实现完毕了，是的，规范里并没有规定catch、Promise.resolve、Promise.reject、Promise.all等方法，接下来，我们就看一看Promise的这些常用方法。
### Promise其他方法实现
- 1、catch方法

catch方法是对then方法的封装，只用于接收reject(reason)中的错误信息。因为在then方法中onRejected参数是可不传的，不传的情况下，错误信息会依次往后传递，直到有onRejected函数接收为止，因此在写promise链式调用的时候，then方法不传onRejected函数，只需要在最末尾加一个catch()就可以了，这样在该链条中的promise发生的错误都会被最后的catch捕获到。
```
catch(onRejected) {
    return this.then(null, onRejected);
}
  ```
- 2、done方法

catch在promise链式调用的末尾调用，用于捕获链条中的错误信息，但是catch方法内部也可能出现错误，所以有些promise实现中增加了一个方法done，done相当于提供了一个不会出错的catch方法，并且不再返回一个promise，一般用来结束一个promise链。
```
done() {
this.catch(reason => {
    console.log('done', reason);
    throw reason;
});
}
```
  
- 3、finally方法

finally方法用于无论是resolve还是reject，finally的参数函数都会被执行。

```
finally(fn) {
    return this.then(value => {
        fn();
        return value;
    }, reason => {
        fn();
        throw reason;
    });
};
```

- 4、Promise.all方法

Promise.all方法接收一个promise数组，返回一个新promise2，并发执行数组中的全部promise，所有promise状态都为resolved时，promise2状态为resolved并返回全部promise结果，结果顺序和promise数组顺序一致。如果有一个promise为rejected状态，则整个promise2进入rejected状态。
```
static all(promiseList) {
    return new Promise((resolve, reject) => {
        const result = [];
        let i = 0;
        for (const p of promiseList) {
        p.then(value => {
            result[i] = value;
            if (result.length === promiseList.length) {
            resolve(result);
            }
        }, reject);
        i++;
        }
    });
}
```

- 5、Promise.race方法

Promise.race方法接收一个promise数组, 返回一个新promise2，顺序执行数组中的promise，有一个promise状态确定，promise2状态即确定，并且同这个promise的状态一致。

```
static race(promiseList) {
    return new Promise((resolve, reject) => {
        for (const p of promiseList) {
        p.then((value) => {
            resolve(value);   
        }, reject);
        }
    });
}
```
6、Promise.resolve方法/Promise.reject

Promise.resolve用来生成一个rejected完成态的promise，Promise.reject用来生成一个rejected失败态的promise。
```
static resolve(value) {
    let promise;

    promise = new Promise((resolve, reject) => {
        this.resolvePromise(promise, value, resolve, reject);
    });

    return promise;
}

static reject(reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```

常用的方法基本就这些，Promise还有很多扩展方法，这里就不一一展示，基本上都是对then方法的进一步封装，只要你的then方法没有问题，其他方法就都可以依赖then方法实现。

### Promise面试相关
#### 1、简单介绍下Promise。

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。（当然了也可以简单介绍promise状态，有什么方法，callback存在什么问题等等，这个问题是比较开放的）
提问概率：99%
- 评分标准：人性化判断即可，此问题一般作为引入问题。
- 加分项：熟练说出Promise具体解决了那些问题，存在什么缺点，应用方向等等。

#### 2、实现一个简单的，支持异步链式调用的Promise类。

这个答案不是固定的，可以参考最简实现 Promise，支持异步链式调用
- 提问概率：50%（手撸代码题，因为这类题目比较耗费时间，一场面试并不会出现很多，所以出现频率不是很高，但却是必备知识）
- 加分项：基本功能实现的基础上有onResolved/onRejected函数异步调用，错误捕获合理等亮点。

#### 3、Promise.then在Event Loop中的执行顺序。(可以直接问，也可以出具体题目让面试者回答打印顺序)

JS中分为两种任务类型：macrotask和microtask，其中macrotask包含：主代码块，setTimeout，setInterval，setImmediate等（setImmediate规定：在下一次Event Loop（宏任务）时触发）；microtask包含：Promise，process.nextTick等（在node环境下，process.nextTick的优先级高于Promise）Event Loop中执行一个macrotask任务（栈中没有就从事件队列中获取）执行过程中如果遇到microtask任务，就将它添加到微任务的任务队列中，macrotask任务执行完毕后，立即执行当前微任务队列中的所有microtask任务（依次执行），然后开始下一个macrotask任务（从事件队列中获取） 浏览器运行机制可参考这篇文章
提问概率：75%（可以理解为4次面试中3次会问到，顺便可以考察面试者对JS运行机制的理解）
加分项：扩展讲述浏览器运行机制。

#### 4、阐述Promise的一些静态方法。

Promise.deferred、Promise.all、Promise.race、Promise.resolve、Promise.reject等
- 提问概率：25%（相对基础的问题，一般在其他问题回答不是很理想的情况下提问，或者为了引出下一个题目而提问）
- 加分项：越多越好

#### 5、Promise存在哪些缺点。

1、无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2、如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3、吞掉错误或异常，错误只能顺序处理，即便在Promise链最后添加catch方法，依然可能存在无法捕捉的错误（catch内部可能会出现错误） 
4、阅读代码不是一眼可以看懂，你只会看到一堆then，必须自己在then的回调函数里面理清逻辑。
- 提问概率：25%（此问题作为提高题目，出现概率不高）
- 加分项：越多越合理越好（网上有很多说法，不一一佐证） （此题目，欢迎大家补充答案）

#### 6、使用Promise进行顺序（sequence）处理。

1、使用async函数配合await或者使用generator函数配合yield。2、使用promise.then通过for循环或者Array.prototype.reduce实现。
```
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(() => task).then(pushValue);
    }, Promise.resolve());
}
```
- 提问概率：90%（我司提问概率极高的题目，即能考察面试者对promise的理解程度，又能考察编程逻辑，最后还有bind和reduce等方法的运用）
- 评分标准：说出任意解决方法即可，其中只能说出async函数和generator函数的可以得到20%的分数，可以用promise.then配合for循环解决的可以得到60%的分数，配合Array.prototype.reduce实现的可以得到最后的20%分数。

#### 7、如何停止一个Promise链？

在要停止的promise链位置添加一个方法，返回一个永远不执行resolve或者reject的Promise，那么这个promise永远处于pending状态，所以永远也不会向下执行then或catch了。这样我们就停止了一个promise链。
```
Promise.cancel = Promise.stop = function() {
    return new Promise(function(){})
}
```
- 提问概率：50%（此问题主要考察面试者罗辑思维） （此题目，欢迎大家补充答案）

#### 8、Promise链上返回的最后一个Promise出错了怎么办？

catch在promise链式调用的末尾调用，用于捕获链条中的错误信息，但是catch方法内部也可能出现错误，所以有些promise实现中增加了一个方法done，done相当于提供了一个不会出错的catch方法，并且不再返回一个promise，一般用来结束一个promise链。
```
done() {
    this.catch(reason => {
        console.log('done', reason);
        throw reason;
    });
}
```
- 提问概率：90%（同样作为出题率极高的一个题目，充分考察面试者对promise的理解程度）
- 加分项：给出具体的done()方法代码实现

#### 9、Promise存在哪些使用技巧或者最佳实践？

1、链式promise要返回一个promise，而不只是构造一个promise。
2、合理的使用Promise.all和Promise.race等方法。
3、在写promise链式调用的时候，then方法不传onRejected函数，只需要在最末尾加一个catch()就可以了，这样在该链条中的promise发生的错误都会被最后的catch捕获到。如果catch()代码有出现错误的可能，需要在链式调用的末尾增加done()函数。
- 提问概率：10%（出题概率极低的一个题目）
-加分项：越多越好
