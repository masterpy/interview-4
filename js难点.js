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