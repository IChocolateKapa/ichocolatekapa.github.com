/**
 * Created by Echo on 2015/8/13.
 */

define(['jquery'], function($){
    var foreSeeImage = function(){};

    foreSeeImage.zoomDiv = null;
    foreSeeImage.imgEle = null;
    foreSeeImage.mask = null;

    foreSeeImage.cfg = {};


    foreSeeImage.prototype = {

        initZoomDiv: function($parentObj, cfg){
            /*获取元父元素的宽高*/
            var eleH = $parentObj.height();
            /*只支持显示在元素左边或者右边*/
            this.cfg = {
                "wh": eleH,
                "pos": "right",
                "x": 5
            }
            $.extend(this.cfg, cfg);

            var $zoomDiv = $("<div class='zoomDiv'></div>");
            this.zoomDiv = $zoomDiv;
            $zoomDiv.appendTo($parentObj);

            var zoomStyle = {
                "position": "absolute",
                "overflow": "hidden",
                "background": "white",
                "display": "block",
                "z-index": "999",
                "height": this.cfg.wh + "px",
                "width": this.cfg.wh + "px",
                'top': 0
            };
            var pos = this.cfg.pos;
            if(pos == "left"){
                zoomStyle["left"] = "-" + (this.cfg.wh + this.cfg.x) + "px";
            } else if(pos == "right") {
                zoomStyle["right"] = "-" + (this.cfg.wh + this.cfg.x) + "px";
            } else{
                zoomStyle["right"] = "-" + (this.cfg.wh + this.cfg.x) + "px";
            }

            this.zoomDiv.css(zoomStyle);

            var parentImgSrc = $parentObj.find("img").attr("src");
            var $img = $("<img src='"+ parentImgSrc + "'>");
            this.imgEle = $img;
            $zoomDiv.append($img);
            console.log("$zoomDiv : ", $zoomDiv);
            /*增加半透框滑块元素*/
            var $mask = $("<div class='mask'></div>");
            this.mask = $mask;
            $mask.prependTo($parentObj);
            return $(".mask");
        },

        /*删除预览div*/
        deleteZoomDiv: function(){
            $(".mask").remove();
            $(".zoomDiv").remove();
            this.zoomDiv = null;
            this.imgEle = null;
        },

        /*拾取图片的半透明框跟随鼠标移动, 展示图片放大*/
        showForeImage: function($parentObj, $obj){

            /*获取鼠标相对于浏览器的偏移*/
            var posX = event.pageX;
            var posY = event.pageY;

            /*父元素相对于浏览器的偏移*/
            var eleOffLeft = $parentObj.offset().left;
            var eleOffTop = $parentObj.offset().top;

            /*获取元父元素的宽高*/
            var eleW = $parentObj.width();
            var eleH = $parentObj.height();

            /*获取移动半透框（元素）的宽高*/
            var jpW = $obj.width();
            var jpH = $obj.height();

            /*鼠标相对于父元素的偏移*/
            var mouseElex = posX-eleOffLeft;
            var mouseEleY = posY-eleOffTop;

            $obj.css({"left": + mouseElex-jpW/2 + "px", "top": mouseEleY-jpH/2 + "px"});

            if(mouseElex < jpW/2){
                $obj.css({"left": + "0"})
            } else if((eleW-mouseElex) < jpW/2){
                $obj.css({"left": + eleW-jpW + "px"})
            }

            if(mouseEleY < jpH/2){
                $obj.css({"top": + "0"})
            } else if((eleH-mouseEleY) < jpH/2){
                $obj.css({"top": + eleH-jpH + "px"})
            }

            /*滑块和预览块的大小比例*/
            var scale = this.zoomDiv.width()/$obj.width();

            /*给预览图片以比例设置长宽*/
            this.imgEle.css({
                "position": "absolute",
                "width": "calc(" + scale + " * " + eleW + "px)",
                "height": "calc(" + scale + " * " + eleH + "px)"
            })

            /*图片随鼠标位置进行相对位移*/
            var offX = $obj.position().left;
            var offY = $obj.position().top;
            this.imgEle.css({"top": "-" + offY*scale + "px", "left": "-" + offX*scale + "px"});

        },


        /*拾取图片的半透明框跟随鼠标移动*/
        moveWithMouse: function($parentObj, $obj){
            /*获取鼠标相对于浏览器的偏移*/
            var posX = event.pageX;
            var posY = event.pageY;

            /*父元素相对于浏览器的偏移*/
            var eleOffLeft = $parentObj.offset().left;
            var eleOffTop = $parentObj.offset().top;

            /*获取元父元素的宽高*/
            var eleW = $parentObj.width();
            var eleH = $parentObj.height();

            /*获取移动半透框（元素）的宽高*/
            var jpW = $obj.width();
            var jpH = $obj.height();

            /*鼠标相对于父元素的偏移*/
            var mouseElex = posX-eleOffLeft;
            var mouseEleY = posY-eleOffTop;

            $obj.css({"left": + mouseElex-jpW/2 + "px", "top": mouseEleY-jpH/2 + "px"});

            if(mouseElex < jpW/2){
                $obj.css({"left": + "0"})
            } else if((eleW-mouseElex) < jpW/2){
                $obj.css({"left": + eleW-jpW + "px"})
            }

            if(mouseEleY < jpH/2){
                $obj.css({"top": + "0"})
            } else if((eleH-mouseEleY) < jpH/2){
                $obj.css({"top": + eleH-jpH + "px"})
            }
        },
        showImage: function($zoomDiv, $obj){
            /*获取元素覆盖下的图片的像素*/
            var offX = $obj.position().left;
            var offY = $obj.position().top;
            var scale = $zoomDiv.width()/$obj.width();
            $zoomDiv.find("img").css({"top": "-" + offY*scale + "px", "left": "-" + offX*scale + "px"});
        }
    }

    return {foreSeeImage: foreSeeImage}
})
