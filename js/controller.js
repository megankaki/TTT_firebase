angular
	.module('TTTapp')
	.controller('TTTController', TTTController)

	TTTController.$inject = ['$firebaseObject']

	function TTTController($firebaseObject) {

		var self = this;
			self.whatever = whatever();
			self.changeValue = changeValue;
			self.winner = winner;
			self.nameChange1 = nameChange1;
			self.nameChange2 = nameChange2;
			self.clearBoard = clearBoard;

		//hooks firebase to code. one time only.
		function whatever() {

			var ref = new Firebase("https://tic-tac-toe-mk.firebaseio.com/");
			var whatever = $firebaseObject(ref);
				return whatever;

		}

		//when page loads, create 9 objects in firebase.
	    self.whatever.$loaded (

	    	function() {
	    		
		        self.whatever.counter = 1;
		        self.whatever.p1score = 0;
		        self.whatever.p2score = 0;
		        self.whatever.name1 = "Player 1"
		        self.whatever.name2 = "Player 2" 	 
		        self.whatever.winner = "Who will be the winner?";
        		self.whatever.showName1 = true;
        		self.whatever.showName2 = true;
        		self.whatever.showWinner = false; 
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
	
		    function nameChange1() {
	            self.whatever.showName1 = !self.whatever.showName1;
	            self.whatever.$save();
        	}
		    
		    function nameChange2() {
	            self.whatever.showName2 = !self.whatever.showName2;
	            self.whatever.$save();
        	}

		//function that inputs "x" or "o", changes turn, updates firebase
		//...make sure that double click does not work. even number view-> only player1
	    	function changeValue($index) {                 
	            if (
	                self.whatever.counter % 2 !== 0  
	                && self.whatever.gridList[$index].value == ""
	            ) {
	                console.log(self.whatever.gridList[$index])
	                self.whatever.counter++;
	                self.whatever.gridList[$index].value = "x";
	            } 
	            else if (
	                self.whatever.counter % 2 == 0 
	                && self.whatever.gridList[$index].value == ""
	            ) {
	                console.log(self.whatever.gridList[$index])
	                self.whatever.counter++;
	                self.whatever.gridList[$index].value = "o";
	            }
				self.winner();
	            self.whatever.$save();
	        }	
	   	//function that runs win logic
	   		function winner() {
				console.log("winner function is running")
				var tokens = ["x", "o"];
				for (var i = 0; i < tokens.length; i++){
					var t = tokens[i];
				
					//Check for a winner horizontally
					if ( ((self.whatever.gridList[0].value == t) && (self.whatever.gridList[1].value == t) && (self.whatever.gridList[2]).value == t) ||
						((self.whatever.gridList[3].value == t) && (self.whatever.gridList[4].value == t) && (self.whatever.gridList[5]).value == t) || 
						((self.whatever.gridList[6].value == t) && (self.whatever.gridList[7].value == t) && (self.whatever.gridList[8]).value == t) || 
						((self.whatever.gridList[0].value == t) && (self.whatever.gridList[3].value == t) && (self.whatever.gridList[6]).value == t) || 
						((self.whatever.gridList[1].value == t) && (self.whatever.gridList[4].value == t) && (self.whatever.gridList[7]).value == t) || 
						((self.whatever.gridList[2].value == t) && (self.whatever.gridList[5].value == t) && (self.whatever.gridList[8]).value == t) || 
						((self.whatever.gridList[0].value == t) && (self.whatever.gridList[4].value == t) && (self.whatever.gridList[8]).value == t) || 
						((self.whatever.gridList[2].value == t) && (self.whatever.gridList[4].value == t) && (self.whatever.gridList[6]).value == t) )  {

						if (t == "x"){
							console.log("Player 1 Wins!");
							self.whatever.p1score++;
							self.whatever.winner = self.whatever.name1 + " wins";

						} else {
							console.log("Player 2 Wins!");
							self.whatever.p2score++;
							self.whatever.winner = self.whatever.name2 + " wins";
						}
						self.whatever.showWinner = true;
						self.whatever.$save();
						self.delayClearBoard();
					}
				}

				if (self.whatever.counter == 9){
					self.whatever.winner = "It's a tie! No one wins";
					self.whatever.showWinner = true;
					self.delayClearBoard();
				}
			}

			function clearBoard() {
	    		//clears Board
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
		        self.whatever.counter = 0; 
		    	self.whatever.winner = "Who'll win next?";
        		self.whatever.showWinner = false;	        		             
		        self.whatever.$save();
        	}


			self.delayClearBoard = delayClearBoard;

			function delayClearBoard() {
				setTimeout(function(){
					self.clearBoard()
				}, 2000)
			}


}