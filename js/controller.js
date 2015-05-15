angular
	.module('TTTapp')
	.controller('TTTController', TTTController)

	TTTController.$inject = ['$firebaseObject']

	function TTTController($firebaseObject) {

		var self = this;
			self.whatever = whatever();
			self.counter = 0;
			self.changeValue = changeValue;
			self.turn = "x";			

		//hooks firebase to code. one time only.
		function whatever() {

			var ref = new Firebase("https://tic-tac-toe-mk.firebaseio.com/");
			var whatever = $firebaseObject(ref);
				return whatever;

		}

		//when page loads, create 9 objects in firebase.
	    self.whatever.$loaded (

	    	function() {
	    		//each object stored in array called 'gridList'
		        self.whatever.gridList = [
					{
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: ""
		            } , 
		            {
		                value: "" 
		            }
				];
		            
		            self.whatever.$save();
        	}
        );


		//function that inputs "x" or "o", changes turn, updates firebase
		function changeValue(e) {

			console.log("clicked")
				//if empty grid and player's turn is "x"...
				if (
					self.whatever.gridList[e].value == "" 
					&& self.turn == "x"
				){
					//change grid to "x"
					self.whatever.gridList[e].value = "x"; 
					//"x" in console
					console.log(self.whatever.gridList[e].value); 
					//changes turn to "o"
					self.turn = "o";
					//"next is o's turn" in console
					console.log("next is " + self.turn + "'s turn")
				} 
				// if empty grid and player's turn is "o"...
				else if (
					self.whatever.gridList[e].value == "" 
					&& self.turn == "o"
				){
					//change grid to "o"
					self.whatever.gridList[e].value = "o";
					//"o" in console
					console.log(self.whatever.gridList[e].value);
					//changes turn to "x"
					self.turn = "x";
					//"next is x's turn" in console
					console.log("next is " + self.turn + "'s turn");		
				} 

			//updates information in firebase
			self.whatever.$save();	
		}



	}


