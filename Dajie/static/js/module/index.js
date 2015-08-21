/**
 * Created by hpwu on 2015/7/3.
 */



$(function(){
    var scrollTop = $(window).scrollTop();
    setStatus(scrollTop);
    if($(window).height() > 700 && scrollTop < 10){
        setTimeout(function(){
            $("#_firstHead").addClass("scale")
        }, 300);
    }
    /*给保持登录状态 添加事件 -- 开始 --*/
    $(".staylogin").click(function(){
        $("._chbx").toggleClass("_nologin");
    })

    /*给保持登录状态 添加事件 -- 结束 --*/
    /*给侧边栏小图标 返回顶部 绑定事件 --开始*/
    $("#goTop").bind("click", function(){
        $("html, body").animate({scrollTop: 0}, 800);
        //$(window).scrollTop(0);
    })
    /*给侧边栏小图标 返回顶部 绑定事件 --结束*/

    /*给侧边栏小图标 意见反馈 绑定事件 --开始*/
    $("#response").click(function(){
        $(".floatBar").addClass("_showFloat");
    })

    $(".closeX").click(function(){
        $(".floatBar").removeClass("_showFloat");
    })
    /*给侧边栏小图标 意见反馈 绑定事件 --结束*/
})


$(window).on("scroll", function(){
    var scrollTop = $(window).scrollTop();
    //console.log(scrollTop);
    setStatus(scrollTop);
})
