ssr和nodejs
csr和ssr的区别
实现0.5px？transform(scale(0.5))
移动端适配？rem，媒体查询，百分比
es6的复制
深拷贝怎么实现？递归，json.stringfy
react里key的作用？
react里如果key相同了会怎么样？
react里在兄弟节点1和2知己恩插入一个3，是怎么插入的？删掉1和2然后插入132还是直接插入3
浏览器缓存，强缓存和协商缓存(字段名)
webpack怎么做跨域，proxy
跨域是否携带cookie？需要前端配置
webpack上线前的注意事项，比如cdn地址等

//获取某一个节点下的所有节点，并找出一个类型最多的节点类型和数量
function getMaxTypeEle(dom){
    let all=dom.getElementsByTagName('*');
    const temp=all.reduce((sum,current)=>{
        if(sum[current.nodeType]){
            sum[current.nodeType]++;
        }
        return sum;
    },{})
    //{a:4,h1:2,div:10}
    let result={
        count:0,
        tagName:''
    };
    for(let key in temp){
        if(result[key]<temp[key]){
            result[tagName]=key;
            result.count=temp[key];
        }
    }
    return result;
}