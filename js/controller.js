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
    		self.name1Again = name1Again;
    		self.name2Again = name2Again;			
			self.clearBoard = clearBoard;
			self.winner_found = false;
    		self.player1Present = false;
    		self.player2Present = false;


		//hooks firebase to code. one time only.
		function whatever() {

			var ref = new Firebase("https://tic-tac-toe-mk.firebaseio.com/");
			var whatever = $firebaseObject(ref);
				return whatever;

		}

		//when page loads, create 9 objects in firebase.
	    self.whatever.$loaded (

	    	function() {
	    		
		        self.whatever.counter = 0;
		        self.whatever.p1score = 0;
		        self.whatever.p2score = 0;
		        self.whatever.name1 = "Red Lego"
		        self.whatever.name2 = "Yellow Lego" 	 
		        self.whatever.winner = "Who will be the winner?";
        		self.whatever.showName1 = true;
        		self.whatever.showName2 = false;
        		self.whatever.showWinner = false; 
        		self.whatever.change1Again = false;
        		self.whatever.change2Again = false;

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
            	console.log(self.player1Present);
            	console.log(self.player2Present);
		        self.whatever.$save();
        	}
        );
	
		    function nameChange1() {
		    	self.player1Present = true;
	            self.whatever.showName1 = !self.whatever.showName1;
	            self.whatever.showName2 = !self.whatever.showName2
	            self.whatever.change1Again = !self.whatever.change1Again;
	            self.whatever.$save();
        	}
		    
		    function nameChange2() {
		    	self.player2Present = true;
	            self.whatever.showName2 = !self.whatever.showName2;
	            self.whatever.change2Again = !self.whatever.change2Again;
	            self.whatever.$save();
        	}

		    function name1Again() {
	            self.whatever.change1Again = !self.whatever.change1Again;
	            self.whatever.showName1 = !self.whatever.showName1;
	            self.whatever.$save();
        	}
		    function name2Again() {
	            self.whatever.change2Again = !self.whatever.change2Again;
	            self.whatever.showName2 = !self.whatever.showName2;
	            self.whatever.$save();
        	}        	        	

		//function that inputs "x" or "o", changes turn, updates firebase
		//...make sure that double click does not work. even number view-> only player1
	    	function changeValue($index) {                 
	            if (
	            	self.player1Present == true &&
	                self.whatever.counter % 2 == 0  
	                && self.whatever.gridList[$index].value == ""
	            ) {
	                // console.log(self.whatever.gridList[$index])
	                self.whatever.counter++;
	                // self.player1Present = !self.player1Present;
	                self.whatever.gridList[$index].value = "x";
	            } 
	            else if (
	            	self.player2Present == true &&
	                self.whatever.counter % 2 !== 0 
	                && self.whatever.gridList[$index].value == ""
	            ) {
	                // console.log(self.whatever.gridList[$index])
	                self.whatever.counter++;
	                // self.player2Present = !self.player2Present; 
	                self.whatever.gridList[$index].value = "o";
	            }
				self.winner();
	            self.whatever.$save();
	        }	
	   	//function that runs win logic
	   		function winner() {
				// console.log("winner function is running")
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
							// console.log("Player 1 Wins!");
							self.whatever.p1score++;
							self.whatever.winner = self.whatever.name1 + " wins";

						} 
						else {
							// console.log("Player 2 Wins!");
							self.whatever.p2score++;
							self.whatever.winner = self.whatever.name2 + " wins";
						}
						self.whatever.showWinner = true;
						self.winner_found = true;
						self.whatever.$save();
						self.delayClearBoard();
					} 
					else if (self.whatever.counter == 9 && !self.winner_found){
						self.whatever.winner = "It's a tie! No one wins";
						self.whatever.showWinner = true;
						self.delayClearBoard();
					}					
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
        		self.winner_found = false;        		             
		        self.whatever.$save();
        	}


			self.delayClearBoard = delayClearBoard;
			self.newGame = newGame;
			function delayClearBoard() {
				setTimeout(function(){
					self.clearBoard()
				}, 2000)
			}
			function newGame() {
				self.clearBoard();
				self.whatever.counter = 0;
				self.whatever.p1score = 0;
				self.whatever.p2score = 0;
				self.whatever.showName1 = true;
				self.whatever.showName2 = false;
				self.whatever.name1 = "Red Lego"
				self.whatever.name2 = "Yellow Lego"
		        self.whatever.winner = "Who will be the winner?";				
				self.whatever.$save();
				self.player1Present = false;
    			self.player2Present = false;

			}
/////sound related items below
	// self.stopAudio = stopAudio;
	// function stopAudio() {
	//     clearInterval(self.loop);
	// }

	self.loop = setInterval(function(){audioLoop()},1000);
	self.audioLoop = audioLoop;

	function audioLoop(){
	
		var sound0 = new Audio('js/Audio/Base1.mp3'); 
		var sound1 = new Audio('js/Audio/Base2.mp3'); 
		var sound2 = new Audio('js/Audio/ComicalDripSound.mp3'); 
		var sound3 = new Audio('js/Audio/DramaticKiss2.mp3'); 
		var sound4 = new Audio('js/Audio/PhotonShot.mp3'); 
		var sound5 = new Audio('js/Audio/SodaCanOpen.mp3'); 
		var sound6 = new Audio('js/Audio/Base1.mp3'); 
		var sound7 = new Audio('js/Audio/Base2.mp3');
		var sound8 = new Audio('js/Audio/ComicalDripSound.mp3'); 
		var sound9 = new Audio('js/Audio/DramaticKiss2.mp3'); 
		var sound10 = new Audio('js/Audio/PhotonShot.mp3'); 
		var sound11 = new Audio('js/Audio/SodaCanOpen.mp3'); 
		var sound12 = new Audio('js/Audio/Base1.mp3');
		var sound13 = new Audio('js/Audio/Base2.mp3'); 
		var sound14 = new Audio('js/Audio/ComicalDripSound.mp3'); 
		var sound15 = new Audio('js/Audio/DramaticKiss2.mp3'); 
		var sound16 = new Audio('js/Audio/PhotonShot.mp3'); 
		var sound17 = new Audio('js/Audio/SodaCanOpen.mp3');  

		self.soundArrayX=[sound0,sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8];
		self.soundArrayO=[sound9,sound10,sound11,sound12,sound13,sound14,sound15,sound16,sound17];		

		for (var i=0; i<self.whatever.gridList.length; i+=1) {

			if (self.whatever.gridList[i].value == "x"){
				self.soundArrayX[i].play()
				break;
			}
			if (self.whatever.gridList[i].value == "o"){
				self.soundArrayO[i].play()
				break;
			}
		}

		  setTimeout(function(){
			for (var i=1; i<self.whatever.gridList.length; i+=1){
				if (self.whatever.gridList[i].value == "x"){
					self.soundArrayX[i].play()
					break;
				}
				if (self.whatever.gridList[i].value == "o"){
					self.soundArrayO[i].play()
					break;
				}				
			}
		  }, 1000); 
	}//end of audioloop


}//end of controller 