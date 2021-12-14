webpack的优化都有哪些
plugin和loaders有什么区别
移动端适配方案？
rem是怎么实现的？js和纯css方式
class里面的super是什么意思？
怎么解决跨域？jsonp，cros，其他？
react的class方式和hooks方式的优缺点
react里setState原理

this.state={count:0}
componentDidMount(){
    this.setState({count:this.state.count+1})
    this.setState({count:this.state.count+2})
    console.log(this.state.count)
    setTimeout(()=>{
        this.setState({count:this.state.count+2})
        console.log(this.state.count)
    },100)
}

promise.reject(1).then(()=>{})


// const obj={a:{b:{c:{d:1}}}}
// find(obj,'a.b.c.d')返回1
// find(obj,''a.b.d)返回undefined
function getValue(obj, str) {
    if (!str) { return undefined }
    let temp = undefined;
    str.split('.').reduce((sum, current) => {
        if (!sum.current) {
            temp = sum;
        } else {
            return sum.current;
        }
    }, obj)
    return temp;
}