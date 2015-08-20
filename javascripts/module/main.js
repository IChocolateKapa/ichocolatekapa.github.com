/**
 * Created by Echo on 2015/8/18.
 */

require.config({
    paths: {
        jquery: "../lib/jquery-2.1.3.min"
    }
})

require(['jquery', 'indexApp'], function($, iApp){
    var indexApp = new iApp.indexFunc();
    /*初始化所有条目的位置*/
    $(window).onload = indexApp.initLiPos($(".ListItem"));
    var resizeTimer;
    $(window).resize(function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            indexApp.initLiPos($(".ListItem"));
        }, 500)
    })
    autoSlide();

    var globalSlide;
    function autoSlide(){
        globalSlide = window.setInterval(function(){
            slideAnimate(true);
        }, 2000)
    }

    function slideAnimate(flag){

        var curIndex = $(".slideTrigger li.curr").index();

        if(flag){
            var nextIndex = curIndex + 1;
            if(nextIndex > $(".slideTrigger li").length - 1){
                nextIndex = 0;
            }
        } else {
            var nextIndex = curIndex - 1;
            if(nextIndex < 0){
                nextIndex = $(".slideTrigger li").length - 1;
            }
        }

        var w = $(".ListItem").eq(0).width();

        $(".List").css({"left": "-" + w*nextIndex + "px"});

        $(".ListItem").removeClass("curr").eq(nextIndex).addClass("curr");

        $(".slideTrigger li").removeClass("curr").eq(nextIndex).addClass("curr");
    }



    $(function(){
        var slideTime;
        $(".slideTrigger li").mouseenter(function(){
            clearInterval(globalSlide);
            var $this = $(this);
            var index = $this.index();
            slideTime = setTimeout(function(){
                $(".slideTrigger li").removeClass("curr");
                $this.addClass("curr");
                var w = $(".ListItem").eq(0).width();
                $(".List").css({"left": "-" + w*index + "px"});
                $(".ListItem").removeClass("curr").eq(index).addClass("curr");
            }, 800)
        })

        $(".slideTrigger a").mouseleave(function(){
            clearTimeout(slideTime);
            autoSlide();
        })

        $(".slider-next").click(function(){
            clearInterval(globalSlide);
            slideAnimate(true);
            autoSlide();
        })
        $(".slider-prev").click(function(){
            clearInterval(globalSlide);
            slideAnimate(false);
            autoSlide();
        })


        /*监听鼠标滚动事件*/

    })

})