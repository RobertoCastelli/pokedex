/*
 * TODO
 * mettere easter egg
 * sistemare search
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

let index = 0;
let evoPhase = 0;

async function searchPokemon(num) {
    try {
        if (index <= 0) init();
        let apiEvo = 'https://pokeapi.co/api/v2/evolution-chain';
        let responseEvo = await fetch(`${apiEvo}/${index}`);
        let dataEvo = await responseEvo.json();

        switch (num) {
            case 0:
                evo = dataEvo.chain.species.name;
                break;
            case 1:
                evo = dataEvo.chain.evolves_to[0].species.name;
                break;
            case 2:
                evo = dataEvo.chain.evolves_to[0].evolves_to[0].species.name;    
                break;
        }

         searchPokemonInfo(evo);
    }
    catch(error) {
        console.log(error, 'Index < 0')
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
        index = parseInt(pokeID.innerText);
        console.log(error);
    }
}

function displayPokemonInfo(pokemonInfo) {
    pokeName.innerText = pokemonInfo.name.toUpperCase();
    screen.src = pokemonInfo.sprites.front_default;
    pokeID.innerText = pokemonInfo.id < 10 ? `0${pokemonInfo.id}`:`${pokemonInfo.id}`
    infoType.innerText = `type: ${pokemonInfo.types[0].type.name}`;
    infoHP.innerText = `health: ${pokemonInfo.stats[5].stat.name, pokemonInfo.stats[5].base_stat}`;
    infoSP.innerText = `speed: ${pokemonInfo.stats[0].stat.name, pokemonInfo.stats[0].base_stat}`;
    infoATK.innerText = `attack: ${pokemonInfo.stats[3].stat.name, pokemonInfo.stats[3].base_stat}`;
    infoDEF.innerText = `defence: ${pokemonInfo.stats[4].stat.name, pokemonInfo.stats[4].base_stat}`;  
}

// RELOAD APP
btnSwitch.addEventListener('click', () => {
    init();
})

// SEARCH POKEMON
btnSearch.addEventListener('click', () => {
    if (pokeInput.value == '') { 
        pokeName.innerText = 'Zzz... name?'
    } else {
        pokemonName = pokeInput.value.toLowerCase();
        searchPokemonInfo(pokemonName);
        index = parseInt(pokeID.innerText);

    }
})

// RESET
function init() {
    index = 0;
    pokeName.innerText = 'Who am I?';
    pokeID.innerText = '00';
    infoType.innerText = '';
    infoHP.innerText = '';
    infoSP.innerText = '';
    infoATK.innerText = '';
    infoDEF.innerText = '';
    screen.src= 'img/bras.png';
}

// SCROLL POKEMON LIST -->
btnRight.addEventListener('click', () => {
    index += 1;
    evoPhase = 0;
    searchPokemon(0);
})

// SCROLL POKEMON LIST <--
btnLeft.addEventListener('click', () => {
    index -= 1;   
    evoPhase = 0;
    searchPokemon(0);
})

// CHAIN EVOLUTION UP 
btnUp.addEventListener('click', () => {
    evoPhase >= 2 ? evoPhase = 2 : evoPhase +=1;
    searchPokemon(evoPhase);
})

// CHAIN EVOLUTION DOWN
btnDown.addEventListener('click', () => {
    evoPhase <= 0 ? evoPhase = 0 : evoPhase -=1;
    searchPokemon(evoPhase);
})





