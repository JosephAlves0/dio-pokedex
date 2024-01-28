const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => `
                <a href="pokemon.html" class="pokemon-link">
                    <li class="pokemon ${pokemon.type}">
                        
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                <img src="${pokemon.photo}"
                                    alt="${pokemon.name}">
                            </div>
                    </li>
                </a>    
            `).join('');

            pokemonList.innerHTML += newHtml

            document.querySelectorAll('.pokemon-link').forEach(link => {
                link.addEventListener('click', handlePokemonClick);
            });
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset, limit);
    }
});


function handlePokemonClick(event) {
    event.preventDefault();
    const pokemonNumber = event.currentTarget.querySelector('.number').textContent.substring(1);
    window.location.href = `detail?pokemon=${pokemonNumber}`;
}