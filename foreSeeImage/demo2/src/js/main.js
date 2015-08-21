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
                    /*��ʼ��һ��Ԥ�������������Զ�����ʽ*/
                    var $mask = fm.initZoomDiv($(".ListItem.curr"), {"pos": "right", "wh": 600});
                    $(".ListItem.curr").mousemove(function(){
                        /*������������Ԥ��ͼƬ*/
                        fm.showForeImage($(".ListItem.curr"), $mask);
                    })
                },
                function(){
                    /*���Ԥ��ͼƬ������*/
                    fm.deleteZoomDiv();
                }
            )
        })

    })

})

