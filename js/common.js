//domRead事件
function $(fn){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);//false  冒泡  true 捕获
	}else{
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == 'complete'){// interactive 正在渲染  complete 完成
				fn && fn();
			}
		});
	}
}

//getByClass
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var re = new ExpReg('\\b'+sClass+'\\b');
		var result = [];
		for(var i = 0;i<aEle.length;i++){
			if(re.test(aEle[i].className)){
				result.push(aEle[i]);
			}
		}	
	}
}
//添加滚动事件
function addMouseEvent(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		// 兼容ff
		obj.addEventListener("DOMMouseScroll",fnWheel,false);
	}else{
		// 兼容 ie chrome
		obj.onmousewheel = fnWheel;
	}
	function fnWheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		if(oEvent.wheelDelta){// ie chrome；下负 上正
			bDown = oEvent.wheelDelta > 0 ? false : true ;
		}else{// ff  下正 上负
			bDown = oEvent.detail > 0 ? true : false;
		}
		// 判断它有没有传函数；
		typeof fn == "function"	&& fn(bDown);
		// return false;ie7ie8有问题;
		// 但在addEventListener  return false 高级浏览器失效 ie里是好的;
		// 解决:oEvent.preventDefault();高级浏览器;
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
}

// 获取非行间样式
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}
//运动框架
function move(obj,json,options){
	json = json || {};
	options = options || {};
	options.duration = options.duration || 800;
	options.easing = options.easing || 'ease-out';
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}

	var count = Math.round(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			var cur = start[name] + dis[name]/count*n;
			switch(options.easing){
				case 'linear':
					var a = n/count;
					var cur = start[name] + dis[name]*a;
				break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name] + dis[name]*a*a*a;
				break;
				case 'ease-out':
					var a =1 - n/count;
					var cur = start[name] + dis[name]*(1-Math.pow(a,3));
				break;
			}
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			}else{
				obj.style[name] = cur +'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	},30)
}


















