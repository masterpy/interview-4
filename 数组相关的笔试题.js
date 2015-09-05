1、数组排序
function mySort() {
    var tags = new Array();//使用数组作为参数存储容器
    var len = arguments.length;
    var temp = "",i,j,k;
    /*for(k=0;k<len;k++){
    	tags.push(arguments[k]);
    }*/
    tags = Array.prototype.slice.call(arguments);	//注意这句，相当于拷贝了一个数组
    for(i=0;i<len-1;i++){
    	for(j=i+1;j<len;j++){
    		if(tags[j]<tags[i]){
    			temp = tags[i];
    			tags[i] = tags[j];
    			tags[j] = temp;
    		}
    	}
    }
    return tags;//返回已经排序的数组
}
var result = mySort(50,11,16,32,24,99,57,100);//传入参数个数不确定
console.info(result);//显示结果

扩展：
	如果数组中又包含了数组，则用slice或者concat都不能实现深拷贝，因为第一维存放的是第二维的引用。
	深拷贝：
		var deepCopy= function(source) { 
			var result={};
			for (var key in source) {
			      result[key] = typeof source[key]===’object’? deepCoyp(source[key]): source[key];
			} 
			return result; 
		}

2、
输出对象中值大于2的key的数组：
var data = {a:1,b:2,c:3,d:4};
Object.keys(data).filter(function(index) {
	return data[index]>2;
});