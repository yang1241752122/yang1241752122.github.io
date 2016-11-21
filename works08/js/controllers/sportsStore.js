/**
 * Created by hxsd on 2016/8/25.
 *
 * 在主模块中注册一个顶级的控制器。（控制器是可以嵌套的）
 * 在这个顶级控制器中，主要用来获取整个项目都会用到的数据，比如：商品信息，订单信息，等等
 */
// 不带[]的方式，是引用模块；如果带了[]，是定义一个模块。
angular.module("sportsStore").controller("sportsStoreCtrl",function($scope,shopCart,$http,$location){
    // 声明商品数据
    $scope.data = {
        // 商品的类别
        categroies:[
            {id:"10001",category:"商品类别01"},
            {id:"10002",category:"商品类别02"},
            {id:"10003",category:"商品类别03"},
            {id:"10004",category:"商品类别04"}
        ],
        // 商品的明细
        products:[
            {name:"火星商品01",category:"商品类别01",price:100,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品02",category:"商品类别01",price:120,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品0301",category:"商品类别01",price:80,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"火星商品0302",category:"商品类别01",price:85,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"火星商品0303",category:"商品类别01",price:820,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品04",category:"商品类别02",price:180,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品05",category:"商品类别02",price:650,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"火星商品06",category:"商品类别02",price:350,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"火星商品07",category:"商品类别03",price:300,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品08",category:"商品类别03",price:310,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品09",category:"商品类别04",price:270,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"}
        ],
        // 收货人信息
        shipping:{}
    };

    // 发送订单到服务器的方法
    $scope.sendOrder = function(){
        // 发送的数据由两部分组成：1)购物车中的商品；2）收货人信息
        // 使用angular.copy()工具方法，拷贝一个收货人信息的副本(不破坏原始收货人数据)
        var orderData = angular.copy($scope.data.shipping);
        orderData.products = shopCart.findAll();

        // 通过http的post方法，将数据发往服务器端
        // post(url,data)
        $http.post("order.json",orderData).success(function(responseData){
            // 如果服务器成功处理了订单，会发送回一个唯一的订单号
            // 将返回的订单号保存到$scope中，稍后在thank you页面中显示该订单号
            $scope.data.shipping.orderId = responseData.orderId;
            // 清空购物车
            shopCart.clear();
        }).error(function(errText,errStatus){
            // 将错误信息和状态码保存起来
            $scope.data.shipping.orderError = errText;
        }).finally(function(){
            // 跳转到thank you页面 (path = thankyou)
            $location.path("/thankyou");
        });
    };
});