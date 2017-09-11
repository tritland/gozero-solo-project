myApp.factory('UserService', function($http, $location){
  console.log('UserService Loaded');

  var userObject = {};
  //object to populate with business data from database
  var businessData = {list:[]};

  return {
    userObject : userObject,
    businessData: businessData,

    getuser : function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('UserService -- getuser -- User Data: ', userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/login");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/login");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/login");
      });
    },

    //get request for businesses from database
    getBusinesses: function () {
      $http.get('/business').then(function (response) {
        console.log('response is', response)
        if (response.status == 200) {
          businessData.list = response.data;
          console.log('response from business get request ==> ', response);     
        }
      });
    }

  };
});
