/**
 * Created by Echo on 2015/8/11.
 */

require.config({
    paths: {
        jquery: './jquery-2.1.3.min',
        foreSeeImage: './foreSeeImage'
    }
});


require(['jquery', 'foreSeeImage'], function($, fm){

    var fm = new fm.foreSeeImage();

    $(function(){

        $(".footerImg li").hover(function(){
            var index = $(this).index();
            $(".ListItem").removeClass("curr");
            $(".ListItem").eq(index).addClass("curr");
            $(this).addClass("curr");

            $(".ListItem.curr").hover(
                function(){
                    /*初始化一个预览容器，可以自定义样式*/
                    var $mask = fm.initZoomDiv($(".ListItem.curr"), {"pos": "right", "wh": 600});
                    $(".ListItem.curr").mousemove(function(){
                        /*根据鼠标滚动来预览图片*/
                        fm.showForeImage($(".ListItem.curr"), $mask);
                    })
                },
                function(){
                    /*清除预览图片的容器*/
                    fm.deleteZoomDiv();
                }
            )
        })

    })

})

