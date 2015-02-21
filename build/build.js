var erwApp = angular.module('erwApp', [
  
  'erwApp.blog.controllers',
  'erwApp.blog.services',
  
  'ui.router',
  'ui.bootstrap'
  
]);

erwApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
  
  $stateProvider   
    .state('blog', {
      templateUrl: "app/views/blog/layout.html",
    })
    .state('blog.home', {
      url: "/blog",
      templateUrl: "app/views/blog/index.html",
      controller: 'blogHomeController',
      controllerAs: 'model',
      parent: 'blog'
    })
    .state('blog.archive', {
      url: "/blog/archive",
      templateUrl: "app/views/blog/archive.html",
      controller: 'blogArchiveController',
      controllerAs: 'model',
      parent: 'blog'
    })
    .state('blog.post', {
      url: "/blog/:blogPost",
      templateUrl: function ($stateParams){
        return 'app/views/blog/posts/' + $stateParams.blogPost + '.html';
      },
      parent: 'blog'
    });
  
  $locationProvider.html5Mode(true);
  
  //TODO 404 page
  $urlRouterProvider.otherwise('/blog');
  
  //allow trailing slashes
  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';
    if(hasTrailingSlash) {
      var newPath = path.substr(0, path.length - 1); 
      return newPath; 
    } 
  });
  
}]);
var blogControllers = angular.module('erwApp.blog.controllers', []);
var blogServices = angular.module('erwApp.blog.services', []);
blogControllers.controller('blogArchiveController', ['blogService', function(blogService){

  var model = this;
  
  model.posts = blogService.getAll();

}]);
blogControllers.controller('blogHomeController', ['blogService', function(blogService){

  var model = this;
  
  model.latestPost = blogService.getLatest();

}]);
blogServices.factory('blogService', [function(){

  return {
    getAll: _getAll,
    getLatest: _getLatest
  };
  
  function _getAll(){
    return [
      'first-post'
    ];
  }
  
  function _getLatest(){
    var all = _getAll();
    var last = all.length - 1;
    return all[last];
  }

}]);