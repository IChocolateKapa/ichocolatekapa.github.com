/**
 * Created by Administrator on 2015/8/4.
 */


function getImgClass(index){
    var img = "";
    switch (index){
        case 0:
            img = "sx";
            break;
        case 1:
            img = "mj";
            break;
        case 2:
            img = "yl";
            break;
        case 3:
            img = "sp";
            break;
        case 4:
            img = "bj";
            break;
        default:
            img = ""
    }

    return img;
}

function getImgName(index){
    var img = "";
    switch (index){
        case 0:
            img = "bgd-chihuo";
            break;
        case 1:
            img = "bgd-rouchuan";
            break;
        case 2:
            img = "bgd-putao";
            break;
        case 3:
            img = "bgd-jiushui";
            break;
        default:
            img = "bgd-chihuo"
    }

    return img;
}



//banner计时器
var timer_auto;
function autoSlide() {
    timer_auto = window.setInterval(function(){
        var index = $("._triggerHover").index();
        var nextIndex = index + 1;
        var maxIndex = $(".trigger-a").length;
        if(nextIndex >= maxIndex){
            nextIndex = 0;
        }
        var nextEle = $('.trigger-a').eq(nextIndex);
        bannerAnimate(nextEle, nextIndex);
    }, 3000);
}


var countTimer;
function countDown(){

    countTimer = setInterval(function(){
        var now = new Date();
        var H = now.getHours();
        var M = now.getMinutes();
        var S = now.getSeconds();

        var m = 59;
        var s = 59;

        $(".clock").attr("class", "clock");
        $(".miaosha-l").attr("class", "miaosha-l");
        $(".timeline-item p").removeClass("curr");

        $("#daynight").attr("class", "moon");
        /*morming*/
        if(H > 6 && H < 12){
            $("#daynight").attr("class", "sun");
            $(".clock").addClass("morning");
            $(".miaosha-l").addClass("bgd-morning");
            $(".timeline-item p").eq(0).addClass("curr");
            var h = 11;
        } else if(H > 12 && H < 18){
            $("#daynight").attr("class", "sun");
            $(".clock").addClass("noon");
            $(".miaosha-l").addClass("bgd-noon");
            $(".timeline-item p").eq(1).addClass("curr");
            var h = 17;
        } else{
            $("#daynight").attr("class", "moon");
            $(".clock").addClass("night");
            $(".miaosha-l").addClass("bgd-night");
            $(".timeline-item p").eq(2).addClass("curr");
            var h = 5;
        }

        var hour = h - H;
        var minute = m - M;
        var second = s - S;
        var nHor = hour + 24;

        if(hour >= 0 && hour < 6){
            $('.daojishi span').eq(0).html("0" + hour);
        } else{
            if(nHor < 10){
                $('.daojishi span').eq(0).html("0" + nHor);
            } else{
                $('.daojishi span').eq(0).html(nHor);
            }
        }



        if(minute < 10){
            $('.daojishi span').eq(1).html("0" + minute);
        } else{
            $('.daojishi span').eq(1).html(minute);
        }

        if(second < 10){
            $('.daojishi span').eq(2).html("0" + second);
        } else{
            $('.daojishi span').eq(2).html(second);
        }
    }, 1000)
}





/*banner动图切换*/
function bannerAnimate($obj, index){
    /*底部圆圈trigger样式*/
    $(".trigger-a").removeClass("_triggerHover");
    $obj.addClass("_triggerHover");


    var $ImgContainer = $(".banner-m-img");

    $ImgContainer.removeClass("curr")
        .eq(index)
        .stop()
        .addClass("curr")
        .animate({"opacity": "1"}, 600);

    var $img_l = $('.banner-m-img .img-l').css({"opacity": "0", "filter": "alpha(opacity=0)"}).stop().eq(index)
    setTimeout(function(){
        $img_l.animate({"opacity": "1"}, 600);
    }, 100)

    /*给banner换背景颜色*/
    $(".banner").attr("class", "banner");
    $(".banner").addClass(getImgName(index));


    var $img_r = $('.banner-m-img .img-r').css({"opacity": "0", "filter": "alpha(opacity=0)", "right": "-120px"}).stop().eq(index);
    setTimeout(function(){
        $img_r.animate({"right": '40px'}, 100)
            .animate({"opacity": '1', "filter": "alpha(opacity=100)"}, 30)
            .animate({"right": '10px'}, 40)
            .animate({"right": '30px'}, 40)
            .animate({"right": '20px'}, 40);
    }, 200);

}


/*美食地理凄恻特效*/
function carAnimate($obj, index, bot, left){
    $('.meishi-l ._addrDot p').removeClass("curr");
    $obj.addClass("curr");
    $("._car").animate({
        'top': bot +'px',
        'left': left + 'px'
    }, 500)

    $(".meishi-l ._content ul").removeClass("block");
    $(".meishi-l ._content ul").eq(index).addClass("block");
}


/*美食地理飞机特效*/
function planeAnimate($obj, index, bot, left){
    $('.meishi-r ._addrDot p').removeClass("curr");
    $obj.addClass("curr");
    $("._plane").animate({
        'top': bot +'px',
        'left': left + 'px'
    }, 500)

    $(".meishi-r ._content ul").removeClass("block");
    $(".meishi-r ._content ul").eq(index).addClass("block");
}



/*渴了饿了闲了 切换*/
function kxec_func(ele, $obj){
    $(ele + " li").removeClass("curr");
    $obj.addClass("curr");
    var index = $obj.index();
    var $content = $(ele).parent().siblings("div").find("._content");
    var $imgList = $(ele).parent().siblings("div").find(".kxec-r-imgList");
    $content.find("ul").removeClass("block");
    $content.find("ul").eq(index).addClass("block");

    $imgList.find("ul").removeClass("block");
    $imgList.find("ul").eq(index).addClass("block");
}