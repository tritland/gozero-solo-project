myApp.controller('BusinessController', ['BusinessService', 'NgMap', function (BusinessService, NgMap) { // BusinessController talks to UserService
   // console.log('BusinessController created');
    var vm = this;
    vm.newForm = false; 
    vm.updateForm = false; 
    vm.businessData = BusinessService.businessData  
    vm.newBusiness = { offerings: [] };   
    vm.message = '';

    vm.map = {};
    NgMap.getMap("map").then(function(map){
      vm.map = map;
    });

    vm.showDeets = function(e, business) {
      vm.businessData.business = business
      vm.map.showInfoWindow('infoWindow', this);
    };


// maps autofill function
vm.placeChanged = function() {
  vm.place = this.getPlace();
  vm.newBusiness = vm.place;
  vm.newBusiness.offerings = [];
  vm.newBusiness.latitude = vm.place.geometry.location.lat();
  vm.newBusiness.longitude = vm.place.geometry.location.lng();
  //console.log('here is all the data in vm.place ==>', vm.place)
}

vm.getIcon = function(business) {
  var purple = '/assets/purple.png';
  var orange = '/assets/orange.png';

  if (business.type === "grocery"){
    return purple;
  } else {
    return orange;
  };
};


// runs the function in our service that communicates to the user services to get businesses off of the database      
vm.getBusinesses = function(){
BusinessService.getBusinesses(); 
};

vm.addBusiness = function(){
  console.log('clicked add business');
  console.log('hit addBusiness post on ==> businessController');  
  if(vm.newBusiness.name === '' || vm.newBusiness.address === '' ){
      vm.message = "Please complete all business name and address information.";
  } else {

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

  BusinessService.addBusiness(vm.newBusiness);
    vm.openForm();
    vm.newBusiness = {offerings: []};
  };
};

vm.deleteBusiness = function (id) {
  BusinessService.deleteBusiness(id);  
};

vm.updateBusiness = function(business){
  BusinessService.updateBusiness(business);  
}

// function to show/hide new Business input form on button click
    vm.openNewForm = function(){
      vm.newForm = !vm.newForm;
    };

// function to show extra details on button click    
    vm.showDetails = function(business){
      business.details = !business.details;
    }


// function to show/hide update form on button click
    vm.openUpdateForm = function(business){
      vm.updateForm = !vm.updateForm;
    };

// function to get list of businesses
    vm.getBusinesses();

}]);
 

//         $http.post('/business', vm.newBusiness).then(function(response) {
//           console.log('addBusiness Post on businessController was a success!');
//           //$location.path('/registeredHome');
//           BusinessService.getBusinesses();
//           vm.openForm();
//           vm.newBusiness = {
//             name: '',
//             address: '',
//             website: '',
//             description: '',
//             offerings: []
//           };
//         }).catch(function(response) {
//           console.log('addBusiness Post on businessController had an error ==>', response);
//           vm.message = "Please try again."
//         });
//       }
//     }


