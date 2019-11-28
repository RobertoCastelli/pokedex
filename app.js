let pokedex = document.querySelector('.images');
let screen = document.getElementById('poke-image');

let api = 'https://pokeapi.co/api/v2/pokemon';
let key = Math.round(Math.random() * 150);

function gatherPokemon() {
    fetch(`${api}/${key}`)
        .then(response =>  response.json()
        .then(pokemon => getPokemon(pokemon))
    );
}
function getPokemon(pokemon) {
    screen.src = pokemon.sprites.front_default;
}

gatherPokemon();

    
// GET COORDINATE 
function coordinates(event) {
    let xCoordinate = event.offsetX;
    let yCoordinate = event.offsetY;
    console.log(xCoordinate, yCoordinate);
}
pokedex.addEventListener('click', () => {
    coordinates(event);
})

