/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetUserByIdQuery, useGetUsersQuery } from "@/redux/services/userApi";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";


export default function Home() {

  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <Link href={`/user/${user.id}`}>
                <img
                  src={`https://robohash.org/${user.name}?set=set2&size=180x180`}
                  alt={user.name}
                  style={{ height: 180, width: 180 }}
                />
              </Link>
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  )
}
