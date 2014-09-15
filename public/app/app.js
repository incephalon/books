var app = angular.module('myApp', ['ngRoute']);
//
// app.config(function($routeProvider){
// 	$routeProvider
// 		.when('/', {
// 			controller: 'myC'
// 		})
//         .when('/:name', {
//             template:'',
//             controller: 'booksController'
//         })
//         .when('/:name/:chapter', {
//             template:'',
//             controller: 'myC'
//         })
//          .otherwise({
//                 redirectTo: '/'
//         });
// });

// app.controller('booksController', function($scope, $routeParams, $http){
// 	//alert("got it");
// 	//alert($routeParams.name);
// 	var namer = $routeParams.name;
// 	console.log(namer);

// 	//grab the books put them in scope and feed into the other div


// 		 $scope.chapters = [];

// 	  		$http.get('/getBookId/'+namer)//bookid
// 			  .then(function(result) {
// 			    //$scope.chapters = result.data;
// 			    console.log("the book Id");
// 			    console.log(result.data);
// 			 	console.log(result.data[0].bookid);

// 				$http.get('/chapters/'+result.data[0].bookid)//bookid
// 			  .then(function(result) {
// 			    $scope.chapters = result.data;
// 			    console.log("chapters");
// 			 	console.log($scope.chapters);
// 			});  
// 			});  

// 	  // 		$http.get('/chapters/'+namer)//bookid
// 			//   .then(function(result) {
// 			//     $scope.chapters = result.data;k
// 			//     console.log("chapters");
// 			//  	console.log($scope.chapters);
// 			// });  

// 			  //$scope.selectedBook=bookid;



// });

// app.controller('chapterController', function($scope, $routeParams){
// 	//alert("got it");
// 	//alert($routeParams.chapter);

// 	//grab the books put them in scope and feed into the other div

// 	//alert("got it");

// });


app.controller('myC', function($scope, $http){
	$scope.hello="world";

	$scope.categories = []; 
	$scope.books = []; 
	$scope.chapters = [];
	$scope.notes = "";
	$scope.selectedBook=0;
	$scope.selectedChapter=0;
	$scope.selectedCat=0; 

	$scope.previousBook=0;
	$scope.previousChapter=0;
	$scope.previousCat=0; 

	$scope.showCategories = function() {
		$http.get('/categories')
			.then(function(result) {
				$scope.categories = result.data; 
				console.log("category data from my controller"); 
				console.log(result.data); 
				$scope.selectedCat = $scope.categories[0].catid; 

				$scope.showBooks(); 
			}); 
	}
	$scope.showCategories(); 

	$scope.showBooks = function(catid) {
		if (catid == null) catid = $scope.selectedCat; 
		$http.get('/books/'+catid)
			.then(function(result) {
			    console.log("book data from my angular controller");
			    console.log(result.data);
   			    $scope.books = result.data;

				$scope.selectedChapter = 0; 
				if ($scope.selectedCat != catid) $scope.selectedCat = catid; 
		});
	}

	$scope.updateCategory = function() {
		$scope.showBooks($scope.selectedCat); 
	}

	$scope.addBook = function() {
		if ($scope.newBookName == '') return; 
		$http.post("/addBook", {bookname: $scope.newBookName, catid: $scope.selectedCat}).success(function(data, status) {
        	if(data.status == 1) {
        		$scope.showBooks(); 
        		$scope.newBookName = ''; 
				$scope.showChapters(data.newBookId, null); 
        	}
        })
	}

	$scope.removeSelectedBook = function() {
		if ($scope.selectedBook <= 0) return; 
		$http.post("/removeBook", {bookid: $scope.selectedBook}).success(function(data, status) {
        	if(data.status == 1) {
        		$scope.showBooks(); 
				$scope.selectedBook = 0; 
        	}
        })
	}

	$scope.addChapter = function() {
		if ($scope.selectedBook <= 0 || $scope.newChapterName == '') return; 
		$http.post("/addChapter", {bookid: $scope.selectedBook, name: $scope.newChapterName}).success(function(data, status) {
        	if(data.status == 1) {
        		$scope.showChapters($scope.selectedBook, null); 
        		$scope.newChapterName = ''; 
				$scope.selectedChapter = data.newChapId; 
        	}
        })
	}

	$scope.removeSelectedChapter = function() {
		if ($scope.selectedBook <= 0 || $scope.selectedChapter <= 0) return; 
		$http.post("/removeChapter", {bookid: $scope.selectedBook, chapid: $scope.selectedChapter}).success(function(data, status) {
        	if(data.status == 1) {
        		$scope.showChapters($scope.selectedBook, null); 
				$scope.selectedChapter = 0; 
        	}
        })
	}

	$scope.showChapters = function(bookid, name){
  		$http.get('/chapters/'+ bookid)
		  .then(function(result) {
		    $scope.chapters = result.data;
		});  

		$scope.selectedBook=bookid;
		$scope.previousBook=bookid;
	}

	$scope.showNotes = function(bookid, chapid){
	  	//console.log(name);
	  	//$("#texter").val("");

  		//var data = {"text": $("#texter").val(), "bookid": $scope.previousBook, "chapid": $scope.previousChapter};

  		$http.get('/notes/' + bookid + '/' + chapid)
		  .then(function(result) {
		    //$scope.notes = result.data[0].text;
		    //console.log(result);
		    //console.log(result.data);
		    console.log(result.data);
			$("#texter").val(result.data[0].text);

		 //    if(result.data[0].text!=null)
		 //    {
			//     //console.log(result.data[0].text);
			//     //console.log(result.data[0]["text"]);
			//     $("#texter").val(result.data[0].text);
			// }

		});  
		$scope.selectedChapter=chapid;
		$scope.previousChapter=chapid;
	}

	  // $scope.saveNote=function(){

	  // 		$http.post('/update')
			//   .then(function(result) {


			// });  
	  // }

	  // //$scope.toSend

    $scope.sendPost = function() {
        var data = {"text": $("#texter").val(), "bookid": $scope.selectedBook, "chapid": $scope.selectedChapter};

        $http.post("/update", data).success(function(data, status) {
        	console.log("it worked");
            //$scope.hello = data;
        })
    }  

});