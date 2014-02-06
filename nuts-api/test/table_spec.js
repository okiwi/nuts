var assert = require("assert");
var Table = require("../src/table");
var Player = require("../src/player");

describe('Table', function(){
	it("Peut ajouter un joueur", function(){
		var table = new Table();

		var addPlayer = function() {
			var joe = new Player("Joe");
			table.addPlayer(joe);
		};
		
		assert.doesNotThrow(addPlayer);
	});

	it("Peut supprimer un joueur", function(){
		var table = new Table();

		var joe = new Player("Joe");
		var bill = new Player("Bill");
	
		table.addPlayer(joe);
		table.addPlayer(bill);
	});

	it("Ne peut pas commencer avec moins de 2 joueurs", function(){
		var table = new Table(2);
		var isStarted = false;
		table.on("Started", function(){ isStarted = true; });
		addPlayers(table, ["Alfred"]);
		
		assert(!isStarted);
	});

	it("Peut commencer avec 2 joueurs au moins", function(){
		var table = new Table(2);
		var isStarted = false;
		table.on("Started", function(){ isStarted = true; });
		addPlayers(table, ["Alfred", "Benoit", "Christian"]);

		assert(isStarted);
	});

	it("Peut jouer une partie", function(){
		var table = new Table(2);

		var seb = new Player("Seb", 100);
		var grosbibi = new Player("GrosBibi", 100);

		table.addPlayer(seb);
		table.addPlayer(grosbibi);

		var play = function(){
			seb.actions.call();
			grosbibi.actions.check();

			seb.actions.check();
			grosbibi.actions.check();
			
			seb.actions.fold();
		};

		assert.doesNotThrow(play);
	});

	function addPlayers(table, names){
		var players = {};
		for(var i = 0; i < names.length; i++){
			var name = names[i];
			var player = new Player(name, 100);
			
			players[name] = player;

			table.addPlayer(player);
		}

		return players;
	}
});