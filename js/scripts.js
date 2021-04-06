// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	const modalContainer = document.querySelector('#pokemonModal');

	// Capitalizes the name of each pokemon
	function capitalize(pokemonName) {
		return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
	}

	// Adds pokemon to the array
	function addPokemon(pokemon) {
		pokemonList.push(pokemon);
	}

	// Ensures only pokemon objects are added to pokemonRepo w/ name, type, height, weight
	function checkPokemon(item) {
		let stats = Objects.keys(item);
		if (
			stats.include('name') &&
			stats.include('type') &&
			stats.include('height') &&
			stats.include('weight')
		) {
			pokemon.push(item);
		} else {
			alert('All items in pokemonRepo must be objects');
		}
	}

	// Functions that adds pokemon to a button on a list on the home page
	function addListItem(pokemon) {
		let pokeList = document.querySelector('.pokemon-list');
		let pokeRow = document.createElement('div');
		let listPokemon = document.createElement('li');
		let button = document.createElement('button');

		button.innerText = capitalize(pokemon.name);
		button.setAttribute('type', 'button');
		button.classList.add('btn');
		button.classList.add('btn-dark');
		button.setAttribute('data-target', '#pokemonModal');
		button.setAttribute('data-toggle', 'modal');
		pokeList.classList.add('list-unstyled');
		listPokemon.classList.add('list-group-item');
		listPokemon.classList.add('col-12');
		listPokemon.classList.add('col-md-4');

		// Appends button and li in ul
		listPokemon.appendChild(button);
		pokeList.appendChild(listPokemon);

		// Adds 'click' event listener to pokemon in list
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});
	}

	// Displays detailed information of pokemon
	function showDetails(pokemon) {
		loadDetails(pokemon).then(() => {
			// Displays modal of pokemon that was clicked
			let modalHeader = $('.modal-header');
			let modalTitle = $('.modal-title');
			let modalBody = $('.modal-body');

			modalTitle.empty();
			modalBody.empty();

			let pokemonName = $('<h4>' + capitalize(pokemon.name) + '</h4>');
			let pokemonImage = $('<img class="modal-image" style="width:200px" />');
			pokemonImage.attr('src', pokemon.imageUrl);
			pokemonImage.attr(
				'alt',
				`A high resolution sprite image of ${pokemon.name}`
			);
			let pokemonType = `<h4>Types: ${pokemon.types}</h4>`;
			let pokemonHeight = `<h4> Height: ${pokemon.height} m</h4>`;
			let pokemonWeight = `<h4> Weight: ${pokemon.weight} kg </h4>`;

			modalTitle.append(pokemonName);
			modalBody.append(pokemonImage);
			modalBody.append(pokemonType);
			modalBody.append(pokemonHeight);
			modalBody.append(pokemonWeight);
		});
	}

	// Function to load pokemon by using fetch from Pokemon API
	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					addPokemon(pokemon);
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Function to load detailed data of pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				// Adds details to the item
				item.imageUrl = details.sprites.front_default;
				item.types = details.types;
				item.height = details.height;
				item.weight = details.weight;

				// Loops through pokemon types array
				item.types = [];
				details.types.forEach(function (itemType) {
					item.types.push(' ' + capitalize(itemType.type.name));
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Filters to search for specific pokemon
	function searchPokemon(target) {
		return pokemonList.filter((pokemon) => pokemon.name == target);
	}

	// Returns all pokemon in array
	function getAllPokemon() {
		return pokemonList;
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
pokemonRepo.loadList().then(function () {
	// Pokemon data is loaded
	pokemonRepo.getAllPokemon().forEach(function (pokemon) {
		pokemonRepo.addListItem(pokemon);
	});
});
