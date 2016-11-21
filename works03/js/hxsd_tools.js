// JavaScript Document

function addEvent(obj,ev,fn){
	/*if(obj.attachEvent){
		obj.attachEvent('on'+ev,fn);
	}else{
	 obj.addEventListener(ev,fn,false);
	}*/
	obj.attachEvent? obj.attachEvent('on'+ev,fn):obj.addEventListener(ev,fn,false);
	
};

var hxsd_tools={
	//居中显示弹框
	"popShow":function(elm){
		elm.style.display="block";
		var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
		var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
		elm.style.left=l+'px';
		elm.style.top=t+'px';
	},
	
	
	//拖拽
	"drag":function(box,title){
		//当我传入1个参数box，拖拽box
		//当我传入2个参数，拖拽就在title
		var handle;
		title?handle=title:handle=box;
	//----------------------------------------
	//点击事件 title
		handle.onmousedown=function(ev){//按下时机  记录下鼠标的错位位置
			var oEv=ev || window.event;
			var disX=oEv.clientX-box.offsetLeft;//left方向
			var disY=oEv.clientY-box.offsetTop;// top 方向
		
			//鼠标移动的对象应该是document
			document.onmousemove=function(ev){//移动拖拽
				var oEv=ev || window.event;
				var l=oEv.clientX-disX;
				var t=oEv.clientY-disY;
				
				//判断屏幕范围
				if(l<0)l=0;
				if(t<0)t=0;
				if(l>document.documentElement.clientWidth-box.offsetWidth)l=document.documentElement.clientWidth-box.offsetWidth;
				if(t>document.documentElement.clientHeight-box.offsetHeight)t=document.documentElement.clientHeight-box.offsetHeight;
				
				//最后赋值
				box.style.left=l+'px';
				box.style.top=t+'px';
			};
			
			//释放鼠标move事件
			document.onmouseup=function(){
				document.onmousemove=null;
			}
			return false;
		};
	},
	
	
getStyle:function(obj,styleName){
	var value;
	value = obj.currentStyle ?  currentStyle[styleName]  :  getComputedStyle(obj,false)[styleName];
	if(styleName=="opacity"){
		value=Math.round( parseFloat(value)*100);
	}else{
		value=parseInt(value);
	}
	return value;
},

move:function (obj,moveJson,time,fn){
		
	//预定义动画速度
	var p_speed={ //predefine预定
		veryslow:5000,
		slow:2000,
		normal:1000,
		fast:700,
		veryfast:300
	};
	
	//判断输入速度
	if(time){
		if(typeof time=='string'){
			time=p_speed[time];
		}
	}else{
		time=p_speed.normal;
	};
	
	//-----------------------------------------	
	var start={};// 起点
	var dis={};//终点
	
	for(var key in moveJson){
		start[key]=this.getStyle(obj,key);
		dis[key]=moveJson[key]-start[key];
	};
	console.log(start,dis)
	
	
	//--------------------------------------------
	var count=parseInt(time/30);//时间分段
	
	var n=0//步进
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var a=1-n/count;
		
		//循环多个动画
		for(var key in moveJson){
			var step_dis=start[key]+dis[key]*(1-a*a*a*a);
			
			//判断动画类型
			if(key=="opacity"){//透明   调用时候透明值要输入0-100之间
				obj.style.filter='alpha(opacity:'+step_dis+')';
				obj.style.opacity=step_dis/100;
			}else{
				obj.style[key]=step_dis+'px';
			};
		};
		if(n==count){
			clearInterval(obj.timer);
			fn && fn();
		};
		
	},30)
}

};


