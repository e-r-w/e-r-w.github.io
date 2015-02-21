blogControllers.controller('blogHomeController', ['blogService', function(blogService){

  var model = this;
  
  model.latestPost = blogService.getLatest();

}]);