blogServices.factory('blogService', [function(){

  return {
    getAll: _getAll,
    getLatest: _getLatest
  };
  
  function _getAll(){
    return [
      {title: 'first.', partial: 'first-post'},
      //{title: "Github Pages & Angular's Html5Mode", partial: 'gh-pages-angular'}
    ];
  }
  
  function _getLatest(){
    var all = _getAll();
    var last = all.length - 1;
    return all[last];
  }

}]);