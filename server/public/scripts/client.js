var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMap']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  //console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'BusinessController as bc',
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/registeredHome', {
      templateUrl: '/views/templates/registeredHome.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});




myApp.filter('offeringsFilter', function(){
  return function(businesses, searchObject){
    console.log('businesses: ', businesses);
    console.log('searchObject: ', searchObject);
    if(!searchObject){
      return businesses;
    }
    console.log('filter running');
    var list = [];
    for (var i = 0; i < businesses.length; i++) {
      var business = businesses[i];
      console.log("BUSINESS: ", business.name);

      for(var j = 0; j < business.offerings.length; j++) { // each offering for this business
        console.log('offering: ', business.offerings[j].name);
        for (var key in searchObject) { // each key in the search object
          // console.log("business: " + business.name + " checking key " + key);
          if (searchObject.hasOwnProperty(key)) {
            // console.log("KEY: ", key);
            if(business.offerings[j].filter == key) { // does this business have this key?
              console.log('business has key', key);
              if(business.offerings[j].is_available == true) { // does this offering have true?
                console.log('found business with offering ' + key + ' is true' );
                list.push(business);
              }
            } 
            //else {
            //   console.log('business does NOT have key', key);
            // }
            
          }
        } // for in
        } // end offering for
        
      } // end business for
      console.log("MATCHES:", list);
      return list;
    
    } // end function

    // return list;
  // };

});
