/**
 * Created by hpwu on 2015/7/14.
 */

function setStatus(scrollTop){
    if(scrollTop >= 0 && scrollTop < 700){
        $("#goTop").css({"opacity": "0"});
        if(scrollTop >= 0 && scrollTop < 190){
            setTimeOutFunction($("#_showHead").addClass("slide_rotate"));
        } else if(scrollTop >= 198 && scrollTop < 700){
            setTimeOutFunction($("#_firstHead").addClass("scale"));
        }
    } else {
        $("#goTop").css({"opacity": "1"});
        if(scrollTop >= 700 && scrollTop < 1180){
            setTimeOutFunction($("#_secondHead").addClass("scale"));
        } else if(scrollTop >= 1180 && scrollTop < 1339){
            setTimeOutFunction($("#_thirdHead").addClass("scale"));
        } else if(scrollTop >= 1339 && scrollTop < 1930){
            setTimeOutFunction($("#_fourthHead").addClass("scale"));
        } else if(scrollTop >= 1930 && scrollTop < 2950){
            setTimeOutFunction($("#_recommendHead").addClass("scale"));
        }
    }

}
