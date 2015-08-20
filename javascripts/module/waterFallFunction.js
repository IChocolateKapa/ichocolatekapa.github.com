/**
 * Created by Echo on 2015/8/12.
 */


define(['jquery'], function($){

    var wf = function(){};

    wf.prototype = {
        waterFall: function($section, $sectionParent, $sectionGranpa){
            var $imgSection = $section;
            /*计算整个页面显示的列数*/
            var imgW = $imgSection.eq(0).outerWidth();//包括填充和边框
            console.log("imgW: ", imgW);

            //页面宽度
            var bodyW = $sectionGranpa.width();
            console.log("bodyW: ", bodyW);
            var cols = Math.floor(bodyW / imgW);
            //$(".main-r").width(cols*imgW).css({"margin": "60px auto 0 auto"});
            $sectionParent.width(cols*imgW).css({"margin": "0 auto"});

            console.log("cols: ", cols)
            console.log("$imgSection.length: ", $imgSection.length);

            var hArr = new Array();
            $imgSection.each(function(index, value){
                var imgH = $imgSection.eq(index).outerHeight();
                console.log("imgH: ", imgH);
                if(index < cols){//第一行
                    hArr.push(imgH);
                } else{
                    var minH = Math.min.apply(null, hArr);/*求数组中最小值*/
                    var minHIndex = $.inArray(minH, hArr);/*求数组中某数值的索引*/

                    $(value).css({
                        "position": "absolute",
                        "top": minH+"px",
                        "left": imgW*minHIndex + "px"
                    })

                    hArr[minHIndex] += imgH;
                }
            })

            //console.log(hArr)
        },
        getMoreImg: function(){
            var imgObj = {};
            imgObj.imgList = new Array();
            for(var i = 0; i < 23; i++){
                var ranInt = Math.floor(Math.random()*38);
                imgObj.imgList.push({
                    "src": ranInt + ".jpg"
                });
            }

            $(imgObj.imgList).each(function(index, ele){
                //console.log("src: ", ele//实际生产过程中这些都是用模版来做
                var sectionStr = "<div class=\"section fl\" data-src='" + ele.src + "'>"
                    + "<div class=\"section-before\"><i class=\"fa fa-user\"></i></div>"
                    + "<div class=\"pic\">"
                    + "<img src=\"../../static/images/" + ele.src + "\"/>"
                    + "</div>"
                    + "</div>";

                $(".main-r-container").append(sectionStr);
            })
        },
        checkScrollSlide: function(){
            var $lastSection = $(".section:last-of-type");
            //console.log("$lastSection.offset().top: ", $lastSection.offset().top)
            var lastDis = $lastSection.offset().top + Math.floor($lastSection.height());///2
            //console.log("lastDis: ", lastDis)
            var scrollTop = $(window).scrollTop();
            //console.log("scrollTop: ", scrollTop)
            var targetTop = $(window).height();
            //console.log("targetTop: ", targetTop)
            if(lastDis < scrollTop + targetTop){
                return true;
            } else{
                return false;
            }
        },
        /*加入购物车时动画效果*/
        flyAnimate: function($this, total){
            var $pic = $this.next("div");

            $flyImg = $("<div class='flyImg'></div>");
            var imgsrc = $pic.find("img").attr("src");
            var $newImg = $("<img src='" + imgsrc + "' />");
            $newImg.appendTo($flyImg);

            $parentItem = $this.parent();
            $flyImg.appendTo($parentItem);

            /*获取鼠标相对于浏览器的偏移*/
            var posX = event.pageX;
            var posY = event.pageY;
            /*右下购物车元素相对于浏览器的偏移*/
            var eleOffTop = $(".tip").offset().top;
            var eleOffLeft = $(".tip").offset().left;

            var disY = Math.abs(eleOffTop - posY); //+ $(".switchBar").height()/2
            var disX = Math.abs(eleOffLeft - posX) + $(".switchBar").width();

            /*这样可以避免多个动画同时进行时，一个完成后所有动画都消失*/
            var $thisFlyImg = $parentItem.find(".flyImg");

            $thisFlyImg.animate({"top": "-15px"}, 300)
                .animate({"top": "15px"}, 200)
                .animate({"top": "-5px"}, 100)
                .animate({"top": "5px"}, 70)
                .animate({"top": "0"}, 100)
                .animate({"left": disX + "px", "top":  disY + "px"}, 1000, function(){
                    $thisFlyImg.css({display:'none'}).remove();
                    $(".tip").html(total + 1);
                    $this.addClass("selected");
                })
        },
        /*获取json长度*/
        getObjectLen: function(obj){
            var j = 0;
            for(var dd in obj){
                if(obj[dd] != null){
                    j += 1;
                }
            }
            return j;
        }
    }

    return {wf: wf}

})