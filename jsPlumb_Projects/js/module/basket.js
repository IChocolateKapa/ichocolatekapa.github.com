/**
 * Created by Echo on 2015/12/30.
 */


//闭包的运用
var  nodeBasket = (function () {
    var privateNodeList = [];

    return {
        addItem: function (item) {
            privateNodeList.push(item);
        },
        getItems: function () {
            return privateNodeList;
        },
        empty: function () {
            privateNodeList = [];
        }
    }
})();


//闭包的运用
var connectionBasket = (function () {
    var privateConnectionList = [];

    return {
        addItem: function (item) {
            privateConnectionList.push(item);
        },
        getItems: function () {
            return privateConnectionList;
        },
        empty: function () {
            privateConnectionList = [];
        }

    }
})();



