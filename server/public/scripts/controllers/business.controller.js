myApp.controller('BusinessController', ['UserService', '$http', function (UserService, $http) { // BusinessController talks to UserService
    console.log('BusinessController created');
    var vm = this;
    vm.form = false;
    vm.businessData = UserService.businessData
    vm.newBusiness = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    };
    vm.message = '';

    vm.openForm = function(){
      vm.form = !vm.form;
    };
    // This is what runs the function in our service that 
    // communicates to the user services to get businesses off of the database
    UserService.getBusinesses(); 
   

    vm.addBusiness = function() {
      console.log('hit addBusiness post on ==> businessController');
      if(vm.newBusiness.name === '' || vm.newBusiness.street === '' || vm.newBusiness.city === '' || vm.newBusiness.state === '' || vm.newBusiness.zip === '') {
        vm.message = "Please complete all business name and address information.";
      } else {
        console.log('addBusiness Post on businessController is sending following data to server ==>', vm.newBusiness);
        $http.post('/business', vm.newBusiness).then(function(response) {
          console.log('addBusiness Post on businessController was a success!');
          //$location.path('/registeredHome');
          UserService.getBusinesses();
          vm.openForm();
          vm.newBusiness = {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: ''
          };
        }).catch(function(response) {
          console.log('addBusiness Post on businessController had an error ==>', response);
          vm.message = "Please try again."
        });
      }
    }


  }]);