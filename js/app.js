var app = angular.module('myApp', ['angular-velocity', 'ngAnimate', 'noCAPTCHA']);

app.config(['noCAPTCHAProvider', function (noCaptchaProvider) {
    noCaptchaProvider.setSiteKey('6LeLHyUTAAAAAEZ2VFxRWDxvVLenNTaMbBphIqBG');
  }
]);

app.controller('main', function($scope, $timeout, $http){
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

	// center guy
	$timeout(function(){
		$scope.centerGuy = true;
	}, 1200);

	// right center guy
	$timeout(function(){
		$scope.rightCenterGuy = true;
	}, 1800);

	// right guy
	$timeout(function(){
		$scope.rightGuy = true;
	}, 1600);

	$scope.send = function(user){
		if(!$scope.gRecaptchaResponse){
			$scope.captchaRequired = "Please check the box, or you could be a robot.";
			return;
		} else {
			$scope.captchaRequired = null;
		}
		
		$http({
			method: 'POST',
			url: 'mail.php',
			data: {
				name: user.name,
				email: user.email,
				message: user.message,
				captcha: $scope.gRecaptchaResponse
			}
		}).then(function(res){
			console.log(res);
			if(res.data.status === 'error'){
				$scope.messageSuccess = 'For some reason, the message did not send. We apologize that this happened. Perhaps you can try again in a moment.';
			} else {
				$scope.messageSuccess = 'The message was succesfully sent. Thank you for taking the time to contact us. You should receive a response within a few business days. Thanks again!';
			}
		}, function(err){
			console.log(err);
			$scope.errorMessage = 'An error occured. Perhaps you can try again later. Sorry for the inconvenience.';
		});
	};
});