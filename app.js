/*
 * TODO
 * mettere easter egg
 * sistemare search
 * sistemare bug quando c' solo 1 evo
 * metter sound
*/

let screen = document.getElementById('poke-image');
let audio = document.getElementById('audio');

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

init();

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
    screen.src = 'img/bras.png';
    pokeInput.value = '';

    btnLeft.style.color = 'grey'
    btnUp.style.color = 'grey'
    btnDown.style.color = 'grey'
}

// API FOR POKEMON NAME (BASE + EVOLUTION)
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
    catch (error) {

        console.log(error, 'Index < 0')
    }
}

// API FOR POKEMON STATS
async function searchPokemonInfo(pokemonName) {
    try {
        let api = 'https://pokeapi.co/api/v2/pokemon';
        let response = await fetch(`${api}/${pokemonName}`);
        let data = await response.json();
        displayPokemonInfo(data);
    }
    catch (error) {
        pokeName.innerText = ('not found!');
        index = parseInt(pokeID.innerText);
        console.log(error);
    }
}

// DISPLAY POKEMON STATS
function displayPokemonInfo(pokemonInfo) {
    pokeName.innerText = pokemonInfo.name.toUpperCase();
    screen.src = pokemonInfo.sprites.front_default;
    pokeID.innerText = pokemonInfo.id < 10 ? `0${pokemonInfo.id}` : `${pokemonInfo.id}`
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
    } else if (pokeInput.value == 'praseidimio' || pokeInput.value == 'tremotino') {
        pokeName.innerText = 'BLENDER!!! :)';
        btnLeft.style.color = 'burlywood';
    } else {
        pokemonName = pokeInput.value.toLowerCase();
        searchPokemonInfo(pokemonName);
        index = 0;
        btnUp.style.color = 'grey';
        btnDown.style.color = 'grey';
        btnLeft.style.color = 'grey';
        btnUp.disabled = true;
        btnDown.disabled = true;
        btnLeft.disabled = true;
    }
})

// SCROLL POKEMON LIST -->
btnRight.addEventListener('click', () => {
    index += 1;
    evoPhase = 0;
    searchPokemon(0);

    pokeInput.value = '';
    btnLeft.style.color = 'burlywood';
    btnUp.style.color = 'burlywood';
    btnDown.style.color = 'burlywood';
    btnUp.disabled = false;
    btnDown.disabled = false;
    btnLeft.disabled = false;
})

// SCROLL POKEMON LIST <--
btnLeft.addEventListener('click', () => {
    index -= 1;
    evoPhase = 0;
    searchPokemon(0);
})

// CHAIN EVOLUTION UP 
btnUp.addEventListener('click', () => {
    if (evoPhase >= 2) {
        evoPhase = 2;
    } else {
        evoPhase += 1;
    }
    searchPokemon(evoPhase);
})

// CHAIN EVOLUTION DOWN
btnDown.addEventListener('click', () => {
    if (evoPhase <= 0) {
        evoPhase = 0;
    } else {
        evoPhase -= 1
    }
    searchPokemon(evoPhase);
})
