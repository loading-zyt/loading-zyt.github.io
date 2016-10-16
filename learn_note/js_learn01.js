//---------类及对象(类的实例)---------
//定义一个Person类
function Person(){}
//或
var Person2 = function(){};

//创建Person类的实例
var per1 = new Person();
var per2 = new Person();

//---------构造器---------
//构造器是对象中的一个方法，js中，函数可作为构造器使用，因此不需要特地定义构造器方法。
// 以下，Person3 类实例化时构造器调用一个alert函数。
function Person3(){
	alert('Person3 instantiated');
}
var per3 = new Person3();

//---------属性---------
function Person4(firstName){
	this.firstName = firstName;
	alert('Person4 instantiated');
}
var per4 = new Person4('Bob');
alert('per4 is ' + per4.firstName);	//alerts "per4 is Bob"

//---------方法---------
//方法(就是函数)和属性(可以是函数)相似。定义一个方法，需要将一个函数赋值给类的prototype属性。
//给Person5类定义方法sayHello(),并调用。
function Person5(fristName){
	this.firstName = firstName;
}
Person5.prototype.sayHello = function(){
	alert("hello,I'm " + this.firstName);
};
var per5 = new Person5('Alice');
var helloFun = per5.sayHello;
/*
	this 取决于怎样调用函数。
	per5.sayHello(); 此时this被设置为我们取得函数的对象(per5)。
	当从helloFun();调用时，this被设置为全局对象(浏览器中即window)
		由于该对象没有firstName属性，所以得到如下结果。
		注:严格模式中会产生error
*/
per5.sayHello();		//alerts "hello,I'm Alice"
helloFun();				//alerts "hello,I'm undefined"
//helloFun === per5.sayHello				true
//helloFun === Person5.prototype.sayHello	true
/*
	显式设置this的值为per5
*/
helloFun.call(per5);	//alerts "hello,I'm Alice"

//---------继承---------
/*
	js只支持单继承，通过赋予子类一个父类的实例并专门化子类实现。
	现代浏览器中可以用Object.create实现继承。	
*/
//定义Person6构造器
function Person6(firstName){
	this.firstName = firstName;
}

//在Person.prototype中加入方法
Person6.prototype.walk = function(){
	alert("I am walking");
};
Person6.prototype.sayHello = function(){
	alert("hello, I'm " + this.firstName);
};

//定义Student构造器
function Student(firstName,subject){
	//调用父类构造器，确保(使用Function#call)"this"在调用过程中正确
	Person6.call(this,firstName);
	//初始化Student类特有属性
	this.subject = subject;
}

/*
	建立一个由Person.prototype继承来的Student.prototype对.
	注:常见错误是使用"new Person6()"来建立Student.prototype.
	这样错误多，最重要的是我们在实例化时不能赋予Person6类任何的firstName参数
	调用Person6正确位置如下，从Student中调用它
*/
Student.prototype = Object.create(Person6.prototype);
//设置"constructor"属性指向Student
Student.prototype.constructor = Student;
//更换"sayHello"方法
Student.prototype.sayHello = function(){
	alert("hello, I'm " + this.firstName + ". I'm studying " + this.subject + ".");
};
//加入"sayGoodBye"方法
Student.prototype.sayGoodBye = function(){
	alert("GoodBye!");
}
//测试
var student1 = new Student("Nick","Math");
student1.sayHello();	// "hello, I'm Nick. I'm studying Math."
student1.walk();		// "I am walking"
student1.sayGoodBye();	// "GoodBye!"

//check that instanceof works correctly
alert(student1 instanceof Person);	//true
alert(Student1 instanceof Student);	//true

//---------封装---------
/*
	上面Student类不知Person类的walk()方法如何实现却可使用，
	除非想改变walk()方法否则不需明确定义，这就叫封装。
*/

//---------抽象---------
/*
	抽象是允许模拟工作问题中通用部分的机制。
	可通过继承(具体化)或组合来实现。
	js通过继承实现具体化，通过让类的实例作为其他对象属性值实现组合。
	js Function类继承自Object类(具体化)。
	Function.prototype的属性是一个Object的实例(组合)。
*/
var foo = function(){};
alert('foo is a Function: ' + (foo instanceof Function));	//alerts "foo is a Function: true"
alert('foo.prototype is an Object: ' + (foo.prototype instanceof Object));	//alerts "foo.prototype is an Object: true"
//---------多态---------
/*
	就像所有定义在原型属性内部的方法和属性一样，
	不同类可以定义具有相同名称的方法；
	方法是作用于所在类中。
	且仅在两个类不是父子关系时成立。
*/

//---------自定义对象---------
function makePerson(first, last){
	return{
		first: first,
		last: last
	}
}
function personFullName(person){
	return person.first + ' ' + person.last;
}


s = makePerson("Simon", "Willison");
personFullName(s);	//Simon Willison

function makePersonNew(first, last){
	return{
		first: first,
		last: last,
		fullName: function(){
			// this指当前对象
			return this.first + ' ' + this.last;
		}
	}
}
s = makePersonNew("aa", "bb");
s.fullName();	//aa bb
/*
	上面代码中，this指代当前对象，也就是调用了函数的对象。
	如果在一个对象上使用点或方括号访问属性或方法，这个对象就成了this。
	如果没有，那么this指向全局对象。eg:
	当调用fullName()时，this指向全局对象，first或last不存在，
	所以返回值均为undefined.
*/
s1 = makePersonNew("cc", "dd");
var fullName = s1.fullName;
fullName();	//undefined undefined

