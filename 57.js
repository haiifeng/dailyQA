/*
* 2019-04-18
* 第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。
*/
// 1.display:none; 不占空间，不能点击；  场景：显示出原来不存在的结构
// 2.visibility:hiddne;占据空间，不能点击；  场景：不会导致页面结构发生变动，不会撑开页面
// 3.opacity:0;占据空间，可以点击；  场景：可以跟transition搭配