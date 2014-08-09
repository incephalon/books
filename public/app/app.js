var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'myC'
		})
        .when('/:name', {
            template:'',
            controller: 'booksController'
        })
        .when('/:name/:chapter', {
            template:'',
            controller: 'chapterController'
        })
         .otherwise({
                redirectTo: '/'
        });
});

app.controller('booksController', function($scope, $routeParams, $http){
	//alert("got it");
	//alert($routeParams.name);

	//grab the books put them in scope and feed into the other div


		// $scope.chapters = [];

	 //  		$http.get('/chapters/18')//bookid
		// 	  .then(function(result) {
		// 	    $scope.chapters = result.data;
		// 	    console.log("chapters");
		// 	 console.log($scope.chapters);
		// 	});  

			  //$scope.selectedBook=bookid;



});

app.controller('chapterController', function($scope, $routeParams){
	//alert("got it");
	//alert($routeParams.chapter);

	//grab the books put them in scope and feed into the other div

	alert("got it");

});


app.controller('myC', function($scope, $http){
	$scope.hello="world";

	$scope.documents = [];
	$scope.chapters = [];
	$scope.notes = "";
	$scope.selectedBook=1;
	$scope.selectedChapter=1;


	$http.get('/book')
	  .then(function(result) {
	    $scope.documents = result.data;
	    console.log("book data from my angular controller");
	    console.log(result.data);
	});



	  $scope.showChapters = function(bookid){
	  	console.log(name);

	  		$http.get('/chapters/'+ bookid)
			  .then(function(result) {
			    $scope.chapters = result.data;
			});  

			  $scope.selectedBook=bookid;

	  }

	 $scope.showNotes = function(bookid, chapid){
	  	console.log(name);

	  		var data = {"text": $("#texter").val(), "bookid": $scope.selectedBook, "chapid": $scope.selectedChapter};

	        $http.post("/update", data).success(function(data, status) {
	        	console.log("it worked");
	            //$scope.hello = data;
	        })




	  		$http.get('/notes/' + bookid + '/' + chapid)
			  .then(function(result) {
			    //$scope.notes = result.data[0].text;
			    console.log(result);
			    console.log(result.data);
			    console.log(result.data[0].text);
			    console.log(result.data[0]["text"]);
			    $("#texter").val(result.data[0].text);

			});  

			  $scope.selectedChapter=chapid;

	  }

	  // $scope.saveNote=function(){

	  // 		$http.post('/update')
			//   .then(function(result) {


			// });  
	  // }

	  // //$scope.toSend

	  //   $scope.sendPost = function() {
	  //       var data = {"text": $("#texter").val(), "bookid": $scope.selectedBook, "chapid": $scope.selectedChapter};

	  //       $http.post("/update", data).success(function(data, status) {
	  //       	console.log("it worked");
	  //           //$scope.hello = data;
	  //       })
	  //   }  

});