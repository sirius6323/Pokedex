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
};

// Array that prints pokemon with their weight 
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + '(height: ' + pokemonList[i].weight + ' kg' + ')' + '<br>');
}
