/**
 * Created by Administrator on 2016/11/22 0022.
 */
$(function () {
    $(".worksUl").find("li").each(function () {
        $(this).mouseover(function () {
           $(this).find("div").css({"display":"block"})
        })
        $(this).mouseout(function () {
            $(this).find("div").css({"display":"none"})
        })
    })

})