import { fetchPokemonList, fetchPokemonTypes } from './api.js';
import { renderPokemonList, populateTypeFilter } from './ui.js';
import { saveThemePreference, loadThemePreference} from './storage.js';
import { applyFilters } from './filters.js';
import { getFavorites } from './storage.js';

const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('filter-type');
const sortSelect = document.getElementById('sort');
const themeToggle = document.getElementById('toggle-theme');

let allPokemon = [];


document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.toggle('dark-theme', loadThemePreference());

  allPokemon = await fetchPokemonList();
  const types = await fetchPokemonTypes();

  renderPokemonList(allPokemon);
  populateTypeFilter(types);
});


searchInput.addEventListener('input', () => applyFilters(allPokemon));
typeFilter.addEventListener('change', () => applyFilters(allPokemon));
sortSelect.addEventListener('change', () => applyFilters(allPokemon));

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  saveThemePreference(document.body.classList.contains('dark-theme'));
});

const favButton = document.getElementById('show-favorites');
let showingFavorites = false;

favButton.addEventListener('click', () => {
  showingFavorites = !showingFavorites;
  if (showingFavorites) {
    const favoriteIds = getFavorites();
    const favoritePokemon = allPokemon.filter(p => favoriteIds.includes(p.id));
    favButton.textContent = '🔙 Terug naar alle';
    renderPokemonList(favoritePokemon);
  } else {
    favButton.textContent = '⭐ Favorieten';
    renderPokemonList(allPokemon);
  }
});
