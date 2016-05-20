/**
 * Created by Echo on 2016/1/5.
 */


var jsPmbUtil = {

    getInstance: function () {
        var instance = jsPlumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
            //Connector: "Straight",
            Connector: "Flowchart",
            //Connector: "StateMachine",
            //Connector: "Bezier",
            HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2},
            ConnectionOverlays: [
                [ "Arrow", {
                    location: .9,
                    id: "arrow",
                    length: 14,
                    foldback: 0.8
                } ]
                /*[ "Label", { label: "FOO", id: "label", cssClass: "aLabel" }]*/
            ],
            Container: canvasID
        });

        return instance;
    },

    initNode: function(instance, el) {

        var self = this;

        // initialise draggable elements.
        instance.draggable(el/*, {
            "containment": "parent"
        }*/);

        /*Echo Added*/
        //instance.setSourceEnabled(el);

        /**
         * let's take a quick look at the parameter 'filter', here is its definition:
         * Specifying drag source area
         * Configuring an element to be an entire Connection source using makeSource means that the element cannot itself be draggable.
         * There would be no way for jsPlumb to distinguish between the user attempting to drag the element and attempting to drag a Connection from the element.
         * To handle this there is the filter parameter.
         *
         * To sum up, 如果一个节点作为可拖动的连接起点，想要从任意地方都能拖出连接， 是不可能的，要么，这个source节点本身不可拖动，
         * 要么， 通过filter 属性指定 从这个节点里某个位置拖连接线。当然你可以把这个节点的样式设置的不那么明显
         * */

        var curDomId = $(el).attr("id"),
            demoData = JSON.parse(window.localStorage["demoData"]),
            props = demoData[curDomId];

        instance.makeSource(el, {
            dropOptions: {hoverClass: "dragHover"},
            filter: ".ep.btm",//从epdiv中作为拖动连接起点
            connectorStyle: {strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4},
            connectionType:"basic",
            extract:{
                "action":"the-action"
            },
            parameters: props,
            maxConnections: -1,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        instance.makeTarget(el, {
            dropOptions: {hoverClass: "dragHover"},
            anchor: "Top",
            //anchor: "Continuous",
            allowLoopback: false,//true
            parameters: props,
            //endpoint: ["Dot", {radius: 5, cssClass:"small-blue"}]
        });


        /**
         * 给新添加的节点绑定 点击 事件
         * */
        instance.off(el, "click");
        instance.on(el, "click", function (event) {
            //注意在建立连接完成时也会触发这个事件
            //console.log("click node target: ", eventUtil.getTarget(event));
            eventUtil.stopPropagation(event);
            eventUtil.preventDefault(event);
        });
        /**
         * 给新添加的节点添加绑定事件
         * */
        instance.off(el, "dblclick");
        /*双击节点*/
        instance.on(el, "dblclick", function (event) {
            //注意在建立连接完成时也会触发这个事件
            //console.log(event.target);
            $(el).find('.reName').show().focus().val($(el).find('.stateName').html())
                .keypress(function (event) {
                    if (event.keyCode == 13) {
                        $(el).find('.stateName').html(this.value);
                        $(this).hide();
                    }
                }
            );
            /*console.log("dblclick node target: ", eventUtil.getTarget(event));
            var ret = confirm("要设置这个节点为程序运行起点吗？");
            if (ret) {
                /!*设置起点*!/
                $(el).addClass("start");
            }*/
            //var ret = confirm("确实要删除这个节点吗？");
            //if (ret) {
            //    /*节点删除*/
            //    instance.remove(el);
            //}
            /*阻止冒泡和默认行为*/
            eventUtil.stopPropagation();
            eventUtil.preventDefault();
        });

        // this is not part of the core demo functionality;
        // it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        instance.fire("jsPlumbDemoNodeAdded", el);


        //self.addRectToMap(el);
    },

    addNode: function (instance, config) {

        var offsetLeft = config.left,
            offsetTop = config.top,
            isReload = config.isReload || false,
            id = config.mid || jsPlumbUtil.uuid(),
            text = config.text || id.substring(0, 7);

        var d = document.createElement("div");
        d.className = "w";
        d.id = id;

        var state = "<input type='text' placeholder='输入节点名称' class='stateName' value='" + text + "'/>";
        $(state).focus();
        $(state).keyup(function(e) {
            if (e.keyCode === 13) {
                //console.log("this.value: ", this.value);
                $(this).parent().text(this.value);
            }
        });
        d.innerHTML =  "<div class=\"ep\">" + state + "</div>";


        if (isReload) {
            d.style.left = offsetLeft + "px";
            d.style.top = offsetTop + "px";
        } else {
            /*获取此时canvas距离container的位移*/
            var posY = $("#canvas").position().top,
                posX = $("#canvas").position().left;

            d.style.left = offsetLeft - posX + "px";
            d.style.top = offsetTop - posY + "px";
        }

        ///*can't figure out why there is a minus Pos......*/

        instance.getContainer().appendChild(d);
        this.initNode(instance, d);
        return d;
    },

    getAllNodes: function (instance) {
        /*获取所有节点*/
        var nodeList = instance.getSelector(".w");

        console.log(nodeList);

        for (var i = 0; i < nodeList.length; i++) {
            var elHeight = $(nodeList[i]).offsetHeight,
                elWidth = nodeList[i].offsetWidth,
                elTop = nodeList[i].offsetTop,
                elLeft = nodeList[i].offsetLeft,
                id = nodeList[i].id,
                text = nodeList[i].innerText,//新建的节点：$(nodeList[0]).find(".stateName").val()
                elProps = {};

            console.log("text: ", text);

            elProps = {
                width: elWidth,
                height: elHeight,
                top: elTop,
                left: elLeft,
                mid: id,
                text: text
            };
            //nodeBasket.addItem(nodeList[i]);
            nodeBasket.addItem(elProps);
        }
        return this;
    },

    getAllConnections: function (instance) {
        //获取所有连接
        var connectionList = instance.getConnections();
        for (var j = 0; j < connectionList.length; j++) {
            var conn = {
                source: connectionList[j].source.id,
                target: connectionList[j].target.id
            };
            //connectionBasket.addItem(connectionList[j]);
            connectionBasket.addItem(conn);
        }
        return this;
    },

    removeAllConnections: function (instance) {
        instance.detachEveryConnection();
        return this;
    },

    removeAllNodes: function (instance) {

        var allNodes = instance.getSelector(".w"),
            leng = allNodes.length;

        for (var k = 0; k < leng; k++) {
            instance.remove(allNodes[k]);
        }

        return this;
    },

    getNextNode: function (instance, $startNode) {
        $startNode.addClass("loading");
        var jpStartID = $startNode.attr("id"),
            $nextNode = "undefined";

        /*取出所有连接， 进行匹配，connection的source的id与jpStart的ID匹配成功的就继续后面*/
        this.getAllConnections(instance);
        var links = connectionBasket.getItems();

        for (var j = 0; j < links.length; j++) {
            if (links[j].source == jpStartID) {
                $nextNode = $("#canvas #" + links[j].target);
            }
        }

        connectionBasket.empty();

        return $nextNode;
    },

    saveGragh: function (instance) {
        /*获取所有节点  连接*/
        this.getAllNodes(instance)
            .getAllConnections(instance);

        var sampleHtml = '<div class="left_block" id="sample">'
                            + '<a href="javascript:void(0)">Sample</a>'
                        + '</div>';

        $(sampleHtml).appendTo($(".main_wrap_left")).css({'top': 200, 'left': 0});

        /*清空图表实例中链接和节点*/
        this.removeAllConnections(instance)
            .removeAllNodes(instance);

        /*暂时先清空*/
        $("#canvas").empty();
        console.log("in saving lists.length : ", connectionBasket.getItems().length);

    },

    reloadGragh: function (instance) {
        var nodes = nodeBasket.getItems(),
            links = connectionBasket.getItems();

        console.log("nodes.length : ", nodes.length);
        for (var i = 0; i < nodes.length; i++) {
            var newCreated = this.addNode(instance, $.extend(true, {'isReload': true}, nodes[i]));
            //this.initNode(instance, newCreated);
        }


        console.log("lists.length : ", links.length);
        /*batch自动*/
        instance.batch(function () {
            for (var j = 0; j < links.length; j++) {
                instance.connect({
                    source: links[j].source,
                    target: links[j].target,
                    //newConnection: true,
                    paintStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                    endpoint: ["Dot", {radius: 3, cssClass:"small-blue"}],
                    anchor: "Continuous",
                    connector:"Bezier",
                    overlays: [
                        ["Arrow", {
                            location: .9,
                            id: "arrow",
                            length: 14,
                            foldback: 0.8
                        }]
                    ],
                });
            }
        })


        nodeBasket.empty();
        connectionBasket.empty();
    },

    //设置缩放等级
    setContainerZoom: function (zoom, instance, transformOrigin, el) {

        console.log("before zoom, position.left: ", $("#canvas").position().left,  " position.top: ", $("#canvas").position().top)

        var transformOrigin = transformOrigin || [ 0.5, 0.5],
            instance = instance || jsPlumb,
            el = el || instance.getContainer();

        var p = [ "webkit", "moz", "ms", "o" ],
            s = "scale(" + zoom + ")",
            oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

        for (var i = 0; i < p.length; i++) {
            el.style[p[i] + "Transform"] = s;
            el.style[p[i] + "TransformOrigin"] = oString;
        }

        el.style["transform"] = s;
        el.style["transformOrigin"] = oString;

        instance.setZoom(zoom, true);

        console.log("after zoom, position.left: ", $("#canvas").position().left,  " position.top: ", $("#canvas").position().top)

        this.updateMiniMap(instance, el, [transformOrigin[0], transformOrigin[1]]);
        //this.updateMiniMap(instance, el, [1-transformOrigin[0], 1-transformOrigin[1]]);

    },

    MouseWheelHandler: function (e, instance) {

        var isNext = eventUtil.getScrollDirection(e),
            curZoom = instance.getZoom(),
            self = this;

        var event = eventUtil.getEvent(e);

        var relativeX = event.pageX - $("#container").offset().left,
            relativeY = event.pageY - $("#container").offset().top;
/*        var relativeX = event.pageX - $("#canvas").offset().left,
            relativeY = event.pageY = $("#canvas").offset().top;*/

        var perX = relativeX * curZoom / $("#canvas").width() * curZoom,
            perY = relativeY / $("#canvas").height();
        //var perX = relativeX * curZoom,
        //    perY = relativeY * curZoom;
        //var perX = relativeX / $("#canvas").width()*curZoom,
        //    perY = relativeY / $("#canvas").height()*curZoom;
        //var perX = 1 - relativeX / $("#canvas").width(),
        //    perY = 1 - relativeY / $("#canvas").height();



        console.log("before zooming, curZoom is : ", instance.getZoom());

        console.log("perX, perY: ", perX, ", ", perY);
        /*不能再缩小了...要不看不见了*/
        if (curZoom < 0.1) {
            return;
        }
        if (isNext) {//[curZoom, curZoom][perX, perY]
            self.setContainerZoom(curZoom - 0.1, instance, curZoom, $canvas[0]);
        } else {
            self.setContainerZoom(curZoom + 0.1, instance, curZoom, $canvas[0]);
        }

        console.log("after zooming, curZoom is : ", instance.getZoom());
    },



    /**
     * Echo Added -- begin -- 2015.12.29
     * 要实现元素的拖动， 必须该元素的定位是absolute, 并且其父元素是relative定位
     * 不谈， 即使设置了draggable方法， 元素也是没有拖动反应的
     * */
    /**
     * Echo Added -- begin -- 2015.12.29 : add Jquery ui method into jsPlumb.ready
     * */
    initDragDropElements: function (instance) {

        var self = this;

        //鼠标左键按住 拖动整个画面的这个功能， 不必要。 因为， 有了miniMap
        //$("#canvas").draggable();
        //同时， 要给container加上mousemove的事件监听

        $(".main_wrap_left .left_block").draggable({
            appendTo: "#"+canvasID,
            helper: "clone",
            zIndex: 10000,
            opacity: 0.8,
            start: function (event, ui) {
            },
            drag: function (event , ui) {
                var t = event.pageY,
                    l = event.pageX,
                    ss = "top: " + t + ", left: " + l;
                $("#panel").html(ss);
            }
        });


        /**
         * canvas本应也有drop事件， 但是太小， 事件不会触发
         * 故只写container的drop事件即可
         * */
        $("#container").droppable({
            hoverClass: "hover-class-test",
            accept: ".main_wrap_left .left_block",
            drop: function(event, ui) {

                var $Item =  ui.draggable;
                var $itemClone = $Item.clone().addClass("w"),
                    itemCloneId = $itemClone.attr("id");

                /*不能重复添加同一个节点*/
                if ($("#canvas #" + itemCloneId).length > 0) {
                    return;
                }
                /*不能重复添加同一个节点*/



                //var t = event.offsetY,
                //    l = event.offsetX;
                /*如果容器有所拖动的话， 要减去容器与外层容器的位移量*/
                var t = event.pageY - event.offsetY - $("#canvas").position().top,
                    l = event.pageX - event.offsetX - $(".main_wrap_left").width() - $("#canvas").position().left;

                //要获取当前canvas的位置与container的距离

                $itemClone.css({"top": t, "left": l}).appendTo($("#canvas"));

                self.initNode(instance, $itemClone);
            }
        });

        /*var isDraw = true;
        if (isDraw) {
            this.drawRectWithMouseMove(instance);
        } else {
            this.zoomWithMouseMove(instance);
        }*/

        //右键画框选节点
        this.drawRectWithMouseMove(instance);
        //左键拖动
        this.zoomWithMouseMove(instance);
    },
    /**
     * 更新miniMap
     * 根据当前缩放级别，设置miniMap的相应缩放
     * 1. 要按比例，需要canvas的宽高知道后， 根据比例生成一个miniMap的组件， 不然组件位置无法控制
     * */
    updateMiniMap: function (instance, ele, transformOrigin, isNew) {

        var curZoom = instance.getZoom();
        var transOrg = transformOrigin || [0.5, 0.5];
        var oString = (transOrg[0] * 100) + "% " + (transOrg[1] * 100) + "%";

        var setZ = 1/curZoom;

        $("#dragRect").css({
            "transform": "scale("+setZ+")",
            "-webkit-transform": "scale("+setZ+")",
            "-moz-transform": "scale("+setZ+")",
            "ms-transform": "scale("+setZ+")",
            "transform-origin": oString,
            "-webkit-transform-origin": oString,
            "-moz-transform-origin": oString,
            "-ms-transform-origin": oString,
        })
    },

    addRectToMap: function (el) {
        var eleH = $(el).height(),
            eleW = $(el).width(),
            elPosX = $(el).position().left,
            elPosY = $(el).position().top;

        var newRect = "<div class='rect'></div>";
        $(newRect).css({
            'position': 'absolute',
            'width': eleW * scale + "px",
            'height': eleH * scale + "px",
            'top': elPosY * scale + "px",
            'left': elPosX * scale + "px"
        }).appendTo($("#mapPanel"));

        var event = eventUtil.getEvent();
        var orgX, orgY;
        $(el).draggable({
            start: function (event, ui) {
                orgX = event.pageX;
                orgY = event.pageY;
                console.log("oooooooxx: ", orgX);
                console.log("oooooooy: ", orgY);
            },
            drag: function (event , ui) {
                var t = event.pageY,
                    l = event.pageX,
                    ss = "top: " + t + ", left: " + l;

                var moveX = (t - orgY) * scale + $(newRect).position().left,
                    moveY = (l - orgX) * scale + $(newRect).position().top;
                console.log("mmmmmmx: ", moveX);
                console.log("mmmmyyyy: ", moveY);

                $("#panel").html(ss);
                $(newRect).css({
                    'transform': 'translate(' + moveX + 'px, ' + moveY + 'px)',
                    '-webkit-transform': 'translate(' + moveX + 'px, ' + moveY + 'px)',
                    '-moz-transform': 'translate(' + moveX + 'px, ' + moveY + 'px)'
                })
            }
        })
    },


    drawRectWithMouseMove: function (instance) {

        var self = this;

        document.oncontextmenu = function() {return false;};

        $("#container").on('mousedown', function (e) {

            var event = eventUtil.getEvent(e);

            if(event.button == 2) {
                var flag = true;

                var startTime = new Date() * 1;

                var event = eventUtil.getEvent(e),
                    orgPosX = event.pageX,
                    orgPosY = event.pageY,
                    orgMpx = orgPosX - $("#container").offset().left,
                    orgMpy = orgPosY - $("#container").offset().top;

                var clickTarget = eventUtil.getTarget(e);
                if ($(clickTarget).attr('id') !== "container") {
                    return;
                }

                $("#container").addClass("isMove");

                var $moveRect = $('<div class="moveRect"></div>');
                $moveRect.css({
                    'top': orgMpy + "px",
                    'left': orgMpx + "px"
                }).appendTo($("#container"));


                $("#container").on('mousemove', function (e) {

                    $(".w").removeClass("highlight");

                    var event2 = eventUtil.getEvent(e),
                        curPosX = event2.pageX,
                        curPosY = event2.pageY;

                    var moveX = curPosX - orgPosX,
                        moveY = curPosY - orgPosY;


                    $moveRect.css({
                        'height': Math.abs(moveY) + "px",
                        'width': Math.abs(moveX) + "px"
                    });

                    if (moveX < 0 ) {
                        var rt = $("#container").width() - orgMpx;
                        $moveRect.css({
                            'left': '',
                            'right': rt + "px"
                        })
                    }
                    if (moveY < 0) {
                        var bt = $("#container").height() - orgMpy;
                        $moveRect.css({
                            'top': '',
                            'bottom': bt + "px"
                        })
                    }
                    if (moveX > 0) {
                        $moveRect.css({
                            'right': '',
                            'left': orgMpx + "px"
                        })
                    }

                    if (moveY > 0) {
                        $moveRect.css({
                            'bottom': '',
                            'top': orgMpy + "px"
                        })
                    }
                });

                $("#container").on('mouseup', function (e) {

                    var endTime = new Date() * 1;

                    /*if ((endTime - startTime) < 300) {
                     $moveRect.remove();
                     return;
                     }*/

                    if (flag) {
                        $("#container").off("mousemove").removeClass("isMove");

                        var rectBoundary = self.getRectBoundary($moveRect);


                        var nodeList = instance.getSelector(".w"),
                            nodes = [];

                        for (var i = 0; i < nodeList.length; i++) {
                            var nodePosX = nodeList[i].offsetLeft,
                                nodePosY = nodeList[i].offsetTop,
                                nodeHeight = nodeList[i].offsetHeight,
                                nodeWidth = nodeList[i].offsetWidth;

                            if (nodePosX < rectBoundary.top_left.left
                                || nodePosX > rectBoundary.top_right.left
                                || nodePosY < rectBoundary.top_left.top
                                || nodePosY > rectBoundary.bottom_left.top) {

                                console.log("not in my zone!");

                            } else {
                                if ((nodePosX + nodeWidth) < rectBoundary.top_right.left
                                    && (nodePosY + nodeHeight) < rectBoundary.bottom_right.top) {

                                    $(nodeList[i]).addClass("highlight");
                                    //再进行后续操作
                                    nodes.push(nodeList[i]);
                                }
                            }
                        }


                        $(".propsContent").empty();
                        for (var j = 0; j < nodes.length; j++) {

                            /*Echo Added 2016.01.19 -- begin --*/
                            if ($(".prosPanel").is(":hidden")) {
                                $(".prosPanel").show();
                            }
                            var curDomId = $(nodes[j]).attr("id"),
                                demoData = JSON.parse(window.localStorage["demoData"]),
                                props = demoData[curDomId];

                            for (var prop in props) {
                                $(".propsContent").append("<br>" + prop + " : " + props[prop] + "<br>");
                            }
                            /*Echo Added 2016.01.19 -- begin --*/

                        }

                        $moveRect.remove();

                        flag = false;
                    }

                });
            }

        });

    },

    getRectBoundary: function ($rect) {
        var tp = $rect.position().top,
            lt = $rect.position().left,
            rh = $rect.height(),
            rw = $rect.width();

        /*左上角点的坐标*/
        var top_left = {};
        top_left.left = lt;
        top_left.top = tp;

        /*右上角点的坐标*/
        var top_right = {};
        top_right.left = lt + rw;
        top_right.top = tp;

        /*左下角点的坐标*/
        var bottom_left = {};
        bottom_left.left = lt;
        bottom_left.top = tp + rh;

        /*右下角点的坐标*/
        var bottom_right = {};
        bottom_right.left = lt + rw;
        bottom_right.top = tp + rh;

        return {
            'top_left': top_left,
            'top_right': top_right,
            'bottom_left': bottom_left,
            'bottom_right': bottom_right,
            'height': $rect.height(),
            'width': $rect.width()
        }
    },

    isInContainer: function ($rectOpt, nodeOpt) {


    },

    zoomWithMouseMove: function (instance) {
        $("#container").on('mousedown', function (e) {

            if (e.button == 0) {
                var curZoom = instance.getZoom();
                var event = eventUtil.getEvent(e),
                    orgPosX = event.pageX,
                    orgPosY = event.pageY;

                //记下初始元素位置
                //bug: zoom后元素的位置不稳定
                //fix: zoom transformOrigin不正确， 修改为 "left top"即可
                var elePosX = $("#canvas").position().left,
                    elePosY = $("#canvas").position().top;


                $("#container").on('mousemove', function (e) {

                    var event2 = eventUtil.getEvent(e),
                        curPosX = event2.pageX,
                        curPosY = event2.pageY;

                    var moveX = curPosX - orgPosX,
                        moveY = curPosY - orgPosY,
                        disX = elePosX + moveX,
                        disY = elePosY + moveY;


                    (function () {
                        /**
                         * transformOrigin非常重要非常重要非常重要
                         * */
                        $("#canvas").css({
                            "transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                            "-webkit-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                            "-moz-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                            "-ms-transform": "translate(" + disX + "px, " + disY + "px) scale(" + curZoom + ")",
                            "transform-origin": "left top",
                            "-webkit-transform-origin": "left top",
                            "-moz-transform-origin": "left top",
                            "-ms-transform-origin": "left top"
                        });

                        //miniMap的拖块也要相应位移
                        /* var rectPosX = $("#dragRect").position().left,
                         rectPosY = $("#dragRect").position().top,
                         curelePosX = $("#canvas").position().left,
                         curelePosY = $("#canvas").position().top,*/
                        //disXScale = rectPosX + moveX,
                        //disYScale = rectPosY + moveY;
                        //disXScale = disX*scale,
                        //disYScale = disY*scale;
                        /*            disXScale = -curelePosX*scale,
                         disYScale = -curelePosX*scale;*/
                        //disXScale = rectPosX - moveX*scale,
                        //disYScale = rectPosY - moveY*scale;

                        //console.log("disXScale=",disXScale, ", disYScale=", disYScale);

                        /*$("#dragRect").css({
                         "transform": "translate(-" + disXScale + "px, -" + disYScale + "px)",
                         "-webkit-transform": "translate(-" + disXScale + "px, -" + disYScale + "px)",
                         "-moz-transform": "translate(-" + disXScale + "px, " + disYScale + "px)",
                         "-ms-transform": "translate(-" + disXScale + "px, -" + disYScale + "px)",
                         });*/

                        /*$("#dragRect").css({
                         "top": disYScale + "px",
                         "left": disXScale + "px"
                         })*/

                    })();


                });

                $("#container").on('mouseup',function (e) {
                    $("#container").off('mousemove');
                });
            }

        });
    },

    getNewProName: function () {
        var curD = new Date();
        var year = curD.getFullYear(),
            month = (curD.getMonth() + 1) > 9 ? curD.getMonth() + 1 : '0' + (curD.getMonth() + 1),
            day = curD.getDate();


        return ('我的实验-' + year + month + day);
    }
};