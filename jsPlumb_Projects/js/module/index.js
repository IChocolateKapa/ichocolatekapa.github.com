/**
 * Created by Echo on 2015/12/28.
 */

var containerID = "container",
    canvasID = "canvas",
    $canvas = $("#"+canvasID),
    $container = $("#"+containerID);

var scale = 0.25;

var instance;
jsPlumb.ready(function () {

    var container = document.getElementById("container");

    // setup some defaults for jsPlumb.
    instance = jsPmbUtil.getInstance();


    /*拖拽初始化*/
    jsPmbUtil.initDragDropElements(instance);


    /**
     * Task 2: 缩略图的展示 --hard
     * */

    /**
     * save this gragh 2015.12.30. --
     * */
    $("#save_gragh").click(function () {
        jsPmbUtil.saveGragh(instance);
    });

    //reload stupid enough...
    $(".main_wrap_left").on("click", ".left_block#sample", function () {
        jsPmbUtil.reloadGragh(instance);
    });


    /**
     * 鼠标滚轮滚动时进行缩放 --暂时禁掉缩放功能
     * 在容器中需要取消鼠标滚轮的事件冒泡
     * */
    /*$("#container").on("mousewheel DOMMouseScroll", function (e) {
        eventUtil.stopPropagation(e);
        jsPmbUtil.MouseWheelHandler(e, instance);
    });*/


    // bind click listener; delete connections on click
    /*instance.bind("click", function (conn) {
        /!*删除连接*!/
        instance.detach(conn);
        eventUtil.stopPropagation();
        eventUtil.preventDefault();
    });*/

    //bind before drop event
    /*instance.bind("beforeDrop", function (info) {
        console.log("beforeDrop, info is: ", info);
        var ret = confirm("确定建立连接？");
        return ret;
    });*/

    //bind connection listener..
    /*instance.bind("connection", function (info) {
        alert("connection info is : ", info);
    })*/

    // bind right-click listener;
   /* instance.bind("contextmenu", function (conn) {
        /!*删除连接*!/
        alert("right click on connection: ", conn);
        eventUtil.stopPropagation();
        eventUtil.preventDefault();
    });*/

    /**
     * 双击删除连接， 但是这样会触发双击 增加节点 的事件， 即使阻止冒泡，也没有解决
     * 暂时解决办法是： 给连接绑单击事件， 不与最上层容器的双击事件冒泡冲突
     * 故下面这段先注释掉，
     * --2016.01.19由于双击不再增加新节点，故此事件放开
     * */
    instance.bind("dblclick", function (conn) {
        /*删除连接*/
        instance.detach(conn);
        eventUtil.stopPropagation();
        eventUtil.preventDefault();
    });

    // bind beforeDetach interceptor: will be fired when the click handler above calls detach, and the user
    // will be prompted to confirm deletion.
    instance.bind("beforeDetach", function (conn) {
        var ret = confirm("Delete connection?");
        eventUtil.stopPropagation();
        eventUtil.preventDefault();
        return ret;
    });


    /*双击添加新节点*/
    /*jsPlumb.on(container, "dblclick", function (e) {
        jsPmbUtil.addNode(instance, {
            'left': e.offsetX,
            'top': e.offsetY
        });
        eventUtil.preventDefault(e);
        eventUtil.stopPropagation(e);

    });
*/




    //设置连接完成时，响应的事件
    /*instance.bind("beforeDrop", function (conn) {
        //alert("hahah");
    });*/

    //设置连接完成时，响应的事件
    instance.bind("connectionDragStop", function (conn) {
        //conn是当前的具体连接， 能够获取连接的source target
        console.log("drag Done!");
        console.log("conn parameters： ", conn.getParameter());

        eventUtil.preventDefault();
        eventUtil.stopPropagation();
    });


    jsPlumb.fire("jsPlumbDemoLoaded", instance);

    var orgPosX, orgPosY, elePosX, elePosY;
    $("#dragRect").draggable({
        start: function (event) {
            orgPosX = event.pageX;
            orgPosY = event.pageY;

            elePosX = $("#canvas").position().left;
            elePosY = $("#canvas").position().top;

            console.log("拖动起始点坐标是： (", orgPosX, ", ", orgPosY, ")");

        },
        drag: function (event , ui) {

            console.log("拖动过程中能不能记起起始点坐标是： (", orgPosX, ", ", orgPosY, ")");

            var realPosY = event.pageY,
                realPosX = event.pageX;

            var moveX = realPosX - orgPosX,
                moveY = realPosY - orgPosY;

            var curZoom = instance.getZoom();

            console.log("实时移动的距离是：moveX=", moveX,  ", moveY=", moveY);



            var disX = elePosX - moveX/scale,
                disY = elePosY - moveY/scale;

            /**
             * transformOrigin非常重要非常重要非常重要
             * */
            $("#canvas").css({
                "transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                "-webkit-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                "-moz-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                "-ms-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                "transformOrigin": "left top",
                "-webkit-transformOrigin": "left top",
                "-moz-transformOrigin": "left top",
                "-ms-transformOrigin": "left top"
            });

        }
    });

});


/*右键部分*/
/*$(function () {
    document.oncontextmenu = function() {return false;};

    $("#container").mousedown(function(e){

        var event = eventUtil.getEvent(e);
        var ret;
        if(event.button == 2) {

            console.log('Right mouse button!');

            var curPosX = event.pageX,
                curPosY = event.pageY;

            $(".flyRect").fadeIn(500)
                        .animate({
                            'top': curPosY + "px",
                            'left': curPosX + "px"
                        });

            ret = false;
        } else {
            ret = true;
        }
        eventUtil.preventDefault(e);
        return ret;
    });

    $(document).click(function () {
        $(".flyRect").fadeOut(500);
    })
})*/


/*运行程序*/
$(function () {

    var total, $startNode, $nextNode;
    $("#run").click(function () {
        total = $(".w").length;
        run();
    });



    function callBackRunner (callback, $startNode) {

        $nextNode = jsPmbUtil.getNextNode(instance, $startNode);

        if ($nextNode == "undefined") {

            setTimeout(function () {
                $(".w").removeClass("start loading");
                $(".prosPanel").hide();
                alert("程序执行完毕");
            }, 1000)

        } else {

            $startNode.removeClass("start loading");
            $nextNode.addClass("start loading");

            $startNode = $(".w.start");
            $nextNode = jsPmbUtil.getNextNode(instance, $startNode);

            if (total < 0) {
                return;
            }
            callback();

            total--;
        }
    }


    function run () {

        $startNode = $(".w.start");

        if ($startNode.length == 0) {
            alert("请设定程序运行的起点！[双击节点即可选择设置]");
            return;
        }
        $startNode.addClass('loading');

        /*这段是具体针对每个当前节点的操作*/
        yourOpration($startNode);

        setTimeout(function () {
            callBackRunner(run, $startNode);
        }, 1000);
    }


    function yourOpration ($startNode) {

        if ($(".prosPanel").is(":hidden")) {
            $(".prosPanel").show();
        }
        var curDomId = $startNode.attr("id"),
            demoData = JSON.parse(window.localStorage["demoData"]),
            props = demoData[curDomId];

        $(".propsContent").empty();

        for (var prop in props) {
            $(".propsContent").append(prop + " : " + props[prop] + "<br>");
        }
    }
})
