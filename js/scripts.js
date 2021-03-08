// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');

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
	function addListItem(pokemon) {
		let pokeList = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		let button = document.createElement('button');
	
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');
	
		// Appends button and to li in ul
		listPokemon.appendChild(button);
		pokeList.appendChild(listPokemon);

		// Adds 'click' event listner to pokemon in list
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});
	}

	// Prints to console on pokemon that was clicked 
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			console.log(pokemon);
		});
	}
	// Function to load pokemon by using fetch from Pokemon API 
	function loadList () {
		return fetch(apiUrl).then (function (response) {
			return response.json();
		}).then (function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				addPokemon(pokemon);
			});
		}).catch (function (e) {
			console.log(e);
		})
	}

	// Function to load detailed data of pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then (function (response) {
			return response.json();
		}).then (function (details) {
			// Adds details to the item 
			item.imageUrl = details.sprites.front_default;
			item.types = details.types;
			item.height = details.height;
			item.weight = details.weight;
		}).catch (function (e) {
			console.log(e);
		});
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
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};

})();

// Loops through pokemonRepo array and displays on homepage
pokemonRepo.loadList().then(function() {
	// Pokemon data is loaded
	pokemonRepo.getAllPokemon().forEach(function(pokemon) {
		pokemonRepo.addListItem(pokemon);
	});
});


