import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_RECIPE } from "../../utils/graphql/queries";
import { useUser } from "../../contexts/UserProvider";

export default function Stock() {
  const user = useUser()
  const { data, loading, error } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id },
  });

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      {data?.getRecipes.map((recipe,index) => (
        <p>{index+1} {recipe.name}</p>
      ))}
    </div>
  );
}
