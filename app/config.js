erwApp.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider){

  $stateProvider   
    .state('blog', {
      templateUrl: "app/views/blog/_layout.html",
    })
    .state('blog.home', {
      url: "/blog",
      templateUrl: "app/views/blog/index.html",
      parent: 'blog'
    })
    .state('blog.archive', {
      url: "/blog/archive",
      templateUrl: "app/views/blog/archive.html",
      parent: 'blog'
    });
  
  //TODO 404 page
  $urlRouterProvider.otherwise('/');
  
  //allow trailing slashes
  $urlMatcherFactoryProvider.strictMode(false)
  
}]);