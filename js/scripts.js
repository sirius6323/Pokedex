const pokemonList = [
	{
		name: Charmander,
		type: ['Fire'],
		height: 0.6,
		weight: 8.5
	},

	{
		name: Squirtle,
		type: ['Water'],
		height:0.5,
		weight: 9
	},

	{
		name: Psyduck,
		type: ['Water'],
		height: 0.8,
		weight: 19.6
	}
];

// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];

	// Adds pokemon to the array 
	function add(pokemon) {
		pokemonList.push(pokemon);
	}
	// Returns all pokemon 
	function getAll() {
		return pokemonList;
	}

	return {
		add: add,
		getAll: getAll
	};

})();

// Adds pokemon to IIFE pokemonRepo Array
pokemonRepo.add({name: 'Huanter', type: ['Ghost', 'Poison'], height: 1.6, weight: 0.1});
pokemonRepo.add({name: 'Jigglypuff', type: ['Fairy', 'Normal'], height: 0.5, weight: 5.5});
pokemonRepo.add({name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 0.7, weight: 6.9});
pokemonRepo.add({name: 'Onix', type: ['Rock', 'Ground'], height: 8.8, weight: 210});

// Prints IIFE pokemonList to console 
console.log(pokemonRepo.getAll());

// IIFE function with forEach Loop to pokemonList Array to display in browswer 
(function () {
	pokemonList.forEach(function(pokemon) {
		if(pokemon.height > 3) {
			document.write(`${pokemon.name} (height: ${pokemon.height} m) - Wow! thats a tall pokemon`);
		}
		
		else {
			document.write(`${pokemon.name} (height: ${pokemon.height} m) <br>`);
		}
	});
})();

