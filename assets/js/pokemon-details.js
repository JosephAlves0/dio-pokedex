function getPokemonIdFromUrl(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const pokemonId = getPokemonIdFromUrl('pokemon')


pokeDetailsApi.getPokemons(pokemonId)
    .then((pokemon) => {
        console.log(pokemon)
        const newHtmlPokemonDetail = `
            <section class="content ${pokemon.type}">
                <div class="information">
                    <div class="name_type">
                        <span class="name">${pokemon.name}</span>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <span class="number">#${pokemon.number}</span>
                </div>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

                <div class="other_information">
                    <p>Type: <span>${pokemon.type}</span> </p>
                    <p>Height: <span>${pokemon.height / 10}cm</span> </p>
                    <p>Weight: <span>${pokemon.weight / 10}kg</span> </p>
                    <p>Abilities: <span>${pokemon.abilities.join(', ')}</span> </p>
                </div>
            </section>
        `

        document.body.insertAdjacentHTML('afterbegin', newHtmlPokemonDetail)
    });