//public/main.js

var entity='variable';
var angularModule = angular.module(entity+"Module", []);


function mainController($scope, $http) {
	$scope.entity=entity;
	$scope.formData = {};
	
	
	$http.get('/'+entity+'/list')
		.success(function(data) {
			$scope.listEntity = data;
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
		$http.get('/'+entity+'/list')
		.success(function(data) {
			$scope.listEntity = data;
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
		$http.post('/'+entity+'/add', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.listEntity = data;
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
			$http.post('/'+entity+'/update/'+id, $scope.formData)
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

	
	$scope.delete= function(id) {
		
		bootbox.confirm("Are you sure?", function(result) {
			console.log(result);
			if (result){
			
				$http.delete('/'+entity+'/del/' + id)
				.success(function(data) {
					$scope.listEntity = data;
					console.log(data);
					$scope.refresca();
					
				})
				.error(function(data) {
					console.log('Error:' + data);
				});
			}
			  
		});
		
	};
	
	
	
	$scope.load= function(id) {
		$http.get('/'+entity+'/list/' + id)
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