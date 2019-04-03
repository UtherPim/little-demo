//检测类型
function type(target){
	var temp={
		"[object Array]":"array",
		"[object Object]":"object",
		"[object Number]":"number-object",
		"[object Boolean]":"booleab-object",
		"[object String]":"string-object",
	}
	if(target===null)
		return "null";
	if(typeof(target)=="object"){
		var str=Object.prototype.toString.call(target);
		return temp[str];
	}else{
		return typeof(target);
	}
}
//indexOf
if(typeof(Array.prototype.indexOf)!="function"){
	Array.prototype.indexOf=function (kw,fromi){
		//document.write("自定义indexOf");
		if(this==null)
			throw new Error("error data!");
		var index=fromi||0;
		index=parseInt(index);
		if(index>this.length)
			return -1;
		for(var i=index;i<this.length;i++){
			if(this[i]==kw){
				break;
			}
		}
		if(i<this.length)
			return i;
		return -1;
	}
}
//数组去重
var noRepeat=(function(){
	return function(arr){
		if(type(arr)!="array")
			throw new Error("error data!Need a reference of Array");
		var arr1=[];
		for(var i=0;i<arr.length;i++){
			if(arr1.indexOf(arr[i])<0){
				arr1.push(arr[i]);
			}
		}
		return arr1;
	}
}());
//原型继承--圣杯模式
var inherit=(function(){
	var F=function(){};
	return function(Target,Origin){
		F.prototype=Origin.prototype;
		Target.prototype=new F();
		Target.prototype.constructor=Target;
		Target.prototype.uber=Origin.prototype;//超类
	}
}());
//JSON复制对象--深克隆
function clone_J(obj){
	var json=JSON.stringify(obj);
	return JSON.parse(json);
}
//JS原生实现深克隆
function cloneJS(origin,target){
	var target=target||{};
	toStr=Object.prototype.toString;
	arrStr="[object Array]";
	for(var key in origin){
		if(origin.hasOwnProperty(key)){
			if(typeof(origin[key])=="object"){
				if(toStr.call(origin[key])==arrStr){
					target[key]=[];
				}else{
					target[key]={};
				}
				cloneJS(origin[key],target[key]);
			}else if(typeof(origin[key])!="function"){
				target[key]=origin[key];
			}
		}
	}
	return target;
}
//返回元素e的第n个平级元素节点
function retSibling(e,n){
	while(e&&n){
		if(n>0){
			if(e.nextElementSibling){
				e=e.nextElementSibling;
			}else{
				for(e=e.nextSibling;e&&e.nodeType!=1;e=e.nextSibling);
			}
			n--;
		}else{
			if(e.previousElementSibling){
				e=e.previousElementSibling;
			}else{
				for(e=e.previousSibling;e&&e.nodeType!=1;e=e.previousSibling);
			}
			n++;
		}
	}
	return e;
}
//检测类型
function dataType(param) {
	return Object.prototype.toString.call(param).slice(8,-1)
}
