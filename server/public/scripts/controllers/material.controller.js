myApp.controller('MaterialController', function($mdDialog) {
    console.log('MaterialController Loaded');
   
    var vm = this;
                  


//attempt at using AngMaterial prompt for input form
    vm.showPrompt = function(ev) {
        $mdDialog.show(
            $mdDialog.prompt()
             .title('New Business Information:')
            //.textContent('Bowser is a common name.')
            .placeholder('Name')
            .ariaLabel('Name')
            //.initialValue('Buddy')
            .targetEvent(ev)
            .required(true)
            .ok('Submit')
            .cancel('Cancel')
        );
    };
});