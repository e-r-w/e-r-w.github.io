var erwApp = angular.module('erwApp', [
  
  'erwApp.blog.controllers',
  'erwApp.blog.services',
  
  'ngAnimate',
  
  'ui.router',
  'ui.bootstrap'
  
]);

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
var blogControllers = angular.module('erwApp.blog.controllers', []);
var blogServices = angular.module('erwApp.blog.services', []);
blogControllers.controller('blogArchiveController', ['blogService', function(blogService){

  var model = this;
  
  model.posts = blogService.getAll();

}]);
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
      {title: 'First.', partial: 'first-post'},
      {title: "GitHub Pages & Angular's Html5Mode", partial: 'gh-pages-angular'},
      {title: "Well, Shit.", partial: 'well'},
      {title: "A case for goliath", partial: 'goliath'},
{title: "Node, Semver & package management", partial: "node-semver"}
    ];
  }
  
  function _getLatest(){
    var all = _getAll();
    var last = all.length - 1;
    return all[last];
  }

}]);