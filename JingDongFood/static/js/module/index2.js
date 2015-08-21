/**
 * Created by Administrator on 2015/7/29.
 */
$(function () {

    /*banner左侧图片展示*/
    $(".banner-r-list-b li").hover(function(){
        $(".banner-r-list-b li a").removeClass("curr-a");
        $(this).find("a").addClass("curr-a");

        var index = $(this).index();
        $(".banner-r-list-t li").removeClass("block");
        $(".banner-r-list-t li").eq(index).addClass("block");

    })

    /*冷柜零食title hover*/
    $(".title-ListItem").click(function(){
        $(this).parent().find(".title-ListItem").removeClass("curr");
        $(this).addClass("curr");
        //$(this).find("i").hide();
    })

    $(".snacks-contentItem-r-Item").hover(
        function(){
            $(this).addClass("_hover");
        },
        function(){
            $(this).removeClass("_hover");
        }
    )

    $(".snacks-contentItem-l-a").click(function(){
        $(".snacks-contentItem-l-a").removeClass("selected");
        $(this).addClass("selected");
        var index = $(this).index();
        $(".snacks-contentItem-r ul").removeClass("block");
        $(".snacks-contentItem-r ul").eq(index).addClass("block");
    })

    $(".freezer-contentListItem").hover(
        function(){
            $(this).find(".topPrice").css({
                "visibility": "visible",
                "top" : "-76px"
            })
        },
        function(){
            $(this).find(".topPrice").css({
                "visibility": "hidden",
                "top" : "-96px"
            })
        }
    )



    /*美食地理*/
    /*合理设置定时器，实现delay后hover事件才触发的方法*/
    /*左侧汽车*/
    var carTime;
    $('.meishi-l ._addrDot p').mouseenter(function(){
        var $this = $(this);
        var index = $this.index();
        var thisTop = $this.position().top;
        var thisLeft = $this.position().left;
        var carTop = thisTop - 14;
        var carLeft = thisLeft + 80;

        carTime = setTimeout(function(){
            carAnimate($this, index, carTop, carLeft);
        }, 500)

    })

    $('.meishi-l ._addrDot p').mouseleave(function(){
        clearTimeout(carTime);
    })

    /*右侧飞机*/
    var planeTime;
    $('.meishi-r ._addrDot p').mouseenter(function(){
        var $this = $(this);
        var index = $this.index();
        var thisTop = $this.position().top;
        var thisLeft = $this.position().left;
        var carTop = thisTop - 15;
        var carLeft = thisLeft + 80;

        planeTime = setTimeout(function(){
            planeAnimate($this, index, carTop, carLeft);
        }, 500)

    })

    $('.meishi-r ._addrDot p').mouseleave(function(){
        clearTimeout(planeTime);
    })




    /*渴了*/
    $(".ke li").hover(function(){
        var $this = $(this);
        kxec_func(".ke", $this);
    })

    /*闲了*/
    $(".xian li").hover(function(){
        var $this = $(this);
        kxec_func(".xian", $this);
    })

    /*饿了*/
    $(".ele li").hover(function(){
        var $this = $(this);
        kxec_func(".ele", $this);
    })

    /*馋了*/
    $(".chan li").hover(function(){
        var $this = $(this);
        kxec_func(".chan", $this);
    })

})


