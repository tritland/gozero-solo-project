myApp.controller('BusinessController', ['BusinessService', 'NgMap', function (BusinessService, NgMap) { // BusinessController talks to UserService
  // console.log('BusinessController created');
  var vm = this;
  vm.newForm = false;
  vm.updateForm = false;
  vm.businessData = BusinessService.businessData
  vm.message = '';
  vm.businessToEdit = BusinessService.businessToEdit
 
  

  vm.map = {};
  NgMap.getMap("map").then(function (map) {
    vm.map = map;
  });

  vm.showDeets = function (e, business) {
    vm.businessData.business = business
    vm.map.showInfoWindow('infoWindow', this);
  };


  // maps autofill function
  vm.placeChanged = function () {
    vm.newBusiness.place = this.getPlace();
    vm.newBusiness.place.latitude = vm.newBusiness.place.geometry.location.lat();
    vm.newBusiness.place.longitude = vm.newBusiness.place.geometry.location.lng();
    vm.newBusiness.place.offerings =  [
        {
          name: 'Bulk Groceries',
          is_available: false
        },
        {
          name: 'Beer/Wine/Spirits',
          is_available: false
        },
        {
          name: 'Clothes',
          is_available: false
        },
        {
          name: 'Restaurants/Cafes',
          is_available: false
        },
        {
          name: 'Home Goods',
          is_available: false
        },
        {
          name: 'Specialty Items',
          is_available: false
        }
      ]
    

    vm.newBusiness.place.type = 'other';




    
    // vm.place = this.getPlace();
    // vm.newBusiness = vm.place;
    // vm.newBusiness.offerings = [];
    // vm.newBusiness.latitude = vm.place.geometry.location.lat();
    // vm.newBusiness.longitude = vm.place.geometry.location.lng();
  }

  vm.getIcon = function (business) {
    var purple = '/assets/purple.png';
    var orange = '/assets/orange.png';

    if (business.type === 'other') {
      return purple;
    } else {
      return orange;
    };
  };


  // runs the function in our service that communicates to the user services to get businesses off of the database      
  vm.getBusinesses = function () {
    BusinessService.getBusinesses();
  };

  vm.addBusiness = function () {
 
    // if (vm.newBusiness.name === '' || vm.newBusiness.address === '') {
    //   vm.message = "Please complete all business name and address information.";
    // } else {

      // if (vm.bulk != undefined) {
      //   var bulk = {
      //     name: 'Bulk Groceries',
      //     is_available: true
      //   }
      //   vm.newBusiness.offerings.push(bulk);
      // } else {
      //   var bulk = {
      //     name: 'Bulk Groceries',
      //     is_available: false
      //   }
      //   vm.newBusiness.offerings.push(bulk);
      // }


      // if (vm.pet != undefined) {
      //   var pet = {
      //     name: 'Pet products',
      //     is_available: true
      //   }
      //   vm.newBusiness.offerings.push(pet);
      // } else {
      //   var pet = {
      //     name: 'Pet products',
      //     is_available: false
      //   }
      //   vm.newBusiness.offerings.push(pet);
      // }


      // if (vm.taps != undefined) {
      //   vm.newBusiness.offerings.push('Taprooms/Fill Growlers');
      // }
      // if (vm.books != undefined) {
      //   vm.newBusiness.offerings.push('Books');
      // }
      // if (vm.program != undefined) {
      //   vm.newBusiness.offerings.push('Sharing program');
      // }
      // if (vm.compost != undefined) {
      //   vm.newBusiness.offerings.push('Uses compostable products');
      // }
console.log('newBusiness being sent from controller ==>', vm.newBusiness)
      BusinessService.addBusiness(vm.newBusiness);
      vm.openNewForm();
      vm.newBusiness = { offerings: [] };
    // };
  };

  // function to show/hide new Business input form on button click
  vm.openNewForm = function (business) {
    vm.newForm = !vm.newForm;
  };

  // function to show extra details on button click    
  vm.showDetails = function (business) {
    business.details = !business.details;
    BusinessService.fillUpdateForm(business)
    console.log('here is what is sent to service from controller when details is clicked -->', business)
  };

  // function to show/hide update form on button click
  vm.openUpdateForm = function (business) {
    vm.updateForm = !vm.updateForm;
  };

  vm.deleteBusiness = function (id) {
    BusinessService.deleteBusiness(id);
  };

  vm.updateBusiness = function (business) {
    console.log(business);
    BusinessService.updateBusiness(business);
  };

  // function to get list of businesses
  vm.getBusinesses();

}]);



//old post form with catch:
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


