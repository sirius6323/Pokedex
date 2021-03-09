// IIFE to prevent global access
let pokemonRepo = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal');

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
		
		// Hides modal while fetching pokemon details from API
		const modal = document.querySelector('.modal');
		modal.classList.add('active');
		
		loadDetails(pokemon).then(function () {
			// Clears all exisiting content inside modal 
			modalContainer.innerHTML = '';

			// Creates a modal container 
			const pokemonModal = document.createElement("div");
			pokemonModal.classList.add('modal');
			modalContainer.appendChild(modal);

			// Creates pokemon header of modal
			const pokemonHeader = document.createElement("div");
			pokemonHeader.classList.add('modal-header');
			pokemonModal.appendChild(pokemonHeader);

			// Creates pokemon name title
			const pokemonTitle = document.createElement("h1");
			pokemonTitle.classList.add('title');
			pokemonTitle.innerHTML = capitalize(pokemon.name);
			pokemonModal.appendChild(pokemonTitle);

			// Creates close button for pokemon modal
			const closeButton = document.createElement("button");
			closeButton.classList.add('close-button');
			closeButton.innerText = '&times;';
			pokemonModal.appendChild(closeButton);

			// Creates pokemon modal body 
			const pokeModalBody = document.createElement("div");
			pokeModalBody.classList.add('modal-body');
			pokemonModal.appendChild(pokeModalBody);

			// Pokemon stats
			const pokemonType = document.createElement("h3");
			pokemonType.innerHTML = `Type: ${pokemon.types}`;
			pokemonModal.appendChild(pokemonType);

			const pokemonHeight = doucment.createElement("h3");
			pokemonHeight.innerHTML = `Height: ${pokemon.height} m`;
			pokemonModal.appendChild(pokemonHeight);

			const pokemonWeight = document.createElement("h3");
			pokemonWeight.innerHTML = `Weight: ${pokemon.weight} kg`;
			pokemonModal.appendChild(pokemonWeight);

			// Creates pokemon image 
			const pokemonImage = document.createElement("img");
			pokemonImage.classList.add('pokemon-img');
			pokemonImage.src = pokemon.imageUrl;
			pokemonImage.alt = `Image of ${pokemon.name}`;
			pokemonModal.appendChild(pokemonImage);
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
						detailsUrl: item.url
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
		showDetails: showDetails
	};
})();

// Loops through pokemonRepo array and displays on homepage
pokemonRepo.loadList().then(function () {
	// Pokemon data is loaded
	pokemonRepo.getAllPokemon().forEach(function (pokemon) {
		pokemonRepo.addListItem(pokemon);
	});
});


// Functionality for pokemon modal
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

// Opens the modal 
openModalButtons.forEach(button => {
	button.addEventListener('click' , () => {
		// Selects our modal
		const modal = document.querySelector(button.dataset.modalTarget);
		openModal(modal);
	})
})

// Closes the modal when clicked anywhere on overlay
overlay.addEventListener('click', () => {
	// Selects all modals that are open
	const modals = document.querySelectorAll('.modal.active');
	modals.forEach(modal => {
		closeModal(modal);
	})
})

// Closes the modal with the close button 
closeModalButtons.forEach(button => {
	button.addEventListener('click' , () => {
		// Checks parent element for modal
		const modal = button.closest('.modal');
		closeModal(modal);
	})
// Closes the modal with the Esc key 
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			closeModal(modal);
		}
	});
})

// Function to open modal 
function openModal(modal) {
	if (modal == null) return 
	// Adds active class to modal 
	modal.classList.add('active');
	// Opens overlay if modal is open 
	overlay.classList.add('active');
}

// Function to close modal 
function closeModal(modal) {
	if (modal == null) return 
	// Removes active class from modal 
	modal.classList.remove('active');
	// Opens overlay if modal is open 
	overlay.classList.remove('active');
}

