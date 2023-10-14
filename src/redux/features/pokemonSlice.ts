import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Pokemon = {
  name: string
  image: string
}

type PokemonState = {
  list: Pokemon[],
  currentPage: number,
}

const initialState = {
  list: [] as Pokemon[],
  currentPage: 1,
}

export const pokemonSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addPokemon(state, action: PayloadAction<Pokemon[]>) {
      state.list = [
        ...state.list,
        ...action.payload
      ]
    }
  },
});

export const {
  addPokemon
} = pokemonSlice.actions;
export default pokemonSlice.reducer;