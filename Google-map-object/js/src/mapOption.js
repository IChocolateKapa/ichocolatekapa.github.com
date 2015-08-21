/**
 * Created by Administrator on 2015/8/7.
 */

var GLOBAL_MapParams = {};
GLOBAL_MapParams.centerLat = 39.90403;
GLOBAL_MapParams.centerLng = 116.407526;
GLOBAL_MapParams.marker = null;
GLOBAL_MapParams.markerLat = GLOBAL_MapParams.centerLat;
GLOBAL_MapParams.markerLng = GLOBAL_MapParams.centerLng;
GLOBAL_MapParams.markerAddr = "北京";
GLOBAL_MapParams.mapZoom = 12.0;
GLOBAL_MapParams.mapType = google.maps.MapTypeId.ROADMAP;
GLOBAL_MapParams.rectArray = new Array();
GLOBAL_MapParams.circleArray = new Array();
GLOBAL_MapParams.polylineArray = new Array();
GLOBAL_MapParams.markerArray = new Array();

/*封装一个添加和删除的方法*/
GLOBAL_MapParams.overlayArray = {
    addToArray: function(arr, ele){
        arr.push(ele);
    },

    deleteFromArray: function(arr, ele){
        event.preventDefault();
        ele.setMap(null);
        arr.pop(ele);
    },

    highlight: function(ele){
        ele.fillColor = "red";
    }
};


