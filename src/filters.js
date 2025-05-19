import { renderPokemonList } from './ui.js';

const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('filter-type');
const sortSelect = document.getElementById('sort');

export function applyFilters(pokemonArray) {
  let filtered = [...pokemonArray];

  // Zoekfilter
  const query = searchInput.value.toLowerCase();
  if (query) {
    filtered = filtered.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  // Typefilter
  const type = typeFilter.value;
  if (type) {
    filtered = filtered.filter(pokemon =>
      pokemon.types.some(t => t.type.name === type)
    );
  }

  // Sortering
  const sortBy = sortSelect.value;
  if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'weight') {
    filtered.sort((a, b) => a.weight - b.weight);
  }

  renderPokemonList(filtered);
}
