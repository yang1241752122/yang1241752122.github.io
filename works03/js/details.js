// JavaScript Document
var goodsImgArr=['京东内页_01.jpg','京东内页_03.jpg','京东内页_02.jpg','京东内页_04.jpg','京东内页_05.jpg']

window.onload=function(){
	var goodsImages=document.getElementById('goods_images');
	var oBottom=document.getElementById('bottom');
	var big_goodsImg=document.getElementById('big_goodsImg');
	
	var goods_nav=document.getElementById('goods_nav');
	var goods_Img=goods_nav.getElementsByTagName('img');
	
//-------------切换图片-------------------------------------------------------------------------------------------------
	for(var i=0;i<goods_Img.length;i++){
		goods_Img[i].index=i;
		goods_Img[i].onmouseover=function(){
			goodsImages.innerHTML='<img src="images/'+goodsImgArr[this.index]+'"><span id="show_big"></span>';	
			big_goodsImg.innerHTML='<img src="images/'+goodsImgArr[this.index]+'" id="bigImg">';
		}		
	}
	
//------------------------------------------------------------------------------------------------------------------------------------	
	
	goodsImages.onmousemove=function(e){
		var bigImg=document.getElementById('bigImg');
		var show_big=document.getElementById('show_big');
			var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
			e=e||event;
			
			show_big.style.display='block';
			var disX=e.clientX-oBottom.offsetLeft-show_big.offsetWidth/2;
			var disY=(e.clientY+scrollTop)-oBottom.offsetTop-show_big.offsetHeight/2;
			
			if(disX<0){
				disX=0;
			}
			if(disX>goodsImages.offsetWidth-show_big.offsetWidth){ 
				disX=goodsImages.offsetWidth-show_big.offsetWidth;
			}
			if(disY<0){
				disY=0;
			}
			if(disY>goodsImages.offsetHeight-show_big.offsetHeight){
				disY=goodsImages.offsetHeight-show_big.offsetHeight
			}
			show_big.style.left=disX+'px';
			show_big.style.top=disY+'px';	
			big_goodsImg.style.display='block'
			
			x_rate=disX/(show_big.offsetWidth-goodsImages.offsetWidth);
			y_rate=disY/(show_big.offsetHeight-goodsImages.offsetHeight);
			bigImg.style.left=(bigImg.offsetWidth-big_goodsImg.offsetWidth)*x_rate+'px';
			bigImg.style.top=(bigImg.offsetHeight-big_goodsImg.offsetHeight)*y_rate+'px';
	}	
	goodsImages.onmouseout=function(){
		big_goodsImg.style.display='none'
		show_big.style.display='none'
	}

//---------------商品种类选框-----------------------------------------------------------------------------------------------
	var species=document.getElementById('species');
	var speciesI=species.getElementsByTagName('i');
	
	for(var i=0;i<speciesI.length;i++){
		speciesI[i].off=true;
			speciesI[i].onclick=function(e){	
				e=e||event;
				for(var j=0;j<speciesI.length;j++){
					speciesI[j].style.border='1px solid #ccc';
					 
				}
				if(this.off){
						this.style.border='1px solid red'
						for(var k=0;k<speciesI.length;k++){
							speciesI[k].off=true;
						}
						 this.off=false;
				}else{
						this.style.border='1px solid #ccc'
						  this.off=true;	
				}
			}
	}
//----------------分期选框------------------------------------------------------------------------------------------------	
	var ious=document.getElementById('ious');
	var iousI=ious.getElementsByTagName('i');
	for(var i=0;i<iousI.length;i++){
		iousI[i].off=true;
		iousI[i].onclick=function(){
			for(var j=0;j<iousI.length;j++){
				iousI[j].style.border='1px solid #ccc';	 
			}

			if(this.off==true){
				this.style.border='1px solid red'
				for(var k=0;k<iousI.length;k++){
					iousI[k].off=true;
				}
				this.off=false;
			}else{
				this.style.border='1px solid #ccc'
				this.off=true;
			}
		}
	}

	//--------------------------------------------商品数量-----------------------------------------------------------------
	var n=1;
	$("#goodsUp").click(function () {
		$("#goodsCount").val(++n);
	});
	$("#goodsDown").click(function () {
		if(n<1){
			n=1;
		}
		$("#goodsCount").val(n--);
	})
};

