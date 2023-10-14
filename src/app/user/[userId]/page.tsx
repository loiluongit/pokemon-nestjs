/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetUserByIdQuery, useGetUsersQuery } from "@/redux/services/userApi";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function User({ params}: { params: { userId: string } }) {

  const { isLoading, isFetching, data: user, error } = useGetUserByIdQuery({ id: params.userId });


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : user ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.name}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 320, width: 320 }}
            />
            <h3>{user.name}</h3>
          </div>
        </div>
      ) : null}
    </main>
  )
}
