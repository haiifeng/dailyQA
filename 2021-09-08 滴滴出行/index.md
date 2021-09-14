react里setState为什么是异步



function _new(Con, ...args){
    var result={};
    result.__proto__=Con.prototype;
    var temp=Con.call(result,...args);
    return temp instanceof Object?temp:result;
}

// 实现一个itearator


function promiseQueen(promiseArr){
    let p=promiseArr.pop();
    while(p){
        p.then(()=>p=promiseArr.pop()).catch(()=>promiseArr.unshift(p))
    }
}