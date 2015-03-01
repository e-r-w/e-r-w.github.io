erwApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
  
  var cacheBust = '?' + new Date().toISOString();
  
  $stateProvider
  
  //Blog
    .state('blog', {
      templateUrl: "app/views/blog/layout.html" + cacheBust,
      controller: 'blogController',
      controllerAs: 'model'
    })
    .state('blog.home', {
      url: "/blog",
      templateUrl: "app/views/blog/index.html" + cacheBust,
      controller: 'blogHomeController',
      controllerAs: 'model',
      parent: 'blog'
    })
    .state('blog.archive', {
      url: "/blog/archive",
      templateUrl: "app/views/blog/archive.html" + cacheBust,
      controller: 'blogArchiveController',
      controllerAs: 'model',
      parent: 'blog'
    })
    .state('blog.post', {
      url: "/blog/:blogPost",
      templateUrl: function ($stateParams){
        return 'app/views/blog/posts/' + $stateParams.blogPost + '.html' + cacheBust;
      },
      parent: 'blog'
    })
  
  //Misc
    .state('offended', {
      url: "/offended",
      templateUrl: "app/views/offended.html" + cacheBust
    })
  ;
  
  $locationProvider.html5Mode(true);
  
  //TODO 404 page
  $urlRouterProvider.otherwise('/blog');
  
  //allow trailing slashes
  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';
    if(hasTrailingSlash) {
      return path.substr(0, path.length - 1);
    } 
  });
  
}]);