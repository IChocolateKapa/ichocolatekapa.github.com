/**
 * Created by Administrator on 2015/8/7.
 */

define(['jquery', 'mapIndex'], function ($, mp) {

    GLOBAL_MapParams.addrId = "address";
    GLOBAL_MapParams.mapId = "mapCanvas";


    var init = new mp.init();
    google.maps.event.addDomListener(window, 'load', function(){
        init.initialize(true);
    });

})

function searchKeyPress(event){
    eventUtil.enterKeyPress(event, function(){
        MAP.codeAddress(GLOBAL_MapParams.geocoder, GLOBAL_MapParams.map, GLOBAL_MapParams.addrId);
    });
}