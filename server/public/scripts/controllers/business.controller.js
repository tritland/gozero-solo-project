myApp.controller('BusinessController', ['UserService', '$http', 'NgMap', function (UserService, $http, NgMap) { // BusinessController talks to UserService
    console.log('BusinessController created');
    var vm = this;
    vm.form = false;
   
    vm.businessData = UserService.businessData
   
    vm.newBusiness = { offerings: [] };
    
    vm.message = '';


    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.newBusiness = vm.place;
      vm.newBusiness.offerings = [];
      console.log('here is all the data in vm.place ==>', vm.place)
      console.log('location', vm.place.geometry.location);
      vm.map.setCenter(vm.place.geometry.location);
      vm.newBusiness.latitude = vm.place.geometry.location.lat();
      vm.newBusiness.longitude = vm.place.geometry.location.lng();
    }
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });
  


//function to show/hide new Business input form
    vm.openForm = function(){
      vm.form = !vm.form;
    };

    vm.showDetails = function(business){
      business.details = !business.details;
    }
// This is what runs the function in our service that communicates to the user services to get businesses off of the database
    UserService.getBusinesses(); 
   

    vm.addBusiness = function() {
      console.log('hit addBusiness post on ==> businessController');
      
      if(vm.newBusiness.name === '' || vm.newBusiness.address === '' ){
        //|| vm.newBusiness.street === '' || vm.newBusiness.city === '' || vm.newBusiness.state === '' || vm.newBusiness.zip === '') {
        vm.message = "Please complete all business name and address information.";
      } else {
        console.log('addBusiness Post on businessController is sending following data to server ==>', vm.newBusiness);
        
      //  attempt at adding the offerings to the newBusiness array: 
        if(vm.bulk != undefined){
          vm.newBusiness.offerings.push('Bulk groceries');
        }
        if(vm.pet != undefined){
          vm.newBusiness.offerings.push('Pet products');
        }
        if(vm.taps != undefined){
          vm.newBusiness.offerings.push('Taprooms/Fill Growlers');
        }
        if(vm.books != undefined){
          vm.newBusiness.offerings.push('Books');
        }
        if(vm.program != undefined){
          vm.newBusiness.offerings.push('Sharing program');
        }
        if(vm.compost != undefined){
          vm.newBusiness.offerings.push('Uses compostable products');
        }

        console.log('here is the newBusiness object ==>', vm.newBusiness);


        $http.post('/business', vm.newBusiness).then(function(response) {
          console.log('addBusiness Post on businessController was a success!');
          //$location.path('/registeredHome');
          UserService.getBusinesses();
          vm.openForm();
          vm.newBusiness = {
            name: '',
            address: '',
            website: '',
            description: '',
            offerings: []
          };
        }).catch(function(response) {
          console.log('addBusiness Post on businessController had an error ==>', response);
          vm.message = "Please try again."
        });
      }
    }


    vm.deleteBusiness = function (id) {
      $http.delete('/business/' + id).then(function (response) {
        console.log(response);
        UserService.getBusinesses();
      });
    };

  }]);