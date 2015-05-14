angular
	.module('TTTapp')
	.controller('TTTController', TTTController)

	TTTController.$inject = ['$firebaseObject']

	function TTTController($firebaseObject) {

		var self = this;
			self.whatever = whatever();
			self.counter = 0;
			self.changeValue = changeValue;
			self.game = {
				gridlist: ["","","","","","","","",""]
			};
			// , turnCounter: 0;

		function whatever() {

			var ref = new Firebase("https://tic-tac-toe-mk.firebaseio.com/");
			var whatever = $firebaseObject(ref);
				return whatever;

		}

		function changeValue(e) {

			if (self.counter % 2 == 0) {
				//player1's turn
				self.game.gridlist[e] = "x";
				self.counter++;
				self.whatever.$add({ 
					value:'empty' 
				});
				self.whatever.$save();
				// console.log(self.counter);
			} 
			else if (self.counter % 2 !== 0) {
				//player2's turn;
				self.game.gridlist[e] = "o"
				self.counter++;
				// console.log(self.counter);
			}
			console.log(e)

		}

	}


