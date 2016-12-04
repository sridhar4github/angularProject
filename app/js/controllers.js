'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('MyCtrl1', [function() {

  }])


.controller('MyCtrl2', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
    var ref = new Firebase("https://radiant-fire-6981.firebaseio.com/");
    $scope.parties = $firebaseObject(ref);
    $scope.party = {name:'', phone:'', size: ''};
    $scope.date = new Date();

    $scope.saveParty = function() {
      var phn = $scope.party.phone;
      $scope.parties[phn] = ($scope.party);
      $scope.parties.$save();
      $scope.party = {name:'', phone:'', size: ''};
      }
    $scope.removeRow = function(id) {
    var partyFromDBRef = new Firebase("https://radiant-fire-6981.firebaseio.com/" + '/' + id);
    partyFromDBRef.remove();
	}

  }])

.controller('loginController', [function() {

  }])

.controller('signUpController', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
	var firebaseObj = new Firebase("https://radiant-fire-6981.firebaseio.com/");
	var auth = $firebaseAuth(firebaseObj);
		$scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUser({email:email, password:password})
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                        alert("Registration successful");
                        $location.path('/login');
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        alert("Email address already exists");
                    });
            }
        }
    };


}]);