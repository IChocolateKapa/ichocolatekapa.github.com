/**
 * Created by Echo on 2015/8/18.
 */

define(['jquery', 'event'], function($, e){

    var eve = e.eventUtil;

    var indexFunc = function(){};

    indexFunc.globalSlide = null;
    indexFunc.scrollFlag = true;
    indexFunc.prototype.scroll = true;

    indexFunc.prototype = {
        initLiPos: function($parentObj){
            //alert("reside")
            $parentObj.each(function(index, ele){
                var w = $(ele).width();
                $(ele).css({
                    "left": index*w + "px"
                })
            })
        },

        truerifyFlag: function(){
            this.scrollFlag = true;
        },
        falserifyFlag: function(){
            this.scrollFlag = false;
        },
        getFlag: function(){
            return this.scrollFlag;
        },
        slideAnimate: function(flag){
            this.truerifyFlag();

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
            $(".ListItem").removeClass("curr").eq(nextIndex).addClass("curr");
            $(".slideTrigger li").removeClass("curr").eq(nextIndex).addClass("curr");
        },

        autoSlide: function(){
            var $this = this;
            this.globalSlide = window.setInterval(function(){
                $this.slideAnimate(true);
            }, 6000)
        },
        clearAutoPlayTimer: function(){
            clearInterval(this.globalSlide);
            this.globalSlide = null;
        },
        /*获取鼠标滚动方向，true为向下，false为向上*/
        getScrollDirection: function(e){
            event = eve.getEvent(e);
            eve.preventDefault(event);
            var value = event.originalEvent.wheelDelta || -event.originalEvent.detail;//-120， 3
            var delta = Math.max(-1, Math.min(1, value));
            return delta<0 ? true : false;
        }

    }
    return {indexFunc: indexFunc};
})