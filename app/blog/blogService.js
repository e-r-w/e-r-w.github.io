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
      {title: "Node, Semver & package management", partial: "node-semver"},
      {title: "Rebirth", partial: "rebirth"}
    ];
  }
  
  function _getLatest(){
    var all = _getAll();
    var last = all.length - 1;
    return all[last];
  }

}]);
