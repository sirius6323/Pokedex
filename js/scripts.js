// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	const modalContainer = document.querySelector('#overlay');

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
		loadDetails(pokemon).then(() => {

			// Displays overlay and modal of pokemon
			openModal(pokemon);

		});
	}

	// Function to display modal of pokemon
	function openModal(pokemon) {
		// Cleasrs all exisiting modal content
		modalContainer.innerHTML = '';
	
		// Creates modal 
		const pokeModal = document.createElement('div');
		pokeModal.classList.add('modal');
		pokeModal.setAttribute('id', 'modal');
	
		// Creates modal header
		const modalHeader = document.createElement('div');
		modalHeader.classList.add('modal-header');
	
		// Creates modal title 
		const pokeTitle = document.createElement('div');
		pokeTitle.classList.add('title');
		pokeTitle.innerText = capitalize(`${pokemon.name}`);
	
		// Creates modal close button 
		const closeButton = document.createElement('button');
		closeButton.classList.add('close-button');
		closeButton.innerHTML = '&times;';
		closeButton.addEventListener('click', closeModal);
	
		// Creates modal body
		const modalBody = document.createElement('div');
		modalBody.classList.add('modal-body');
	
		// Creates stats for pokemon
		const pokeType = document.createElement('h4');
		pokeType.innerText = `Type: ${pokemon.types}`;
	
		const pokeHeight = document.createElement('h4');
		pokeHeight.innerText = `Height: ${pokemon.height} m`;
	
		const pokeWeight = document.createElement('h4');
		pokeWeight.innerText = `Weight: ${pokemon.weight} kg`;
	
		const pokeImg = document.createElement('img');
		pokeImg.classList.add('pokemon-image');
		pokeImg.src = 'pokemon.imageUrl';
		pokeImg.setAttribute('alt', 'A high resolution sprite image of pokemon.');
	
		// Appends created modal and contents to modal container 
		modalContainer.appendChild(pokeModal);
		pokeModal.appendChild(modalHeader);
		modalHeader.appendChild(pokeTitle);
		modalHeader.appendChild(closeButton);
		pokeModal.appendChild(modalBody);
		modalBody.appendChild(pokeType);
		modalBody.appendChild(pokeHeight);
		modalBody.appendChild(pokeWeight);
		modalBody.appendChild(pokeImg);
	
		// Adds active class to modalContainer and pokeModal to display 
		modalContainer.classList.add('active');
		pokeModal.classList.add('active');
	
	}

	// Function to close modal 
	function closeModal() {
		modalContainer.classList.remove('acitve');
		// Closes modal with the Esc key 
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
				closeModal();
			}
		})
	}
	
	// Closes modal when clicked outside on overlay 
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			closeModal();
		}
	});
	
	// Displays modal and overlay
	document.querySelector('#overlay').addEventListener('click', () => {
		openModal();
	});

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
			.catch(function (e) {
				console.log(e);
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

				// Loops throught pokemon types array
				item.types = [];
				details.types.forEach(function (itemType) {
					item.types.push(' ' + capitalize(itemType.type.name));
				});
			})
			.catch(function (e) {
				console.log(e);
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
		openModal: openModal
	};
})();

// Loops through pokemonRepo array and displays on homepage
pokemonRepo.loadList().then(function () {
	// Pokemon data is loaded
	pokemonRepo.getAllPokemon().forEach(function (pokemon) {
		pokemonRepo.addListItem(pokemon);
	});
});
