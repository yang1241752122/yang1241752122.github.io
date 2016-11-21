/**
 * Created by hxsd on 2016/8/25.
 *
 * 新创建一个模块，在这个新模块中定义通用的分页过滤器
 */
// 新创建一个模块，并注册一个分页过滤器
angular.module("marsFilter", [])
    .filter("pagerFilter", function () {
        /**
         * productList：要被过滤的商品集合 - 数组
         * pageNum: 要显示的页码 - 整数
         * pageSize：页面大小-每页显示的商品数量 - 整数
         *
         * Angular中提供了一些工具方法，用来判断数据的类型
         */
        return function (productList, pageNum, pageSize) {
            // 判断传入的参数类型是否正确
            if (angular.isArray(productList) && angular.isNumber(pageNum) && angular.isNumber(pageSize)) {
                // 先计算起始索引值 (n-1)*pageSize
                var startIndex = (pageNum - 1) * pageSize;

                // 如果计算的起始索引值超出了最大范围，返回空数组
                if (startIndex >= productList.length) {
                    return [];
                }

                // 从startIndex索引处开始，截取pageSize大小数量的商品，并返回
                //return productList.splice(startIndex, pageSize);
                return productList.slice(startIndex, startIndex + pageSize);     // [startIndex,endIndex)
            } else {
                return productList; // 不干涉
            }
        };
    })
    .filter("pageCountFilter",function(){
        return function (productList, pageSize){
            if(angular.isArray(productList) && angular.isNumber(pageSize)){
                // 计算总页数
                var total = Math.ceil(productList.length / pageSize);

                // 根据总页数，构造一个整数数组，元素是序列整数，然后返回
                var arr = [];
                for(var i=0;i<total;i++){
                    arr.push(i+1);  // [1,2,3,...]
                }
                return arr;
            }else{
                return productList;
            }
        };
    });