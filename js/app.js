var app = angular.module('myApp', ['angular-velocity', 'ngAnimate']);

app.controller('main', function($scope, $timeout){
	$scope.fiveGuys = false;
	$scope.brassAndTies = false;
	$scope.farLeftGuy = false;
	$scope.leftCenterGuy = false;
	$scope.centerGuy = false;
	$scope.rightCenterGuy = false;
	$scope.rightGuy = false;

	// five guys
	$timeout(function(){
		$scope.fiveGuys = true;
	}, 500);

	// brass and ties
	$timeout(function(){
		$scope.brassAndTies = true;
	}, 2500);

	// far left guy
	$timeout(function(){
		$scope.farLeftGuy = true;
	}, 1400);

	// left center guy
	$timeout(function(){
		$scope.leftCenterGuy = true;
	}, 1000);

	$timeout(function(){
		$scope.centerGuy = true;
	}, 1200);

	$timeout(function(){
		$scope.rightCenterGuy = true;
	}, 1800);

	$timeout(function(){
		$scope.rightGuy = true;
	}, 1600);
});