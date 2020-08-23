/*
  js类型
  	Number
  	String
	Boolean
	Symbol (ECMAScript 6 新定义)
	Object
		Function
		Array
		Date
		RegExp
	Null
	Undefined
*/

//---------对象---------
/*
	js中的对象可以简单理解成"名称-值"对。
	名称---js字符串
	值-----任何js数据类型，包括对象
*/
//创建一个空对象
var obj = new Object();
var obj1 = {};
//上面第二种方法叫做"对象字面量(object literal)"法。JSON格式核心语法。
//"对象字面量"在对象实例中定义一个对象:
var obj2 = {
	name:"Henny",
	"for":"Max",
	details:{
		color:"orange",
		size:12
	}
}
//对象属性通过链式(chain)表示方法进行访问:
obj2.details.color;			//orange
obj2["details"]["size"];	//12

//创建对象原型 Person
function Person(name,age){
	this.name = name;
	this.age = age;
}
//定义一个对象
var you = new Person("You", 24);
//对象属性赋值访问1
obj2.name = "Bob";
var name = obj2.name;
//对象属性赋值访问2
obj2["name"] = "Bob";
var name = obj["name"];

obj2.for = "Bob";		//语法错误，for为预留关键字
obj2["for"] = "Bob";	//正常
//---------数组---------
//创建数组
var a = new Array();
a[0] = "dog";
a[1] = "pig";
a[2] = "cat";
a.length;	//3
//使用数组字面量(array literal)
var a1 = ["dog", "pig", "cat"];
a1.length;	//3
//数组的长度比数组最大索引值多一
var a2 = ["dog", "pig", "cat"];
a2[100] = "fox";
a2.length;	//101
//遍历数组
for(var i = 0; i < a.length; i++){
	//Do something with a[i]
}
//ECMAScript 5 增加了遍历数组的另一个方法 forEach():
["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
  // Do something with currentValue or array[index]
});
//追加元素
a.push(item);
//---------函数---------
function addNum(x, y){
	return x + y;
}
add();	//NaN
add(2, 3, 4);	//5
//使方法可接收任意个数参数计算
function sumNum(){
	var sum = 0;
	//arguments是个类似数组对象一样包含所有被传入的参数。
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	};
	return sum;
}
sumNum(2, 3, 4, 5);	//14

//求平均值
function avgNum(){
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	};
	return sum / arguments.length;
}
avgNum(2, 3, 4, 5);	//3.5

//求数组平均值
function avgArray(arr){
	var sum = 0;
	for (var i = 0, j = arr.length; i < j; i++) {
		sum += arr[i];
	};
	return sum / arr.length;
}
//求数组平均值(调用apply方法,该方法允许使用任意函数对象)
avgNum.apply(null,[2, 3, 4, 5]);

//js创建匿名函数
var avgDemo = function(){
	var sum = 0;
	for (var i = 0, j = arguments.length; i < j;i++) {
		sum += arguments[i];
	};
	return sum / arguments.length;
}
//利用匿名函数隐藏了局部变量
var a = 1;
var b = 2;
(function(){
	var b = 3;
	a += b;
})();
a;	//4
b;	//2

//递归
function countChars(elm){
	if(elm.nodeType == 3){	//文本节点
		return elm.nodeValue.length;
	}
	var count = 0;
	for (var i = 0, child; child = elm.childNodes[i]; i++) {
		count += countChars(child);
	};
	return count;
}
