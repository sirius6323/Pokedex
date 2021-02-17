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
	type: 'Fire',
	height: 0.6,
	weight: 8.5
},

pokemonList[2] = {
	name: 'Squirtle',
	type: 'Water',
	height: 0.5,
	weight: 9
},

pokemonList[3] = {
	name: 'Onix',
	type: ['Rock', 'Ground'],
	height: 8.8,
	weight: 210
}

// Array that prints pokemon with their height 
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3) {
		document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height} m) - Wow! thats a tall pokemon <br>`);
	} else {
		document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height} m) <br>`);
	}
}


