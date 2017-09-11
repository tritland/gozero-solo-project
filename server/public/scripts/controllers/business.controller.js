myApp.controller('BusinessController', ['UserService', '$http', function (UserService, $http) { // BusinessController talks to UserService
    console.log('BusinessController created');
    var vm = this;
    
    vm.businessData = UserService.businessData
  
    // This is what runs the function in our service that 
    // communicates to the user services to get businesses off of the database
    UserService.getBusinesses(); 
   
  }]);