//修正1
function PersonNew(frist, last){
	this.first = first;
	this.last = last;
	this.fullName = function(){
		return this.first + ' ' + this.last;
	};
}
var s2 = new PersonNew("ee", "ff");
//修正1
/*
	关键字：new，它和 this 密切相关。
	它的作用是创建一个崭新的空对象，
	然后使用指向那个对象的 this 调用特定的函数。
	注意，含有 this 的特定函数不会返回任何值，
	只会修改 this 对象本身。
	new 关键字将生成的 this 对象返回给调用方，
	而被 new 调用的函数成为构造函数。
	习惯的做法是将这些函数的首字母大写，
	这样用 new 调用他们的时候就容易识别了。
*/
function personFullName(){
	return this.first + ' ' + this.last;
}
//修正2
//只需要创建一次方法函数，在构造函数中引用。
function PersonNew2(first, last){
	this.first = first;
	this.last = last;
	this.fullName = personFullName;
}
//修正3
/*
	PersonNew3.prototype 是可被PersonNew3的所有实例共享的对象。
	它是原型链(prototype Chain)的查询链的一部分:
	当视图访问一个PersonNew3没有定义的属性时，
	解释器会先检查这个PersonNew3.prototype来判断是否存在该属性。
	所以，任何分配给PersonNew3.prototype的东西对通过this对象构造的实例均可用。
*/
function PersonNew3(first, last){
	this.first = first;
	this.last = last;
}
PersonNew3.prototype.fullName = function(){
	return this.first + ' ' + this.last;
}
/*
	js允许在程序中任何时候修改原型(prototype)中的东西，
	也就是说可以在运行时(runtime)给已存在的对象添加方法。
*/
s3 = new PersonNew3("gg", "hh");
s3.firstNameCaps();	//error
PersonNew3.prototype.firstNameCaps = function(){
	return this.first.toUpperCase();
};
s3.firstNameCaps();	// GG

//还可以给js内置函数原型(prototype)添加东西
//下面给String添加一个方法用来范围逆序的字符串:
var s4 = "Simon";
s4.reversed();	//error
String.prototype.reversed = function(){
	var r = "";
	for (var i = 0; i < this.length; i++) {
		r += this[i];
	};
	return r;
}
s4.reversed();	//nomiS
//也可以在字符串字面量上用(string literal)
"This is a book".reversed();	//koob a si sihT
/*
	原型组成链根节点为Object.prototype
*/
//一个new方法的简单实现
function trivialNew(constructor, ...args){	//...args叫做剩余参数(rest arguments)
	var o = {};	//创建一个对象
	constructor.apply(0,args)
	return o;
}
//调用
var bill = trivialNew(PersonNew, "ii", "jj");
//和下面语句等效
var bill2 = new PersonNew("ii", "jj");

/*
	apply()有个姐妹函数，call.
	它可以允许设置this
	但是它带有一个扩展的参数列表而不是一个数组
*/
function lastNameCaps(){
	return last.toUpperCase();
}
var s5 = new PersonNew("kk", "ll");
lastNameCaps.call(s5);
//和以下等价
s5.lastNameCaps = lastnamecaps;
s5.lastnamecaps();


//---------内部函数---------
//js允许在函数内部定义函数。子函数可访问父函数作用域中的变量。
//该方法可减少全局作用域下的函数数量，利于维护。
function betterExampleNeeded(){
	var a = 1;
	function oneMoreThanA(){
		return a + 1;
	}
	return oneMoreThanA();
}


//---------闭包---------(有待进一步学习)
function makeAdder(a){
	return function(b){
		return a + b;
	}
}
var x = makeAdder(5);
var y = makeAdder(20);
x(6);	//11
y(7);	//27
/*
	每当 JavaScript 执行一个函数时，都会创建一个作用域对象（scope object），
	用来保存在这个函数中创建的局部变量。它和被传入函数的变量一起被初始化。
	这与那些保存的所有全局变量和函数的全局对象（global object）类似，
	但仍有一些很重要的区别，
	第一，每次函数被执行的时候，就会创建一个新的，特定的作用域对象；
	第二，与全局对象（在浏览器里面是当做 window 对象来访问的）不同的是，
	你不能从 JavaScript 代码中直接访问作用域对象，也没有可以遍历当前的作用域对象里面属性的方法。
	所以当调用 makeAdder 时，解释器创建了一个作用域对象，
	它带有一个属性：a，这个属性被当作参数传入 makeAdder 函数。
	然后 makeAdder 返回一个新创建的函数。
	通常 JavaScript 的垃圾回收器会在这时回收 makeAdder 创建的作用域对象，
	但是返回的函数却保留一个指向那个作用域对象的引用。
	结果是这个作用域对象不会被垃圾回收器回收，直到指向 makeAdder 返回的那个函数对象的引用计数为零。
	作用域对象组成了一个名为作用域链（scope chain）的链。
	它类似于原形（prototype）链一样，被 JavaScript 的对象系统使用。
	一个闭包就是一个函数和被创建的函数中的作用域对象的组合。
	闭包允许你保存状态——所以它们通常可以代替对象来使用。
*/

//---------内存泄露---------
