/**
 * Created by Administrator on 2015/8/3.
 */


/*
 一、事件流
 事件流描述的是从页面中接受事件的顺序。
 IE的事件流是事件冒泡流，而Netscape的事件流是事件捕获流
 1、事件冒泡
 事件冒泡，即事件最开始由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上转播至最不具体的节点(文档)。
 2、事件捕获
 事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件。
 二、事件处理程序
 1、HTML事件处理程序
 2、DOM0级事件处理程序
 3、DOM2级事件处理程序
 DOM2级事件定义了两个方法：用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。它们都接收三个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。
 4、IE事件处理程序
 attachEvent()添加事件
 detachEvent()删除事件
 这两个方法接收相同的两个参数：事件处理程序名称与事件处理函数
 5、跨浏览器的事件处理程序
 三、事件对象
 事件对象event
 1、DOM中的事件对象
 (1)、type:获取事件类型
 (2)、target：事件目标
 (3)、stopPropagation() 阻止事件冒泡
 (4)、preventDefault() 阻止事件的默认行为
 2、IE中的事件对象
 (1)、type:获取事件类型
 (2)、srcElement：事件目标
 (3)、cancelBubble=true阻止事件冒泡
 (4)、returnValue=false阻止事件的默认行为
*/

/*跨浏览器事件处理程序*/

var eventUtil = {
    /*绑定事件*/
    addHandler: function(element, type, method){
        if(element.addEventListener){
            element.addEventListener(type, method, false);
        } else if(element.attachEvent){
            element.attachEvent('on'+type, method);
        } else{
            /*Dom 0级事件处理程序*/
            /*js中，所有点号连接的事件处理程序都可以使用中括号来代替， 即：*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = method;
        }
    },
    /*删除绑定事件*/
    removeHandler: function(element, type, method){
        if(element.removeEventListener){
            element.removeEventListener(type, method, false);
        } else if(element.dettachEvent){
            element.dettachEvent('on'+type, method);
        } else{
            /*Dom 0级事件处理程序*/
            /*js中，所有点号连接的事件处理程序都可以使用中括号来代替， 即：*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = null;
        }
    },

    /*获取事件*/
    getEvent: function(event){
        return event?event:window.event;
    },

    /*获取事件类型*/
    getType: function(event){
        return event.type;
    },

    /*获取事件目标对象target*/
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    /*取消事件默认行为*/
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        } else{
            event.returnValue = false;
        }
    },

    /*取消事件冒泡*/
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else{
            event.cancelBubble = false;
        }
    },

    /*鼠标按下事件*/
    enterKeyPress: function(event, handler){
        event = this.getEvent(event);
        if(event.keyCode == 13){
            handler();
        } else{
            return false;
        }
    }


}

