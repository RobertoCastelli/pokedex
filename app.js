let pokedex = document.querySelector('.panel');
let screen = document.getElementById('poke-image');
let btnSearch = document.getElementById('btnSearch');


btnSearch.addEventListener('click', async () => {
    let api = 'https://pokeapi.co/api/v2/pokemon';
    let key = Math.round(Math.random() * 150);
    let response = await fetch(`${api}/${key}`);
    let data = await response.json();
    getPokemon(data);
}
);

function getPokemon(pokemon) {
    screen.src = pokemon.sprites.front_default;
    console.log('name', pokemon.name)
    console.log('id', pokemon.id)
    console.log('weight', pokemon.weight)
    console.log('height', pokemon.height)
    console.log('experience', pokemon.base_experience)
    console.log(pokemon.stats[0].stat.name, pokemon.stats[0].base_stat)
    console.log(pokemon.stats[3].stat.name, pokemon.stats[3].base_stat)
    console.log(pokemon.stats[4].stat.name, pokemon.stats[4].base_stat)
    console.log(pokemon.stats[5].stat.name, pokemon.stats[5].base_stat)
    console.log('type', pokemon.types[0].type.name)
}

// GET COORDINATE 
function coordinates(event) {
    let xCoordinate = event.offsetX;
    let yCoordinate = event.offsetY;
    console.log(xCoordinate, yCoordinate);
}
pokedex.addEventListener('click', () => {
    coordinates(event);
})

