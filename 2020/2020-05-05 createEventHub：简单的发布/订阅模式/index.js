/**
 * 创建一个发布/订阅（发布-订阅）事件集线，有emit，on和off方法。
 * 使用Object.create(null)创建一个空的hub对象。
 * emit，根据event参数解析处理程序数组，然后.forEach()通过传入数据作为参数来运行每个处理程序。
 * on，为事件创建一个数组（若不存在则为空数组），然后.push()将处理程序添加到该数组。
 * off，用.findIndex()在事件数组中查找处理程序的索引，并使用.splice()删除。
 */

const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler);
        if (i > -1) this.hub[event].splice(i, 1);
        if (this.hub[event].length === 0) delete this.hub[event];
    }
});


// 用法：
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// 订阅，监听不同事件
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// 发布：发出事件以调用所有订阅给它们的处理程序，并将数据作为参数传递给它们
hub.emit('message', 'hello world'); // 打印 'hello world' 和 'Message event fired'
hub.emit('message', { hello: 'world' }); // 打印 对象 和 'Message event fired'
hub.emit('increment'); // increment = 1

// 停止订阅
hub.off('message', handler);
