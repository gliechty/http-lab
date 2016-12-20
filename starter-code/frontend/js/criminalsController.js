angular.module('TheCriminalsApp', [])
	.controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];

function CriminalsController ($http){
	var self = this;
	this.all = [];
	self.addCriminal = addCriminal;
	self.newCriminal = {};
	self.getCriminals = getCriminals;
	self.deleteCriminal = deleteCriminal;
	self.updateThis = updateThis;


	function getCriminals(){
		$http
			.get('http://localhost:3000/criminals')
			.then(function(response){
				self.all = response.data.criminals;
			});
	}
	getCriminals();

	function addCriminal(){
		$http
			.post('http://localhost:3000/criminals', self.newCriminal)
			.then(function (request){
				getCriminals();
			});
			self.newCriminal = {};
	}

	function deleteCriminal(criminal){
		$http
			.delete('http://localhost:3000/criminals/' + criminal._id)
			.then(function (res){
				var index = self.all.indexOf(criminal);
				self.all.splice(index, 1);
				getCriminals();
			});
	}

	function updateThis(criminal){
		$http
			.patch('http://localhost:3000/criminals/' + criminal._id, criminal)
			.then(function (request){
				getCriminals();
			});
	}

}

