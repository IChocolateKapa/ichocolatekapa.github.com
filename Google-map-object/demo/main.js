/**
 * Created by Echo on 2015/8/10.
 */

require.config({
    //baseUrl: "",
    paths: {
        jquery: '../js/lib/jquery-2.1.3.min',
        /*ǧ��ע�ⲻ�ܺ����.js��׺*/
        mapController: '../js/src/mapController',
        window: '../js/src/window',
        mapIndex: '../js/src/mapIndex'
    }
});


require(['jquery', 'window'], function($, w){
    $("#phone").click(function(){
        new w.window().alert("�ֻ���", "18612552963", {
                "width": 400,
                "height": 120,
                "x": '50%',
                "y": '20%'
            }
        );
    })
})



require(['jquery'], function($){
    $(window).resize(function(){
        var h = $(window).height()-$(".header").height() - 5;
        $(".content").height(h);
    })
})

require(["mapController"]);



require(['jquery', 'mapIndex', 'window'], function($, mp, w){
    //��̬������ͼ�߶�
    var h = $(window).height() - $(".header").height() - 3;
    $(".content").height(h);

    /*Ԥ��toggle*/
    $(".staylogin").click(function () {
        $("._chbx").toggleClass("_nologin");
    })

    var init = new mp.init();

    $("#_rect .staylogin").click(function () {
        init.foreSeeRectsMarkers();
    })

    $("#rectRow").change(function(){
        init.foreSeeRectsMarkers();
    })
    $("#rectColumn").change(function(){
        init.foreSeeRectsMarkers();
    })

    $("#_poly .staylogin").click(function () {
        init.foreSeePolysMarkers();
    })
    $("#polylineNum").change(function(){
        init.foreSeePolysMarkers();
    })

    /*�����ַת����Ӧλ��*/
    $("#search").click(function () {
        MAP.codeAddress(GLOBAL_MapParams.geocoder, GLOBAL_MapParams.map, GLOBAL_MapParams.addrId);
    })


    /*ˢ�µ�ͼ*/
    $("#refresh").click(function () {
        init.initialize(true);
        MAP.setCusMap(GLOBAL_MapParams.rectArray, GLOBAL_MapParams.map);
        MAP.setCusMap(GLOBAL_MapParams.polylineArray, GLOBAL_MapParams.map);
        MAP.setCusMap(GLOBAL_MapParams.markerArray, GLOBAL_MapParams.map);
    })


})