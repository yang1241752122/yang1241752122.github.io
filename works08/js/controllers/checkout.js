/**
 * Created by hxsd on 2016/8/26.
 *
 * 绑定到结账页面的控制器
 */
angular.module("sportsStore").controller("checkoutCtrl",function($scope,shopCart){
    // 获得购物车中所有的商品
    $scope.cartData = shopCart.findAll();

    // 计算商品的总金额
    $scope.totalPayment = function(){
        var total = 0;
        // 遍历购物筐，计算每种商品的小计金额，并累加
        for(var i=0;i<$scope.cartData.length;i++){
            total += $scope.cartData[i].number * $scope.cartData[i].product.price;
        }
        return total;
    };

    // 删除商品的方法
    $scope.remove = function(name){
        shopCart.remove(name);  // 从购物车中删除指定名称的商品
    };
});