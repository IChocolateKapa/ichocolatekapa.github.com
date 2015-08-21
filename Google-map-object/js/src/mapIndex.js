/**
 * Created by Echo on 2015/8/10.
 */

define(['jquery'], function ($) {

    var init = function () {};

    init.prototype = {

        initialize: function (flag) {

            GLOBAL_MapParams.geocoder = MAP.initGeocoder();

            /*获取MapCenter*/
            var center = MAP.getMapLocation(MAP.getCenterLat(GLOBAL_MapParams.map), MAP.getCenterLng(GLOBAL_MapParams.map));


            try {
                var mapzoom = MAP.getMapZoom(GLOBAL_MapParams.map);
                throw "没有获得mzoom";
            } catch (error) {
                var mapzoom = GLOBAL_MapParams.mapZoom;
            }

            try {
                var maptype = MAP.getCurMapTypeId(GLOBAL_MapParams.map);
                throw "没有获得mtype";
            } catch (error) {
                var maptype = GLOBAL_MapParams.mapType;
            }

            var mapOptions = {
                zoom: mapzoom,
                center: center,
                mapTypId: maptype
            }

            GLOBAL_MapParams.map = MAP.initMap(GLOBAL_MapParams.mapId, mapOptions);

            /*如果要清空图像*/
            if (!flag) {
                GLOBAL_MapParams.rectArray = [];
                GLOBAL_MapParams.polylineArray = [];
                GLOBAL_MapParams.markerArray = [];
            } else {
                MAP.setCusMap(GLOBAL_MapParams.rectArray, GLOBAL_MapParams.map);
                MAP.setCusMap(GLOBAL_MapParams.polylineArray, GLOBAL_MapParams.map);
                MAP.setCusMap(GLOBAL_MapParams.markerArray, GLOBAL_MapParams.map);
            }


            /*drawingMode: google.maps.drawing.OverlayType.RECTANGLE,the following is how to set hand to be selected by default*/
            GLOBAL_MapParams.drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        google.maps.drawing.OverlayType.RECTANGLE,
                        //google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYLINE,
                        //google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.MARKER
                    ]
                },
                rectangleOptions: {
                    fillColor: "rgba(0, 176, 138, .7)",
                    fillOpacity: 0.8,
                    strokeColor: '#00b04a',
                    strokeWeight: 3,
                    draggable: true/*,
                     editable:　false*/
                },
                /*circleOptions: {
                 fillColor: "rgba(234, 45, 134, .6)",
                 strokeColor: "rgba(167, 200, 4, .9)",
                 draggable: true,
                 editable:　false
                 },*/
                polylineOptions: {
                    strokeColor: "rgba(0, 176, 138, .7)",
                    strokeWeight: 5,
                    draggable: true,
                    editable: false
                },
                markerOptions: {
                    //icon: 'static/image/1.jpg',
                    draggable: true
                }
            });

            GLOBAL_MapParams.drawingManager.setMap(GLOBAL_MapParams.map);

            google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'rectanglecomplete', function s(rectangle) {
                GLOBAL_MapParams.overlayArray.addToArray(GLOBAL_MapParams.rectArray, rectangle);
                $("#_poly").hide();
                $("#_rect").show();
                google.maps.event.addListener(rectangle, 'dblclick', function () {
                    var obj = this;
                    GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.rectArray, this);
                    if(GLOBAL_MapParams.rectArray.length == 0){
                        $("#_rect").hide();
                        if(obj.marray){
                            MAP.clearMarkers(obj.marray);
                            obj.marray = [];
                        }
                    }
                });
                GLOBAL_MapParams.drawingManager.setDrawingMode(null);
            });
            /*google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'circlecomplete', function s(circle) {
             GLOBAL_MapParams.overlayArray.addToArray(GLOBAL_MapParams.circleArray, circle);
             google.maps.event.addListener(circle, 'dblclick', function(){
             GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.circleArray, this);

             });
             GLOBAL_MapParams.drawingManager.setDrawingMode(null);
             });*/
            google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'markercomplete', function s(marker) {
                GLOBAL_MapParams.markerArray.push(marker);
                google.maps.event.addListener(marker, 'dblclick', function () {
                    GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.markerArray, this);
                });
                //GLOBAL_MapParams.drawingManager.setDrawingMode(null);

            });
            google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'polylinecomplete', function s(poly) {
                GLOBAL_MapParams.overlayArray.addToArray(GLOBAL_MapParams.polylineArray, poly);
                $("#_rect").hide();
                $("#_poly").show();
                google.maps.event.addListener(poly, 'dblclick', function () {
                    var obj = this;
                    GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.polylineArray, this);
                    if(GLOBAL_MapParams.polylineArray.length == 0){
                        $("#_poly").hide();
                        if(obj.markerList){
                            MAP.clearMarkers(obj.markerList);
                            obj.markerList = [];
                        }
                    }
                });
                GLOBAL_MapParams.drawingManager.setDrawingMode(null);
            });

        },

        foreSeeRectsMarkers: function(){
            /*预览布点效果*/
            var rect_row = $("#rectRow").val();
            var rect_col = $("#rectColumn").val();
            if(isNaN(rect_row) || isNaN(rect_col)){
                new w.window().alert("错误", "行和列需要输入数字!");
                return false;
            }


            if($("._chbx").hasClass("_nologin")){
                MAP.placeMarkerInRect(false, rect_col, rect_row, "rectgap_r", "rectgap_c");
            } else{
                MAP.placeMarkerInRect(true, rect_col, rect_row, "rectgap_r", "rectgap_c");

            }
        },

        foreSeePolysMarkers: function () {
            var n = $("#polylineNum").val();
            if(isNaN(n)){
                new w.window().alert("错误", "布点数目需要输入数字!");
                return false;
            }

            if($("._chbx").hasClass("_nologin")){
                MAP.placeMarkerInPolys(false, n, "plgap");
            } else {
                MAP.placeMarkerInPolys(true, n, "plgap");
            }

        }

    }

    return {
        "init": init
    }
})


