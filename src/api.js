const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
  );

  return pokemonDetails;
}

export async function fetchPokemonTypes() {
  const response = await fetch(`${BASE_URL}/type`);
  const data = await response.json();

  return data.results.filter(type => !['shadow', 'unknown'].includes(type.name));
}
