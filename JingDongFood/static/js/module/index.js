/**
 * Created by Administrator on 2015/7/22.
 */
$(function () {

    /*页面加载时banner动画效果 开始*/
    var curEle = $(".trigger-a").eq(0);
    bannerAnimate(curEle, 0);
    autoSlide();
    /*页面加载时banner动画效果 结束*/


    /*网站顶部导航 hover 效果 -- 开始*/
    $(".navListItem").hover(
        function(){
            $(this).find(".delivery").addClass("_navHover");
            $(this).find("._downArrow").addClass("_arrowHover");
            $(this).find(".deliveryCity").show();
        },
        function(){
            $(".deliveryCity").hide();
            $(this).find(".delivery").removeClass("_navHover");
            $(this).find(".deliveryCity").hide();
            $(this).find("._downArrow").removeClass("_arrowHover");
        }
    )

    /*导航栏中 a hover事件 -- 开始 --*/
    $(".deliveryCity .city a").click(function(){
        $(".deliveryCity .city a").each(function(){
            $(this).removeClass("_aClick");
        })
        $(this).addClass("_aClick");
        $(this).parent().parent().prev().find("span").html($(this).text());
    })

    /*导航栏中 a hover事件 -- 结束 --*/

    /*网站顶部导航 hover 效果 -- 结束 */





    /*搜索栏部分 -- 开始 --*/

    /* 全部分类 hover 事件 --开始 --*/
    $(".kinds figure").hover(
        function(){
            $(this).find("._downArrow").addClass("_kindsArrowHover");
            $(this).find("ul").show();
        },
        function(){
            $(this).find("._downArrow").removeClass("_kindsArrowHover");
            $(this).find("ul").hide();
        }
    )
    /* 全部分类 hover 事件 -- 结束 --*/

    /*购物车 hover 事件 -- 开始 --*/
    $(".searchBar_r").hover(
        function(){
            $(this).addClass("_bxsdHover");
            $(this).find(".delivery").addClass("carHover");
            $(this).find(".shoppingCar").show();
        },
        function(){
            $(this).removeClass("_bxsdHover");
            $(this).find(".delivery").removeClass("carHover");
            $(this).find(".shoppingCar").hide();
        }
    )
    /*购物车 hover 事件 -- 结束 --*/

    /*搜索栏部分 -- 结束 --*/



    /*banner 部分 左侧菜单 hover事件 开始*/
    $(".menu-ListItem").hover(
        function(){

            var $this = $(this);

            $(".sideBar").show();

            $this.parent().parent().addClass("neiYinYing");
            $this.addClass("waiYinYing");


            $this.find(".triangle").show();

            var index = $this.index();
            $(".sideBar section").eq(index).show();

            var imgClass = getImgClass(index);
            $this.find(".sideImg").addClass(imgClass + "-hover");

        },
        function () {

            $(".sideBar").hide();

            var $this = $(this);

            $this.parent().parent().removeClass("neiYinYing");
            $this.removeClass("waiYinYing");

            $this.find(".triangle").hide();


            var index = $this.index();
            var $sideBar = $(".sideBar section").eq(index);

            var imgClass = getImgClass(index);
            if($this.find(".sideImg").hasClass(imgClass + "-hover")){
                $this.find(".sideImg").removeClass(imgClass + "-hover");
            }


            $sideBar.hide().hover(
                function(){

                    var $this = $(this);

                    $(".sideBar").show();

                    $this.show();

                    var index = $this.index();
                    var $tarLi = $(".menu-ListItem").eq(index);
                    $tarLi.parent().parent().removeClass("neiYinYing");

                    $tarLi.parent().parent().addClass("neiYinYing");
                    $tarLi.addClass("waiYinYing");

                    $tarLi.find(".triangle").show();

                    var imgClass = getImgClass(index);
                    if($tarLi.find(".sideImg").hasClass(imgClass + "-hover")){
                        $tarLi.find(".sideImg").removeClass(imgClass + "-hover");
                    }
                    $tarLi.find(".sideImg").addClass(imgClass + "-hover");

                },
                function(){

                    $(".sideBar").hide();
                    $(this).hide();
                    $(".menu").parent().removeClass("neiYinYing");

                    var index = $(this).index();
                    var $tarLi = $(".menu-ListItem").eq(index);

                    $tarLi.find(".triangle").hide();
                    $tarLi.removeClass("waiYinYing");

                    var imgClass = getImgClass(index);
                    if($tarLi.find(".sideImg").hasClass(imgClass + "-hover")){
                        $tarLi.find(".sideImg").removeClass(imgClass + "-hover");
                    }
                }
            )
        }
    )
    /*banner 部分 左侧菜单 hover事件 结束*/




    /*banner 中间动图 开始*/
    /*鼠标滑过 trigger时 变换背景和大图 --开始-- */
    var bannerTimer;
    $('.trigger-a').mouseenter(function(){
        clearInterval(timer_auto);
        var index = $(this).index();
        var $this = $(this);
        bannerTimer = setTimeout(function(){
            bannerAnimate($this, index);
        }, 500);
    })
    $('.trigger-a').mouseleave(function(){
        clearTimeout(bannerTimer);
        autoSlide();
    })
    /*鼠标滑过 trigger时 变换背景和大图 --结束-- *
    /*banner 中间动图 结束*/


    /*返回顶部*/
    $("#goTop").click(function(){
        $(window).scrollTop(0);
    })
})

/*监测返回顶部出现*/
$(window).on("scroll", function(){
    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    if(scrollTop > 600){
        $(".fixToolBar").show();
    } else{
        $(".fixToolBar").hide();
    }
})
