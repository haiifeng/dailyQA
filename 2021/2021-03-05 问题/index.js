// Question 1;
(() => {
    let x, y
    try {
        throw new Error()
    } catch (x) {
        // (x = 1), (y = 2)
        x = 1;
        y = 2;
        console.log(x)
    }
    console.log(x)
    console.log(y)
})()
//1 undefined 2


// Question 2;
const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers);
//[1,2,3,undefined *7, 11]
//[1,2,3,null *7, 11]

// (11) [1, 2, 3, empty × 7, 11]


// Question 3;
console.log(typeof typeof 1)
//string


// Question 4;
function sayHi() {
    return (() => 0)()
}
console.log(sayHi())
console.log(typeof sayHi())


// Question 5;
const person = {
    name: 'Lydia'
}

function sayHi(age) {
    console.log(`${this.name} is ${age}`)
}
sayHi.call(person, 21)
sayHi.bind(person, 21)


// Question 6;
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()


const A = {}
const B = {
    key: 'b'
}
const C = {
    key: 'c'
}
A[B] = 123 //A={B:123}
A[C] = 456 //A={C:456}
console.log(a[b])


String.prototype.giveLydiaPizza = () => {
    return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()




for (let i = 1; i < 5; i++) {
    if (i === 3) continue
    console.log(i) //1 2 4
}


const obj = {
    a: 'one',
    b: 'two',
    a: 'three'
}
console.log(obj)



const obj = {
    1: 'a',
    2: 'b',
    3: 'c'
}
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)



function getAge() {
    'use strict'
    age = 21
    console.log(age)
}

getAge()



function checkAge(data) {
    if (data === {
            age: 18
        }) {
        console.log('You are an adult!')
    } else if (data == {
            age: 18
        }) {
        console.log('You are still an adult.')
    } else {
        console.log(`Hmm.. You don't have an age I guess`)
    }
}

checkAge({
    age: 18
})


function getPersonInfo(one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo `${person} is ${age} years old`



function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)



function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
}
Person.prototype.getLastName = function () {
    return `${this.lastName}`;
}

console.log(member.getLastName());
console.log(member.getFullName());



function bark() {
    console.log('Woof!')
}

bark.animal = 'dog'



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
class Chameleon {
    constructor({
        newColor = 'green'
    } = {}) {
        this.newColor = newColor
    }

    static colorChange(newColor) {
        this.newColor = newColor
        return this.newColor
    }

    hasColor(newColor) {
        return this.colorChange(newColor)
    }

}

const freddie = new Chameleon({
    newColor: 'purple'
}) //{newColor:'purple',colorChange:f}
freddie.hasColor('orange')