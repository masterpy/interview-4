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