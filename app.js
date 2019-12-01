/*
 * TODO
 * Sistemare tasto Up - Down
 * mettere easter egg
 * metter sound
*/

let screen = document.getElementById('poke-image');

let btnSearch = document.getElementById('btnSearch');
let btnRight = document.getElementById('btnRight');
let btnLeft = document.getElementById('btnLeft');
let btnSwitch = document.getElementById('btnSwitch');
let btnUp = document.getElementById('btnUp');

let pokeName = document.getElementById('poke-name');
let pokeInput = document.getElementById('poke-input');
let pokeID = document.getElementById('poke-id');

let infoType = document.getElementById('info-type');
let infoHP = document.getElementById('info-hp');
let infoSP = document.getElementById('info-sp');
let infoATK = document.getElementById('info-atk');
let infoDEF = document.getElementById('info-def');

let key = 0;


async function searchPokemonEvolutions() {
    try {
        let apiEvo = 'https://pokeapi.co/api/v2/evolution-chain';
        let responseEvo = await fetch(`${apiEvo}/${key}`);
        let dataEvo = await responseEvo.json();

        let evo0 = dataEvo.chain.species.name;
        let evo1 = dataEvo.chain.evolves_to[0].species.name;
        let evo2 = dataEvo.chain.evolves_to[0].evolves_to[0].species.name;
     
        displayPokemonEvo(evo0);
        searchPokemonInfo(evo0);
    }
    catch(error) {
        console.log(error);
    }
}

async function searchPokemonInfo(pokemonName) {
    try {
        let api = 'https://pokeapi.co/api/v2/pokemon';
        let response = await fetch(`${api}/${pokemonName}`);
        let data = await response.json();
        
        displayPokemonInfo(data);
    }
    catch(error) {
        pokeName.innerText = ('not found!');
        key = parseInt(pokeID.innerText);
        console.log(error);
    }
}

// // RELOAD APP
// btnSwitch.addEventListener('click', () => {
//     window.location.reload();
// })

// // SEARCH POKEMON
// btnSearch.addEventListener('click', () => {
//     if (pokeInput.value == '') { 
//     pokeName.innerText = 'Zzz... name?'
//     } else {
//     key = pokeInput.value.toLowerCase();
//     searchPokemon();
//     }
// })

// SCROLL POKEMON LIST -->
btnRight.addEventListener('click', () => {
    key += 1;
    searchPokemonEvolutions();
   
})

// SCROLL POKEMON LIST <--
btnLeft.addEventListener('click', () => {
    key -= 1;
    searchPokemonEvolutions(0);
})

// UP 
// btnUp.addEventListener('click', () => {
//     searchPokemonEvolutions();
// })

// // DOWN 
// btnDown.addEventListener('click', () => {

// })

// POPULATE POKEMON INFO + IMAGE
function displayPokemonEvo(pokemonEvolution) {
    pokeName.innerText = pokemonEvolution.toUpperCase();
}

function displayPokemonInfo(pokemonInfo) {
    screen.src = pokemonInfo.sprites.front_default;
    pokeID.innerText = pokemonInfo.id < 10 ? `0${pokemonInfo.id}`:`${pokemonInfo.id}`
    infoType.innerText = `type: ${pokemonInfo.types[0].type.name}`;
    infoHP.innerText = `health: ${pokemonInfo.stats[5].stat.name, pokemonInfo.stats[5].base_stat}`;
    infoSP.innerText = `speed: ${pokemonInfo.stats[0].stat.name, pokemonInfo.stats[0].base_stat}`;
    infoATK.innerText = `attack: ${pokemonInfo.stats[3].stat.name, pokemonInfo.stats[3].base_stat}`;
    infoDEF.innerText = `defence: ${pokemonInfo.stats[4].stat.name, pokemonInfo.stats[4].base_stat}`;  
}


