myApp.service('BusinessService', ['$http', function ($http, $location) {
  
var self = this;
self.businessData = { list: [] };
self.businessToEdit = { currentData: {} };
    
//get request for businesses from database
self.getBusinesses = function () {
    $http.get('/business').then(function (response) {
        if (response.status == 200) {
            self.businessData.list = response.data;
            //console.log('response from business get request ==> ', response.data);
        };
    });
};

//post request to add new business 
self.addBusiness = function(newBusiness){
    console.log('hit business post with this data ==>', newBusiness)
    $http.post('/business', newBusiness).then(function(response) {
        self.getBusinesses();
    });
};

//delete request to delete selected business
self.deleteBusiness = function(id){
    $http.delete('/business/' + id).then(function(response){
        self.getBusinesses();
    });
};

self.fillUpdateForm = function(business){
    self.businessToEdit.currentData = business;
};

//put request to update selected business
self.updateBusiness = function(business){
    $http.put('/business', business).then(function(response){
        
        self.getBusinesses();
    });
};


}]);



