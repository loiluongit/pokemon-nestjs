/* eslint-disable @next/next/no-img-element */
"use client";

import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { Pokemon, addPokemon } from "@/redux/features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPokemonsQuery } from "@/redux/services/pokemonApi";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export default function Pokemons() {

	const pokemonList = useAppSelector((state) => state.pokemonReducer.list);
	const dispatch = useAppDispatch();
	const isLoadingMore = false;
	const [page, setPage] = useState(0)

  const { isLoading, isFetching, data, error } = useGetPokemonsQuery({limit: 20, offset: 0});

	// const loadMore = () => {
	// 	console.log('loadMore');
  // 	const { isLoading, isFetching, data, error } = useGetPokemonsQuery({limit: 20, offset: 0});
		
	// 	// await ?
	// 	dispatch(addPokemon(data.results as Pokemon[]));
	// }

	useEffect(() => {
		function checkScroll() {
			if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
				console.log("bottom reached");
				setPage(page + 1);
			}
		}
		document.addEventListener('scroll', checkScroll)
		return () => {
			document.removeEventListener('scroll', checkScroll)
		}
	});

	useEffect(() => {
		setPage(1);
	}, [])

	const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

	async function fetchPokemons(newPage: number) {
		const response = await fetch(`${BASE_URL}?limit=20&offset=${(newPage - 1) * 20}`);
		const { results } = await response.json();
		dispatch(addPokemon(results as Pokemon[]));
	}



	useEffect(() => {
		fetchPokemons(page);
	}, [page]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          { pokemonList.map((pokemon, index) => (
            <div
              key={pokemon.name}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
								alt={pokemon.name}
								style={{ height: 180, width: 180 }}
							/>
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
    </main>
  )
}
