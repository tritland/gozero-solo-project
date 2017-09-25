myApp.controller('BusinessController', ['BusinessService', 'NgMap', '$mdDialog', '$mdToast', function (BusinessService, NgMap, $mdDialog, $mdToast) { // BusinessController talks to UserService
  // console.log('BusinessController created');
  var vm = this;
  vm.newForm = false;
  vm.updateForm = false;
  vm.businessData = BusinessService.businessData
  vm.message = '';
  vm.businessToEdit = BusinessService.businessToEdit
  vm.map = {};

  vm.showToast = function (ev) {
    $mdToast.show(
        $mdToast.simple()
        .textContent('Thanks for adding to our resource guide!')
    );
};



  NgMap.getMap("map").then(function (map) {
    vm.map = map;
  });

  vm.showDeets = function (e, business) {
    vm.businessData.business = business
    vm.map.showInfoWindow('infoWindow', this);  
  };

  //not workin outside of the marker tag - would like for animation to work when clicking on associated biz in the list
  // vm.toggleBounce = function() {
  //   console.log('this is THIS -->', this);
  //   if (this.getAnimation() != null) {
  //     this.setAnimation(null);
  //   } else {
  //     this.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  // };

  // maps autofill function
  vm.placeChanged = function () {
    vm.newBusiness.place = this.getPlace();
    vm.newBusiness.place.latitude = vm.newBusiness.place.geometry.location.lat();
    vm.newBusiness.place.longitude = vm.newBusiness.place.geometry.location.lng();
    vm.newBusiness.place.type = 'other';
    vm.newBusiness.place.offerings = [
      {
        name: 'Bulk Groceries',
        is_available: false,
        filter: 'bulkGrocery'
      },
      {
        name: 'Beer Growler Refill',
        is_available: false
      },
      {
        name: 'Used Clothing and Goods',
        is_available: false
      },
      {
        name: 'Eco-Friendly Restaurants/Cafes',
        is_available: false
      },
      {
        name: 'Sharing Program',
        is_available: false
      },
      {
        name: 'Specialty Items',
        is_available: false
      }
    ]
  };

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
    BusinessService.addBusiness(vm.newBusiness);
    vm.openNewForm();
    vm.newBusiness = { offerings: [] };
  };

  // function to show/hide new Business input form on button click
  vm.openNewForm = function (business) {
    vm.newForm = !vm.newForm;
    vm.newBusiness = { offerings: [] };
  };

  // function to show extra details on button click    
  vm.showDetails = function (business) {
    business.details = !business.details;
    BusinessService.fillUpdateForm(business)
  };

  // function to show/hide update form on button click
  vm.openUpdateForm = function (business) {
    vm.updateForm = !vm.updateForm;
  };

  vm.deleteBusiness = function (ev, id) {
    var confirm = $mdDialog.confirm()
    .title('Are you sure you want to delete this listing?')
    // .textContent('All of the banks have agreed to forgive you your debts.')
    // .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Delete')
    .cancel('Cancel');

$mdDialog.show(confirm).then(function() {
  BusinessService.deleteBusiness(id);
});   
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


