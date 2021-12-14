# 二叉树遍历

# 单链表反转
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 
 var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};


圣杯布局
<style>
.c0{
    diplay:flex;
}
.c1,c3{
    width:100px;
}
.c0 div{
    flex:1
}
</style>
<div class="c0">
    <div class="c1"></div>
    <div></div>
    <div class="c3"></div>
</div>