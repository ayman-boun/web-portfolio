import { isFavorite, toggleFavorite } from './storage.js';

const listEl = document.getElementById('pokemon-list');
const filterEl = document.getElementById('filter-type');

export function renderPokemonList(pokemonArray) {
  listEl.innerHTML = ''; // reset de lijst

  pokemonArray.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');

    const types = pokemon.types.map(t => t.type.name).join(', ');
    const favStatus = isFavorite(pokemon.id) ? '★ Verwijder uit favorieten' : '☆ Voeg toe aan favorieten';

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h3>${capitalize(pokemon.name)}</h3>
      <div class="details">
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Gewicht:</strong> ${pokemon.weight}</p>
        <p><strong>Hoogte:</strong> ${pokemon.height}</p>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <button class="fav-btn" data-id="${pokemon.id}">${favStatus}</button>
      </div>
    `;

    card.querySelector('.fav-btn').addEventListener('click', () => {
      toggleFavorite(pokemon.id);
      renderPokemonList(pokemonArray); //  om favorite status te tonen
    });

    listEl.appendChild(card);
  });
}

export function populateTypeFilter(types) {
  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type.name;
    option.textContent = capitalize(type.name);
    filterEl.appendChild(option);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
