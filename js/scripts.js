// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [
		{
			name: 'Charmander',
			type: ['Fire'],
			height: 0.6,
			weight: 8.5
		},
	
		{
			name: 'Squirtle',
			type: ['Water'],
			height:0.5,
			weight: 9
		},
	
		{
			name: 'Psyduck',
			type: ['Water'],
			height: 0.8,
			weight: 19.6
		}
	];

	// Adds pokemon to the array 
	function addPokemon(pokemon) {
		pokemonList.push(pokemon);
	}

	// Ensures only pokemon objects are added to pokemonRepo w/ name, type, height, weight
	function checkPokemon(item) {
		let stats = Objects.keys(item);
		if (stats.include('name') && stats.include('type') && 
		stats.include('height') && stats.include('weight')) {
			pokemon.push(item);
		}

		else {
			alert('All items in pokemonRepo must be objects');
		}
	}

	// Functions that adds pokemon to a button on a list on the home page
	function addListItem (pokemon) {
		let pokeList = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		let button = document.createElement('button');
	
		button.innerText = pokemon.name;
		button.classList.add = 'pokemon-button';
	
		listPokemon.appendChild(button);
		pokeList.appendChild(listPokemon);
	}

	// Filters to search for specific pokemon
	function searchPokemon(target) {
		return pokemonList.filter(pokemon => pokemon.name == target);
	}

	// Returns all pokemon in array 
	function getAllPokemon() {
		return pokemonList
	}
  // Functions that can be used outside of scope
	return {
		addPokemon: addPokemon,
		getAllPokemon: getAllPokemon,
		checkPokemon: checkPokemon,
		searchPokemon: searchPokemon,
		addListItem: addListItem,
	};

})();

// Adds pokemon to IIFE pokemonRepo Array
pokemonRepo.addPokemon({name: 'Huanter', type: ['Ghost', 'Poison'], height: 1.6, weight: 0.1});
pokemonRepo.addPokemon({name: 'Jigglypuff', type: ['Fairy', 'Normal'], height: 0.5, weight: 5.5});
pokemonRepo.addPokemon({name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 0.7, weight: 6.9});
pokemonRepo.addPokemon({name: 'Onix', type: ['Rock', 'Ground'], height: 8.8, weight: 210});

// Prints IIFE pokemonList to console 
console.log(pokemonRepo.getAllPokemon());

// Function to display pokemon on homepage w/ name, type, height, weight 
function display(pokemon) {
	pokemonRepo.addListItem(pokemon);
};

// Displays each pokemon object in pokemonList Array 
pokemonRepo.getAllPokemon().forEach(display);

// Returns Array of specific pokemon to the console 
console.log(pokemonRepo.searchPokemon('Jigglypuff'));
