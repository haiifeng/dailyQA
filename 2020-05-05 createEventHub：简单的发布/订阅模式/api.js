let obj = {};
const $on = (name, fn) => {
    if (!obj[name]) {
        obj[name] = [];
    }
    obj[name].push(fn);
}

const $emit = (name, val) => {
    if (obj[name]) {
        obj[name].map((fn) => {
            fn(val);
        });
    }
}

const $off = (name, fn) => {
    if (obj[name]) {
        if (fn) {
            let index = obj[name].indexOf(fn);
            if (index > -1) {
                obj[name].splice(index, 1);
            }
        } else {
            obj[name].length = 0;
            //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
        }
    }
}

export default {
    $on,
    $emit,
    $off
}