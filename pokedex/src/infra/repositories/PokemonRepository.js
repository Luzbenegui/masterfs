import { Pokedex } from "pokeapi-js-wrapper";

const PokedexApi = new Pokedex();

export const getCaughtList = () => {
  const caughtList = localStorage.getItem("caught");

  if (caughtList == null) {
    return [];
  }

  return JSON.parse(caughtList);
};

export const isCaught = id => {
  const caughtList = getCaughtList();

  return caughtList.some(_id => _id === id);
};

const retrieveByName = async ({ name }) =>
  await PokedexApi.getPokemonByName(name);

export const retrieve = async ({ offset = 0, limit = 20 } = {}) => {
  // Pedimos el listado de pokemons a la api
  const data = await PokedexApi.getPokemonsList({ offset, limit });

  // Ese listado lo completamos con los datos de cada pokemon, realizando una segunda llamada
  const pokemons = await Promise.all(
    /* Al encerrar las llamadas en un Promise.all, garantizamos que el array se generara cuando todas se hayan resuelto.
    Basicamente estamos mapeando cada result en una llamada que complete los datos */

    data.results.map(retrieveByName)
  );

  return pokemons;
};

export const setCaught = id => {
  const caughtList = getCaughtList();

  if (caughtList == null) {
    localStorage.setItem("caught", JSON.stringify([id]));
  }

  if (!isCaught(id)) {
    localStorage.setItem("caught", JSON.stringify([...caughtList, id]));
  }
};

export const setNotCaught = id => {
  const caughtList = getCaughtList();

  if (caughtList != null) {
    localStorage.setItem(
      "caught",
      JSON.stringify(caughtList.filter(_id => _id !== id))
    );
  }
};
