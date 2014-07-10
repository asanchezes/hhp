//public/main.js

var angularPerson = angular.module('angularPerson', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// Cuando se cargue la página, pide del API todos los TODOs
	$http.get('/persons/list')
		.success(function(data) {
			$scope.persons = data;
			console.log(data);
			$scope.init();
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	
	
	$scope.init=function()
	{
		// $scope.buttonText='Add New';
		// $scope.action='create()';
	}
	
	$scope.refresca= function(){
		$http.get('/persons/list')
		.success(function(data) {
			$scope.persons = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	}

	// Cuando se añade un nuevo TODO, manda el texto a la API
	$scope.create = function(){
		$http.post('/persons/add', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.persons = data;
				console.log(data);
				$scope.refresca();
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
	$scope.update = function(id){
		$http.post('/persons/update/'+id, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				console.log(data);
				$scope.refresca();
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	// Borra un TODO despues de checkearlo como acabado
	$scope.deletePerson= function(id) {
		$http.delete('/persons/del/' + id)
			.success(function(data) {
				$scope.persons = data;
				console.log(data);
				$scope.refresca();
				
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
	$scope.loadPerson= function(id) {
		$http.get('/persons/list/' + id)
			.success(function(data) {
				$scope.formData = data;
				console.log(data);
				$scope.buttonText='Change';
				$scope.action='update()';
				
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}