var MAP = {

    /*初始地图定位对象*/
    initGeocoder: function(){
        var geo = new google.maps.Geocoder();
        return geo;
    },

    /*初始创建地图*/
    initMap: function(mapContainerId, mapOption){
        var map = new google.maps.Map(document.getElementById(mapContainerId), mapOption);
        return map;
    },

    /*通过经纬度设置地图点对象*/
    getMapLocation: function(lat, lng)
    {
        var latlng = new google.maps.LatLng(lat, lng);
        return latlng;
    },

    /*通过输入的地址将地图转到相应地点*/
    codeAddress: function(geocoder, map, addrId) {
        var address = this.getMarkerAddr(addrId);
        if(!address){
            return false;
        }

        geocoder.geocode({'address': address}, function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
    },
    /*获取地图缩放级别*/
    getMapZoom: function(map){
        try{
            var mapZoom = map.getZoom();
        } catch (error){
            var mapZoom = 12.0;
        }
        return mapZoom;
    },

    /*给地图设置缩放级别*/
    setMapZoom: function(map, n){
        map.setZoom(n);
    },

    /*获取地图类型的简称*/
    getMapType: function(map){
        var mapType = map.getMapTypeId(); //satellite,

        if (mapType == google.maps.MapTypeId.SATELLITE) {
            return 's';
        } else if (mapType == google.maps.MapTypeId.HYBRID){
            return 'h';
        } else if (mapType == google.maps.MapTypeId.TERRAIN){
            return 't';
        } else {
            return 'r';
        }
    },

    /*设置地图类型*/
    setMapType: function(map, mapType){
        if (mapType == 's' ||  mapType == "satellite") {
            map.setMapTypeId("satellite");
        } else if (mapType == 'h' || mapType == "hybrid"){
            map.setMapTypeId("hybrid");
        } else if (mapType == 't' || mapType == "terrain"){
            map.setMapTypeId("terrain");
        } else {
            map.setMapTypeId("roadmap");
        }
    },

    /*获取当前地图的类型ID*/
    getCurMapTypeId: function(map){
        try{
            var mapType = map.getMapTypeId(); //satellite,
        } catch (error){
            return google.maps.MapTypeId.ROADMAP;
        }

        if (mapType == "satellite") {
            return google.maps.MapTypeId.SATELLITE;
        } else if (mapType == "hybrid"){
            return google.maps.MapTypeId.HYBRID;
        } else if (mapType == "terrain"){
            return google.maps.MapTypeId.TERRAIN;
        } else {
            return google.maps.MapTypeId.ROADMAP;
        }
    },

    /*获取地图中心纬度*/
    getCenterLat: function(map) {
        try{
            var centerLat = map.getCenter().lat();
        } catch (err){
            var centerLat = GLOBAL_MapParams.centerLat;
        }
        return centerLat;
    },

    /*获取地图中心经度*/
    getCenterLng: function(map) {
        try{
            var centerLng = map.getCenter().lng();
        } catch (err){
            var centerLng = GLOBAL_MapParams.centerLng;
        }

        return centerLng;
    },

    /*获取地图中心经纬度*/
    getCenterLatLng: function(map) {
        try{
            var centerLat = map.getCenter().lat();
            var centerLng = map.getCenter().lng();

        } catch (error){
            var centerLat = GLOBAL_MapParams.centerLat;
            var centerLng = GLOBAL_MapParams.centerLng;
        }

        return [centerLat, centerLng];
    },

    /*获取地图上marker的纬度*/
    getMarkerLat: function(marker) {
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng));

        return WGS84loc[0];
    },
    /*获取地图上marker的纬度*/
    getMarkerLng: function(marker){
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng));

        return WGS84loc[1];
    },

    /*获取地图上marker的经纬度*/
    getMarkerLatLng: function(marker){
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng))

        return WGS84loc;
    },

    /*获取输入的地图地点名称*/
    getMarkerAddr: function(addrID) {
        //var markerAddr = $('#'+addrID).val();
        var markerAddr = document.getElementById(addrID).value;
        return markerAddr;
    },

    /*获取矩形的两个顶点*/
    getRectNESWLatLng: function(rect){
        var ne = rect.getBounds().getNorthEast();
        var sw = rect.getBounds().getSouthWest();

        /*矩形的对角顶点*/
        northeastlng = ne.lng();
        northeastlat  = ne.lat();
        southwestlng = sw.lng();
        southwestlat  = sw.lat();
        return [northeastlat, northeastlng, southwestlat, southwestlng];
    },

    /*设置map*/
    setCusMap: function(map, arr){
        for(var i = 0; i < arr.length; i++){
            arr[i].setMap(map);
        }
    },

    /*获取地图上亮点之间的距离*/
    getLocDistance: function(fir_lat, fir_lng, sec_lat, sec_lng){

        var distance = getDistance(fir_lat, fir_lng, sec_lat, sec_lng).toFixed(2);
        if(distance > 1000){
            distance = (distance/1000).toFixed(2) + "k";
        }
        return distance;
    },

    /*清除marker*/
    clearMarkers: function(arr){
        $(arr).each(function(index, mk){
            mk.setMap(null);
        })
    },
    /*清除矩形框*/
    clearRects: function(rects){
        $(rects).each(function(index, rect){
            rect.setMap(null);
        })
        rects = [];
    },

    /*清除折线*/
    clearPolys: function(polys){
        $(polys).each(function(index, poly){
            poly.setMap(null);
        })
        polys = [];
    },

    /*清除矩形框内点*/
    clearMarkerInRect: function(){
        /*因为要保证函数作用域，如果在each中再调用this.clearMarkers(),this会在each上层找，找不到*/
        var clearMarkr = this.clearMarkers;
        $(GLOBAL_MapParams.rectArray).each(function(index, rect){
            if(rect.marray){
                clearMarkr(rect.marray);
                rect.marray = [];
            }
        })
    },

    /*清除折线内点*/
    clearMarkerInPolys: function(){
        var clearMarkr = this.clearMarkers;
        $(GLOBAL_MapParams.polylineArray).each(function(index, poly){
            if(poly.markerList){
                clearMarkr(poly.markerList);
                poly.marray = [];
            }
        })
    },

    /*获取折线路径长度*/
    getCurPathDistance: function(pa_th){
        var sumdist = 0;
        //获得一条路径总长度
        for(var j = 0; j < pa_th.length - 1; j++){
            var belat = pa_th[j].lat();
            var belng = pa_th[j].lng();
            var enlat = pa_th[j+1].lat();
            var enlng = pa_th[j+1].lng();
            sumdist += Math.sqrt((belng - enlng)*(belng - enlng) + (belat - enlat)*(belat - enlat));
        }

        return sumdist;
    },

    /*平均分布矩形点*/
    placeMarkerInRect: function(flag, rect_col, rect_row, gapId_Row, gapId_Col){

        this.clearMarkerInRect();
        /*不预览就返回*/
        if(!flag){
            return false;
        }

        var getLocation = this.getMapLocation;

        var getLocDistance = this.getLocDistance;

        $(GLOBAL_MapParams.rectArray).each(function(index, rect){

            var locArray = new Array();

            /*矩形的对角顶点*/
            var latlngArr = MAP.getRectNESWLatLng(rect);
            var northeastlat= latlngArr[0];
            var northeastlng  = latlngArr[1];
            var southwestlat= latlngArr[2];
            var southwestlng  = latlngArr[3];

            if((rect_col == "0" || rect_col == "1") && (rect_row == "0" || rect_row == "1")){
                $("#"+gapId_Row).text("0米");
                $("#"+gapId_Col).text("0米");
            } else{
                //更新文字间距
                var lng_gap = getLocDistance(northeastlat, northeastlng, northeastlat, southwestlng);
                var lat_gap = getLocDistance(northeastlat, northeastlng, southwestlat, northeastlng);

                $("#"+gapId_Row).text(lng_gap+"m");
                $("#"+gapId_Col).text(lat_gap+"m");

            }



            /*求出矩形的长宽*/
            /*(nelng, nelat), (swlng, swlat)*/
            //两点之间的距离：.....so stupid, 求两点间距干什么。。
            //var d = Math.sqrt((nelng - swlng)*(nelng - swlng) + (nelat - swlat)*(nelat - swlat))
            var rect_w = Math.abs(northeastlng - southwestlng);
            var rect_h = Math.abs(northeastlat - southwestlat);
            var n_w = rect_w / (parseInt(rect_col) - 1);
            var n_h = rect_h / (parseInt(rect_row) - 1);

            var mlat;
            var mlng;
            var loc;
            for (var j = 0; j < rect_row; j++){
                mlat = northeastlat - j * n_h;
                for(var k = 0; k < rect_col; k++){
                    mlng = southwestlng + k * n_w;
                    loc = getLocation(mlat, mlng);

                    WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(mlat),parseFloat(mlng))

                    var mkr = new google.maps.Marker({
                        position: loc,
                        map: GLOBAL_MapParams.map,
                        title: WGS84loc.toString(),
                        draggable:true
                    });

                    locArray.push(mkr);//这个矩形所包含的点数

                    google.maps.event.addListener(mkr, 'dblclick', function(){
                        GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.polylineArray, this);
                    });

                }
            }
            rect.marray = locArray;
        })
    },


    /*折线图平均布点*/
    placeMarkerInPolys: function(flag, n, gapId){

        this.clearMarkerInPolys();
        /*不预览就返回*/
        if(!flag){
            return false;
        }

        var getLocation = this.getMapLocation;

        var getLocDistance = this.getLocDistance;

        var getPathDistance = this.getCurPathDistance;


        $(GLOBAL_MapParams.polylineArray).each(function(index, poly){

            var pa_th = poly.getPath().getArray();

            //求得当前路径的总长度
            var sumdist = getPathDistance(pa_th);
            var each_d = sumdist / (parseInt(n) - 1);

            locArray_ply = new Array();


            var d_sp = 0;//每条折线的长度 与 该条折线放上点后剩余的长度的差值

            //遍历该路径中所有折线
            for(var j = 0; j < pa_th.length - 1; j++){
                //当前折线两端的点坐标
                var belat = pa_th[j].lat();
                var belng = pa_th[j].lng();

                var enlat = pa_th[j+1].lat();
                var enlng = pa_th[j+1].lng();

                var kl = j+1;


                //当前折线的长度
                var d_bline = Math.sqrt((belng - enlng)*(belng - enlng) + (belat - enlat)*(belat - enlat));
                var d_be = d_bline + d_sp;


                //每条折线上能放的点的个数
                var dot_n = Math.floor(d_be / each_d);

                if(j == 0){
                    dot_n += 1;
                }

                var diflat = belat - enlat;
                var diflng = belng - enlng; //正负皆有可能

                var sum = 0;

                var mloc;

                //给每条折线放置点
                for(var k = 0; k < dot_n; k++){

                    if(locArray_ply.length == parseInt(n)){
                        break;
                    }


                    if(j == 0){
                        sum =  k * each_d - d_sp;
                    } else {
                        sum = (k+1) * each_d - d_sp;
                    }



                    var mlat = belat - (sum / d_be) * diflat;
                    var mlng = belng - (sum / d_be) * diflng;


                    mloc = getLocation(mlat, mlng);

                    WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(mlat),parseFloat(mlng));

                    var mkr = new google.maps.Marker({
                        position: mloc,
                        map: GLOBAL_MapParams.map,
                        title: WGS84loc.toString(),
                        draggable:true
                    });

                    locArray_ply.push(mkr);//当前路径所包含的点数
                    poly.markerList = locArray_ply;

                    google.maps.event.addListener(mkr, 'dblclick', function(){
                        GLOBAL_MapParams.overlayArray.deleteFromArray(GLOBAL_MapParams.markerArray, this);
                    });

                }

                //当前折线布完点后剩余的距离,应该用当前折线实际的长度减去布完点的长度
                d_sp = d_bline - ((dot_n-1) * each_d);
            }

            //计算点之间的间距：
            // 布点的第一个点
            var fir_lat = locArray_ply[0].position.lat();
            var fir_lng = locArray_ply[0].position.lng();

            //获取布点的第二个点
            var sec_lat = locArray_ply[1].position.lat();
            var sec_lng = locArray_ply[1].position.lng();

            var distance = getLocDistance(fir_lat, fir_lng, sec_lat, sec_lng);

            $("#"+gapId).text(distance+"m");
        })
    }


}


