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
		$scope.viewList();
	}
	
	$scope.viewForm=function()
	{
		$("#div_list").hide();
		$("#div_form").show();
		$("#div_hButton").hide();
	}
	
	$scope.viewList=function()
	{
		$("#div_list").show();
		$("#div_form").hide();
		$("#div_hButton").show();
	}
	
	$scope.newValue=function()
	{
		$scope.formData = {};
		$scope.viewForm();
		
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
	
	$scope.cancel= function(){
		$scope.formData = {};
		$scope.viewList();
		
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
		if (id==null)
		{
			$scope.create();
		}
		else
		{
			$http.post('/persons/update/'+id, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				console.log(data);
				$scope.refresca();
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
		}
		$scope.viewList();
	};

	
	$scope.deletePerson= function(id) {
		
		bootbox.confirm("Are you sure?", function(result) {
			console.log(result);
			if (result){
			
				$http.delete('/persons/del/' + id)
				.success(function(data) {
					$scope.persons = data;
					console.log(data);
					$scope.refresca();
					
				})
				.error(function(data) {
					console.log('Error:' + data);
				});
			}
			  
		});
		
	};
	
	
	
	$scope.loadPerson= function(id) {
		$http.get('/persons/list/' + id)
			.success(function(data) {
				$scope.formData = data;
				console.log(data);
				$scope.buttonText='Change';
				$scope.action='update()';
				$scope.viewForm();
				
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
		
	};
}