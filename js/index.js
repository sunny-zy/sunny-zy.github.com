$(function(){
	var oContainer = document.getElementById('container');
	var aPage = oContainer.children;
	var oP1Left = document.getElementById('p1Left');
	
	var iNow = 0;// 当前屏
	var bScroll = true;//初始化状态，可以滚动

	var windowH = document.documentElement.clientHeight;// 窗口高
	for(var i = 0;i < aPage.length; i++){
		aPage[i].style.height = windowH + 'px';
	}

	window.onload = window.onresize = function(){
		windowH = document.documentElement.clientHeight;
		for(var i = 0;i < aPage.length; i++){
			aPage[i].style.height = windowH + 'px';
		}
	}
	oContainer.style.height = windowH * aPage.length + 'px';// oContainer内容高
	var oPageH = oContainer.children[0].offsetHeight;// 一屏高
	addMouseEvent(oContainer,function(bDown){
		if(!bScroll) return;
		bScroll = false;
		if(bDown){
			iNow ++;
			if(iNow == aPage.length){
				iNow =0;
			}
		}else{
			iNow--;
			if(iNow <= 0){
				iNow = 0;
			}	
		}
		move(oContainer,{marginTop:-iNow*oPageH},{
			complete:function(){
				bScroll = true;
			}
		});
	});

	// About Me
	(function(){
		var oPrint = '我的性格偏于活泼，为人坦率、热情、讲求原则；处事乐观、细致；富有责任心、乐于助人。.生活中我喜欢旅游，喜欢跋山涉水，喜欢四处折腾。。。.我有一点小小的职业病，走在街上喜欢盯着LED广告看；上网喜欢看一些比较酷的效果。.当然，我也有点强迫症，喜欢扣像素，扣细节。。。.我认为写代码，是一门艺术。爱前端，爱生活!';
		// alert(oPrint.length);
		for(var i = 0; i <oPrint.length ; i++){
			var oSpan = document.createElement('span');
			oSpan.className = "cur";
			oP1Left.appendChild(oSpan);
		}
		var i = 0;
		var timer = null;
		var count = oP1Left.children.length;
		clearInterval(timer);
		timer = setInterval(function(){
			oP1Left.children[i].innerHTML = oPrint.charAt(i);
			if(oP1Left.children[i].innerHTML == '.'){
				oP1Left.children[i].innerHTML = "<br />"
			}
			i++;
			if(i == count){
				clearInterval(timer);
			}
		},50)

	})()
})