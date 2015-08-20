/**
 * Created by Echo on 2015/8/18.
 */

require.config({
    paths: {
        jquery: "../lib/jquery-2.1.3.min",
        event: "../common/common-event",
        watFal: "./waterFallFunction"
    }
})

require(['jquery', 'indexApp', 'event', 'watFal'], function($, iApp, EV, wf){
    var indexApp = new iApp.indexFunc();
    indexApp.truerifyFlag();
    var watF = new wf.wf();

    var eve = EV.eventUtil;

    indexApp.autoSlide();
    /*$(window).onload = watF.waterFall($(".project-item"), $(".projects ul"), $(".projects"));
    $(window).resize(function(){
        watF.waterFall($(".project-item"), $(".projects ul"), $(".projects"));
    })*/




    $(function(){


        var slideTime;
        $(".slideTrigger li").mouseenter(function(){
            indexApp.clearAutoPlayTimer();
            var $this = $(this);
            var index = $this.index();
            slideTime = setTimeout(function(){
                $(".slideTrigger li").removeClass("curr");
                $this.addClass("curr");
                $(".ListItem").removeClass("curr").eq(index).addClass("curr");
            }, 800)
        })

        $(".slideTrigger li").mouseleave(function(){
            indexApp.clearAutoPlayTimer();
            if(autoPlay){
                indexApp.autoSlide();
                $(".ctl-btn").html("暂停").removeClass("play").attr("title", "暂停自动播放");
            }
        })

        $(".slider-next").click(function(){
            indexApp.clearAutoPlayTimer();
            indexApp.slideAnimate(true);
            if(autoPlay){
                indexApp.autoSlide();
                $(".ctl-btn").html("暂停").removeClass("play").attr("title", "暂停自动播放");
            }

        })
        $(".slider-prev").click(function(){
            indexApp.clearAutoPlayTimer();
            indexApp.slideAnimate(false);
            if(autoPlay){
                indexApp.autoSlide();
                $(".ctl-btn").html("暂停").removeClass("play").attr("title", "暂停自动播放");
            }

        })


        var autoPlay = true;
        $(".ctl-btn").click(function(){
            var $this = $(this);
            /*暂停状态下没有play类, 有play类表示当前是暂停播放状态*/
            if(!$this.hasClass("play")){
                indexApp.clearAutoPlayTimer();
                globalSlide = null;
                autoPlay = false;
                $this.html("开始").addClass("play").attr("title", "开始自动播放");
            } else {
                autoPlay = true;
                indexApp.autoSlide();
                $(".ctl-btn").html("暂停").removeClass("play").attr("title", "暂停自动播放");
            }

            eve.preventDefault(event);
        })


    })

    /*在项目经验中需要取消鼠标滚轮的事件冒泡*/
    $(".projects ul").on("mousewheel DOMMouseScroll", function(e){
        eve.stopPropagation(event);
    })

    //eve.addHandler($(".slide"), "mousewheel DOMMouseScroll", MouseWheelHandler);
    $(".slide").on("mousewheel DOMMouseScroll", MouseWheelHandler);

    /*利用延迟和开关就能控制滚轮事件*/
    function MouseWheelHandler(e){
        var flag = indexApp.getFlag();
        if(flag){
            setTimeout(function(){
                var ifNext = indexApp.getScrollDirection(e);
                indexApp.slideAnimate(ifNext);
            }, 800);
            indexApp.falserifyFlag();
        }
    }
})