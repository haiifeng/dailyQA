// 美团一面

// 1.强类型语言跟弱类型语言的区别。应用场景？
// 2.typescript？
// 3.JS内存模型？

// 基本数据类型/引用型数据类型存储方式

// let a = {data: 1};
// let b = a;
// b.data = 2;
// a.data?

// 实现一个模态框组件，组件挂在到body上
// Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
// return ReactDOM.createPortal(
//     this.props.children,
//     domNode
// );

/**
 * 给定一个数组，找出其中最小的K个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
 *
 * @param input int整型一维数组
 * @param k int整型
 * @return int整型一维数组
 */
function GetLeastNumbers_Solution1(input, k) {
  // write code here
  return input.reduce((sum, cur) => {
    if (sum.length < k) {
      sum.push(cur);
      sum.sort((a, b) => a - b);
    } else {
      console.log("sun:", sum);
      if (sum[sum.length - 1] > cur) sum[sum.length - 1] = cur;
    }
    return sum;
  }, []);
}

function GetLeastNumbers_Solution2(input, k) {
  // write code here
  return input.sort((a, b) => a - b).splice(0, k);
}
