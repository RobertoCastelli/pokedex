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

async function searchPokemon() {
    if (key < 1) window.location.reload();
    try {
    let api = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(`${api}/${key}`);
    let data = await response.json();
    getPokemon(data);
    key = parseInt(pokeID.innerText);
    }
    catch(error) {
        pokeName.innerText = ('not found!');
        console.log(error);
    }
}

btnSearch.addEventListener('click', () => {
    if (pokeInput.value == '') { 
    pokeName.innerText = 'Zzz... name?'
    } else {
    key = pokeInput.value.toLowerCase();
    searchPokemon();
    }
})

btnRight.addEventListener('click', () => {
    key += 1;
    searchPokemon();
})

btnLeft.addEventListener('click', () => {
    key -= 1;
    searchPokemon();
})

btnUp.addEventListener('click', () => {
    if (key % 3 == 0) {
        key += 3
        searchPokemon();
    } else {
        while (key % 3 != 0) {
            key += 1;
        }
    }  
    searchPokemon();
})

btnDown.addEventListener('click', () => {
    if (key % 3 == 0) {
        key -= 3
        searchPokemon();
    } else {
        while (key % 3 != 0) {
            key -= 1;
        }
    }  
    searchPokemon();
})


btnSwitch.addEventListener('click', () => {
    window.location.reload();
})

function getPokemon(pokemon) {
    screen.src = pokemon.sprites.front_default;
    pokeName.innerText = `${pokemon.name}`.toUpperCase();
    pokeID.innerText = pokemon.id < 10 ? `0${pokemon.id}`:`${pokemon.id}`
    infoType.innerText = `type: ${pokemon.types[0].type.name}`;
    infoHP.innerText = `health: ${pokemon.stats[5].stat.name, pokemon.stats[5].base_stat}`;
    infoSP.innerText = `speed: ${pokemon.stats[0].stat.name, pokemon.stats[0].base_stat}`;
    infoATK.innerText = `attack: ${pokemon.stats[3].stat.name, pokemon.stats[3].base_stat}`;
    infoDEF.innerText = `defence: ${pokemon.stats[4].stat.name, pokemon.stats[4].base_stat}`;  
}
