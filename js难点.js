1、
if(! "a" in window){
	var a = 1;
}
alert(a);	//undefined
解释：
	使用var声明的变量会被自动添加到最接近的环境的顶部。
	变量提升仅提升变量声明，而不是变量赋值。
	所以当执行判断! "a" in window 时，因为a已经被声明，所以返回false，所以
	没有执行 var a = 1;所以弹出undefined。
	上面的代码变量提升后相当于：
		var a;
		if(! "a" in window){
			a = 1;
		}
		alert(a);

2、
var a,b;			
(function(){
	alert(a);		//undefined
	alert(b);		//undefined
	var a=b=3;
	alert(a);		//3
	alert(b);		//3
})();
alert(a);			//undefined
alert(b);			//3
注意：
	var a=b=3;这句话相当于：var a=3;b=3;
	在这里a是局部变量，而b是全局变量。
	另外，由于变量提升，上面代码相当于：
		var a,b;
		(function(){
			var a;
			alert(a);
			alert(b);
			a=b=3;
			alert(a);
			alert(b);
		})();
		alert(a);
		alert(b);

3、
var myObject = {
	foo: "bar",
	func: function(){
		var self = this;
		console.log(this.foo);		//bar
		console.log(self.foo);		//bar
		(function(){
			console.log(this.foo);	//undefined
			console.log(self.foo);	//bar
		}());
	}
};
myObject.func();
理解关键：方法/函数是由谁（对象）调用的，方法/函数内部的this就指向谁（该对象）。
注意：被谁调用，不是处于谁的作用域，即使在作用域。
	1）func是由myObject调用的，this指向myObject。
	2）self指向myObject，相当于myObject的this的副本。
	3）这个立即执行匿名函数表达式（IIFE）是由window调用的，this指向window。
	4）IIFE的作用域处于myObject.func的作用域中，本作用域找不到self变量，沿着作用域链向上
	查找self变量，找到了指向myObject对象的self。

4、
hasOwnProperty()：判断对象是否有某个特定的属性。必须用字符串指定该属性。
isPrototypeOf()：判断该对象是否为另一个对象的原型。

5、
 填写内容让下面代码支持a.name = “name1”; b.name = “name2”;
	function obj(name){
		（1）
	}
	obj.（2） = "name2";
	var a = obj("name1");
	var b = new obj; 
解：
	（1）：
	 	if (name) { this.name = name; } return this; 
	（2）：
		prototype.name 

6、考察this
var length = 10;
function fn() {
  	console.log(this.length);
}
var obj = {
  	length: 5,
  	method: function(fn) {
    	fn();
    	arguments[0]();
  	}
};
obj.method(fn, 1);
输出：10 2
解释：	
	第一次输出10应该没有问题。我们知道取对象属于除了点操作符还可以用中括号，所以第二次执行时
	相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2。

7、var和函数的提前声明
function fn(a) {
  	console.log(a);
  	var a = 2;
  	function a() {}
  	console.log(a);
}
fn(1);
输出：function a(){}  2
解释：
	我们知道var和function是会提前声明的，而且function是优先于var声明的（如果同时存在的话），
	所以提前声明后输出的a是个function，然后代码往下执行a进行重新赋值了，故第二次输出是2。
注意：如果没有对a进行重新赋值，也就是如果没有 var a = 2;这一句的话，那么，两次都会输出
		function a(){}

8、局部变量和全局变量
var f = true;
if (f === true) {
  	var a = 10;
}
function fn() {
  	var b = 20;
  	c = 30;
}
fn();
console.log(a);
console.log(b);		//注意，这句会报错，因为没有声明
console.log(c);
输出：10 报错 30
解释：
	这是个我犯了很久的错误，很长一段时间我都以为{…}内的新声明的变量是局部变量，后来我才发现
	function内的新声明的变量才是局部变量，而没有用var声明的变量在哪里都是全局变量。再次提醒
	切记只有function(){}内新声明的才能是局部变量，while{…}、if{…}、for(..) 之内的都是全局变
	量（除非本身包含在function内）。

9、变量隐式声明
if('a' in window) {
  	var a = 10;
}
alert(a);
输出：10
解释：
	前面我说过function和var会提前声明，而其实{…}内的变量也会提前声明。于是代码还没执行前，a变
	量已经被声明，于是 ‘a’ in window 返回true，a被赋值。

10、给基本类型数据添加属性，不报错，但取值时是undefined
var a = 10;
a.pro = 10;
console.log(a.pro + a);
var s = 'hello';
s.pro = 'world';
console.log(s.pro + s);
输出：NaN undefinedhello
解释：
	给基本类型数据加属性不报错，但是引用的话返回undefined，10+undefined返回NaN，而undefined和
	string相加时转变成了字符串。

11、函数声明优于变量声明
console.log(typeof fn);
function fn() {};
var fn;
输出：function
解释：
	因为函数声明优于变量声明。我们知道在代码逐行执行前，函数声明和变量声明会提前进行，而函数
	声明又会优于变量声明，这里的优于可以理解为晚于变量声明后，如果函数名和变量名相同，函数声
	明就能覆盖变量声明。所以以上代码将函数声明和变量声明调换顺序还是一样结果。


