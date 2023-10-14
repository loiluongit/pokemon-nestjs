import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Pokemon = {
  name: string;
  url: string;
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/pokemon",
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query<{ results: Pokemon[] }, { limit: number, offset: number }>({
      query: ({ limit, offset }) => `?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;


// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png 