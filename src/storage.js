// Favorieten
const FAV_KEY = 'favorites';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];
  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
}

// Thema
const THEME_KEY = 'dark-theme';

export function saveThemePreference(isDark) {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
}

export function loadThemePreference() {
  return JSON.parse(localStorage.getItem(THEME_KEY)) || false;
}
