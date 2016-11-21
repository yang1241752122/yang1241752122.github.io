/**
 * Created by Administrator on 2016/11/15 0015.
 */
$(function () {
    var row=5;
    var col=5;
    var main=$("#picAnimation");
    var w=main.width()/col;
    var h=main.height()/row;
    for(var r=0;r<row;r++){
        for(var c=0;c<col;c++){
            var index=r*col+c;
            $("<li><div></div></li>").find("div")
                .width(w).height(h)
                .css({"background":"url(imagesAnimation/"+index+".jpg)","background-size":"cover"})
                .end()
                .each(function () {
                    $(this).css({"left":c*w,top:r*h});
                })
                .attr("index",index)
                .click(itemClick)
                .appendTo(main);
        }
    }
    var open=true;
    function itemClick() {
        if(open){
            showAll();
            open=false;
        }else{
            var index=$(this).attr("index");
            showImg(index);
            open=true;
        }
    };

    function showAll() {
        main.find("div").css({"transform":"scale(0.9)"}).each(function (i) {
            $(this).css({"background":"url(imagesAnimation/"+i+".jpg)","background-size":"cover"})
        });
        main.find("li").each(function (i) {
            var deg=Math.random()*60-30;
            var r=parseInt(i/col);
            var c=i%col;
            var tx=Math.ceil(c-col/2)*30;   //ceil()向上取整
            var ty=Math.ceil(r-row/2)*20;
            $(this).css({"transform":"rotate("+deg+"deg) translate("+tx+"%,"+ty+"%)"})
        })
    };

    function showImg(index) {
        main.find("li").css({"transform":"rotate(0deg) translate(0%,0%)"});
        main.find("div").each(function (i) {
            var r=parseInt(i/row);
            var c=i%col;
            var x=c*100/(col-1);
            var y=r*100/(row-1);
            $(this).css({
                "transform":"scale(1)",
                "background":"url(imagesAnimation/"+index+".jpg)",
                "background-size":"auto",
                "background-position":x+"%"+y+"%"
            });
        });
    };

    //--------------------------------------------------history--------------------------------------------------------------------
    var historyHtml='';
     $.ajax({
         type:"GET",
         url:"data/data.json",
         dateType:"json",
         success:function (data) {
             for(var i=0;i<data.length;i++){
                 if(i%2==0){
                     historyHtml+=
                         '<div class="pic picLeft">'+
                         '<div class="history">'+
                         '<p class="time">'+data[i].time+'</p>'+
                         '<p class="font">'+data[i].font+'</p>'+
                         '</div>'+
                         '<img src="'+data[i].img+'">'+
                         '</div>';
                 }else {
                     historyHtml+=
                         '<div class="pic picRight">'+
                         '<div class="history">'+
                         '<p class="time">'+data[i].time+'</p>'+
                         '<p class="font">'+data[i].font+'</p>'+
                         '</div>'+
                         '<img src="'+data[i].img+'">'+
                         '</div>';
                 }
             }
             historyHtml+=' <div class="ending">'+
             'To be continued'+
             '</div>';
             $(".historyMain").html(historyHtml)
         }
     })
});