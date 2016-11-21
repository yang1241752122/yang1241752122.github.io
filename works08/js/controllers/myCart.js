/**
 * Created by hxsd on 2016/8/26.
 *
 * 创建一个新的模块myCart，在该模块中要定义一个单例的服务对象(购物车对象)
 * 并且在该模块中，注册与购物车相关的控制器
 *
 * .controller
 * .filter
 * .factory
 */
// 使用factory方法(这是一个工厂方法)
angular.module("myCart", [])
    .factory("shopCart", function () {
        var cart = [];  // 购物车的购物筐

        // 返回一个单例的购物车对象
        return {
            // 添加商品的方法
            add: function (product) {
                // 先判断购物车中是否已经有了该商品
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (item.product.name == product.name) {
                        item.number += 1;
                        return;     // 返回
                    }
                }

                // 如果执行到这里，说明购物车中没有该商品
                // 则构造一个item对象，放入购物筐
                cart.push({product: product, number: 1});
            },

            // 删除商品的方法(按名称)
            remove: function (name) {
                // 遍历购物筐中的商品，一个一个比较name
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].product.name == name) {
                        cart.splice(i, 1);   // 从数组中删除
                        break;
                    }
                }
            },

            // 查看购物车中所有的商品信息
            findAll: function () {
                return cart;
            },

            // 清空购物车的方法
            clear: function () {
                cart.length = 0;
            }
        };
    })
    // 因为在控制器中要用到购物车对象，所以需要将shopCart依赖注入
    .controller("cartCtrl",function($scope,shopCart){
        // 拿到购物车的购物筐中的所有商品
        var cart = shopCart.findAll();

        // 计算购物车中所有商品数量的方法
        $scope.totalNumber = function(){
            var total = 0;
            // 遍历购物筐，把所有商品数量累加起来
            for(var i=0;i<cart.length;i++){
                total += cart[i].number;
            }
            return total;
        };

        // 计算购物车中所有商品总金额的方法
        $scope.totalMoney = function(){
            var total = 0;
            // 遍历购物筐，计算每种商品的小计金额，并累加
            for(var i=0;i<cart.length;i++){
                total += cart[i].number * cart[i].product.price;
            }
            return total;
        };
    });