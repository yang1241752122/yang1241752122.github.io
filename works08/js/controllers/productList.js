/**
 * Created by hxsd on 2016/8/25.
 *
 * 绑定商品显示数据的控制器
 */
angular.module("sportsStore")
    // 需要依赖注入购物车对象
    .controller("productListCtrl", function ($scope, shopCart) {
        // 存储用户所选择的当前的商品类别名称
        $scope.selectedCategory = null;

        // 响应对商品类别的选择事件
        $scope.selectCategory = function (category) {
            $scope.selectedCategory = category;     // 要么是null，要么是选择中那个类别的名称
            $scope.pageNum = 1; // 重置分页按钮
        };

        // 过滤函数：按商品类别过滤
        $scope.filteByCategory = function (product) {
            return $scope.selectedCategory == null || $scope.selectedCategory == product.category;
            /* 上面一行，等价于下面所有行
             if($scope.selectedCategory == null){
             return true;    // 显示所有的商品
             }else{
             // 说明已经选择了商品类别
             if(product.category == $scope.selectedCategory){
             return true;
             }else{
             return false;
             }
             }*/
        };

        // 高亮选中的商品类别
        $scope.getActiveClass = function (category) {
            return $scope.selectedCategory == category ? "btn-primary" : "";
        };

        // 定义两个与分页计算有关的变量：
        $scope.pageNum = 1; // 当前页码，默认第一页
        $scope.pageSize = 3;// 页面大小，默认每页显示3个商品信息

        // 请求分页
        $scope.selectPage = function (newPage) {
            $scope.pageNum = newPage;
        };

        // 高亮选中的分页导航按钮
        $scope.getNavActionClass = function (currentPage) {
            return $scope.pageNum == currentPage ? "btn-primary" : "";
        };

        // 添加商品到购物车的方法
        $scope.add = function (product) {
            shopCart.add(product);  // 将商品对象加入到购物车
        };
    });