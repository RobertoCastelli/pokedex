let pokedex = document.querySelector('.panel');
let screen = document.getElementById('poke-image');

let api = 'https://pokeapi.co/api/v2/pokemon';
let key = Math.round(Math.random() * 150);

gatherPokemon()

//GET POKEMON INFO
async function gatherPokemon() {
    try {
        let response = await fetch(`${api}/${key}`);
        let data = await response.json();
        getPokemon(data);
    }
    catch (error) {
        console.log(error);
    }
}
function getPokemon(pokemon) {
    screen.src = pokemon.sprites.front_default;
    console.log(pokemon.name)
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

