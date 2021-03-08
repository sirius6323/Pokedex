// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');

	// Capitalizes the name of each pokemon
	function capitalize (name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

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
	
		button.innerText = capitalize(pokemon.name);
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

			// Loops throught pokemon types array
			item.types = [];
			details.types.forEach(function(itemType) {
				item.types.push(" " + capitalize(itemType.type.name));
			});
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

	// Show pokemon modal functionality 
	function showModal(title, text) {
		// Clears all exisiting content inside modal 
		modalContainer.innerHTML = '';
		
		// Creats modal
		let modal = document.createElement('div');
		modal.classList.add('pokemon-modal')

		// Adds content to created modal 
		
		// Created close button 
		let closeButton = document.createElement('button');
		closeButton.classList.add('modal-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('click', hideModal);

		// Created image of pokemon 
		let pokemonImage = document.createElement('img');
		pokemonImage.classList.add('pokemon-img');
		pokemonImage.src = pokemon.imageUrl;
		pokemonImage.alt = "Image of " + pokemon.name;

		
		// Created pokemon name
		let pokemonHeading = document.createElement('h2');
		modalHeading.innerHTML = capitalize(pokemon.name);

		// Created pokemon info 
		let pokemonHeight = document.createElement('h3');
		pokemonHeight.innerHTML = "Height: " + pokemon.height + "m";

		let pokemonWeight = document.createElement('h3');
		pokemonWeight.innerHTML = "Weight: " + pokemon.weight + "kg";

		let pokemonType = document.createElement('h3');
		pokemonType.innerHTML = "Type: " + pokemon.types;

		// Appends newly created modal elements inside modal
		modal.appendChild(closeButton);
		modal.appendChild(pokemonImage);
		modal.appendChild(pokemonHeading);
		modal.appendChild(pokemonHeight);
		modal.appendChild(pokemonWeight);
		modal.appendChild(pokemonType);

		//Appends modal inside modal-container 
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	// Hide pokemon modal functionality
	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	// Added functionality to pokemon modal
	function showDialog(title, text) {
		showModal(title, text);
	}



	// Use keyboard "ESC" key to close pokemon modal
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	// Click outside of modal to close pokemon modal 
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});


	document.querySelector('#show-modal').addEventListener('click', () => {
		showModal('Pokemon Name', 'Pokemon Stats');
	});

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


