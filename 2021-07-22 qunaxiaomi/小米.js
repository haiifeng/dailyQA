1. ts
2. object.is
3. es6
=> Array  ... Promise

const Person = () => {}
console.log(new Person())

4. 继承方式
new 
function myNew() {
// 你的实现
}

function Ctor() {
    this.a = 111
    return {}
}
console.log(new Ctor())

2.  Promise
实现 Promise.race

3. css 布局方式
flex
flex: - - -;

BFC

line-height: 1em;

window.id = 0;
// 声明一个函数fn
const fn = {
  id: 1,
  say: function() {
    console.log('say-1:', this.id); // 1
  },
  say1: function() {
    setTimeout(function() {
      console.log('say1-0:', this.id); // 1
    }, 1000);
  },
  say2: function() {
    let that = this;
    setTimeout(function() {
      console.log('say2-1:', that.id); // 1
    }, 1000);
  },
  say3: function() {
    setTimeout(() => {
      console.log('say3-1:', this.id); // 1
    }, 1000);
  },
  say4: () => {
    setTimeout(() => {
      console.log('say4-0:', this.id); // 0
    }, 1000);
  },
  say5: () => {
    setTimeout(function() {
      console.log('say5:', this.id); // 1
    }, 1000);
  },
};

fn.say();
fn.say1(); 
fn.say2(); 
fn.say3(); 
fn.say4(); 
fn.say5(); 

async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2");
  }
  console.log("script start");
  
  setTimeout(function () {
    console.log("setTimeout");
  });
  async1(); 
  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("promise2");
  });
  console.log("script end");

// 1. 事件循环

// 2. 合成事件

// 4.生命周期

// 3.webpack分包

// 4.nodejs