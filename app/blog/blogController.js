blogControllers.controller('blogController', ['$rootScope', '$window', function($rootScope, $window){

  var model = this;
  
  model.loading = false;
  
  $rootScope.$on('$stateChangeStart', function(){
    $window.scrollTo(0,0);
    model.loading = true;
  });
  
  $rootScope.$on('$stateChangeSuccess', function(){
    model.loading = false;
  });

}]);