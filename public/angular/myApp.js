/**
 * Created by PeskoM on 28/09/2015.
 */
angular.module('myApp', []);

var myController = function($scope) {
    $scope.myInput = "world!";
};

angular
    .module('myApp')
    .controller('myController', myController);
