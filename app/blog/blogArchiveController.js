blogControllers.controller('blogArchiveController', ['blogService', function(blogService){

  var model = this;
  
  model.posts = blogService.getAll();

}]);