const pokeDetailsApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [ type ] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.abilities = abilities;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    return pokemon;
}

pokeDetailsApi.getPokemons = (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;

    return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}
