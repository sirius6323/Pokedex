// Creates an empty Array for Pokemon 
const pokemonList = [];

// Adds pokemon to pokemonList Array  
pokemonList[0] = {
	name: 'Bulbasaur',
	type: ['Grass', 'Poison'],
	height: 0.7,
	weight: 6.9
},

pokemonList[1] = {
	name: 'Charmander',
	type: ['Fire'],
	height: 0.6,
	weight: 8.5
},

pokemonList[2] = {
	name: 'Squirtle',
	type: ['Water'],
	height: 0.5,
	weight: 9
},

pokemonList[3] = {
	name: 'Onix',
	type: ['Rock', 'Ground'],
	height: 8.8,
	weight: 210
}

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

// Prints IIFE pokemonList to console 
console.log(pokemonRepo.getAll());

// forEach Loop
pokemonList.forEach(function(pokemon) {
	if(pokemon.height > 3) {
		document.write(`${pokemon.name} (height: ${pokemon.height} m) - Wow! thats a tall pokemon`);
	}
	else {
		document.write(`${pokemon.name} (height: ${pokemon.height} m) <br>`);
	}
});




// for Loop that prints pokemon with their height 
/* for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3) {
		document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height} m) - Wow! thats a tall pokemon <br>`);
	} 
	
	else {
		document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height} m) <br>`);
	}
}
 */

