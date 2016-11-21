// JavaScript Document

window.onload=function(){
	
	/*var main_one_mid=document.getElementById('main_one_mid');
	var switch_Ul=document.getElementById('switch_images');
	var switch_Li=switch_Ul.getElementsByTagName('li');
	var n=0;	//计时器累计
	var oSwitchStop=null;	//计时器
	
	
	//创建按钮ul并插入按钮li，个数由图片数量决定
	var oSwitch=document.createElement('ul');
	oSwitch.className='switch';
	main_one_mid.appendChild(oSwitch);
	for(var i=0;i<switch_Li.length;i++){
		oSwitch.innerHTML+='<li class="switch_btn">'+(i+1)+'</li>'
	}
	//拿到按钮li 让第一个按钮li为红色
	var oSwitch_1=oSwitch.getElementsByTagName('li');
	oSwitch_1[0].style.background='red';		
	//发牌号，每个按钮绑定事件 让全部按钮为灰色 移动到按钮上为红色 让ul移动图片的宽度*牌号个像素
	var oSwitchW=switch_Li[0].offsetWidth;
	switch_Ul.style.width=switch_Li.length*oSwitchW+'px';
	for(var j=0;j<oSwitch_1.length;j++){
		oSwitch_1[j].index=j;
		oSwitch_1[j].onmouseover=function(){
			clearInterval(oSwitchStop);
			for(var k=0;k<oSwitch_1.length;k++){
				oSwitch_1[k].style.background='#666'
			}
			this.style.background='red';
			hxsd_tools.move(switch_Ul,{'left':-this.index*oSwitchW});
			n=this.index;
		}
	}
	
	//封一个函数 所有按钮为原有的灰色 和到到自动累计到n的按钮为红色 和移动图片的宽度*牌号个像素
	function oSwitchRun(n){
		for(var k=0;k<oSwitch_1.length;k++){
				oSwitch_1[k].style.background='#666'
			}
			oSwitch_1[n].style.background='red';	
			hxsd_tools.move(switch_Ul,{'left':-oSwitch_1[n].index*oSwitchW});
			
	}
	//开计时器 每两秒n自增1，将n做实参传到oSwitchRun(n)函数，
	function run_oSwitch(){
		oSwitchStop=setInterval(function(){
			n++;
			if(n==switch_Li.length){
				n=0;
			}
			oSwitchRun(n);
		},3000)
	}
	run_oSwitch();
	//鼠标移到ul，停止计时器，移开开启计时器
	switch_Ul.onmouseover=function(){
		clearInterval(oSwitchStop);
	};
	switch_Ul.onmouseout=function(){
		run_oSwitch()
	};*/
	var bannerImg=$("#switch_images").find("li");
	var stopbannerTime;
	function bannerTime(number) {
		if(number==undefined){
			number=0;
		};
		stopbannerTime=setInterval(function () {
			number++;
			if(number>=bannerImg.length){
				number=0;
			}
			bannerImg.eq(number).animate({opacity:0.8},500,function () {
					$(this).css({"display":"block","opacity":1}).siblings().css({"display":"none"});
			});

			$(".switch").find("li").eq(number).css({"background":"red"}).siblings().css({"background":"#666"});
		},2000);
	}



	var main_one_mid=document.getElementById('main_one_mid');
	var oSwitch=document.createElement('ul');
	oSwitch.className='switch';
	main_one_mid.appendChild(oSwitch);
	for(var i=0;i<bannerImg.length;i++){
		oSwitch.innerHTML+='<li class="switch_btn">'+(i+1)+'</li>'
	};
	$(".switch").find("li").eq(0).css({"background":"red"});

	bannerTime();

	$(".switch").find("li").each(function (e) {
		$(this).on("mouseover",function () {
			clearInterval(stopbannerTime);
			bannerImg.eq(e).css({"display":"block"}).siblings().css({"display":"none"});
			$(this).css({"background":"red"}).siblings().css({"background":"#666"});
		});
		$(this).on("mouseout",function () {
			bannerTime(e);
		});


	});
	$("#switch_images").find("li").each(function (e) {
		$(this).mouseover(function () {
			clearInterval(stopbannerTime);
		})
		$(this).mouseout(function () {
			bannerTime(e);
		})
	});


	
//-------------------------------brand--------------------------------------------------------------------------------------------------------
	var oBrand=document.getElementById('brand');
	var oBrandOne=oBrand.getElementsByClassName('one');
	var leftClass=document.getElementById('leftClass');
	var leftClassLi=leftClass.getElementsByTagName('li');
	
	for(var i=0;i<leftClassLi.length;i++){
		leftClassLi[i].index=i;
		leftClassLi[i].onmouseover=function(){
			for(var j=0;j<oBrandOne.length;j++){
				oBrandOne[j].style.display='none';
			};
			oBrand.style.display='block';
			oBrandOne[this.index].style.display='block';
		}
	};


	leftClass.onmouseout=function(){
		oBrand.style.display='none';
	};

	oBrand.onmouseover=function () {
		oBrand.style.display='block';
	};

	oBrand.onmouseout=function () {
		oBrand.style.display='none';
	};
//----------------------------Tab-----------------------------------------------------------------------------------------------------------------------
	//var F3_Tab01="";

		$("#3F_Tab").find("li").each(function (e) {
			$(this).on("mouseover",function () {
				$.ajax({
					type:"GET",
					url:"Tab/3FTab0"+e+".html",
					dateType:"json",
					success:function (data) {
						$("#3F_Tab01").html(data);
					}
				});
			});
		})




	/*$("#3F_Tab").find("li").eq(0).on("mouseover",function () {
		$.ajax({
			type:"GET",
			url:"Tab/3FTab00.html",
			dateType:"json",
			success:function (data) {
				// F3_Tab01=data;
				$("#3F_Tab01").html(data);
			}
		});

	})*/
};

