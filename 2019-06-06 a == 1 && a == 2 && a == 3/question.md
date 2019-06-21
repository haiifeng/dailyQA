# 2019-06-06
- 如何让 (a == 1 && a == 2 && a == 3) 的值为true？
## 提示 从以下几个角度思考
- 利用隐式转换规则:Symbol valueOf exec
- 利用数据劫持:Object.defineProperty Proxy 
- 数组的 toString
- 利用 with 关键字