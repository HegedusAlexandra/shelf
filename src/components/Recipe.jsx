import React from "react";
import TextInput from "./TextInput";
import { useQuery } from "@apollo/client";
import { GET_INGREDIENTS } from "../utils/graphql/queries";
import Drop from "./Drop";

export default function Recipe() {

  const { loading, error, data } = useQuery(GET_INGREDIENTS);

  console.log(loading,error,data?.getIngredients.map(el => el.name));
  

  return (
    <div className="flex flex-col h-[70vh] px-[2vw]">
      <div className="w-full flex flex-row">
        <TextInput label="Név" />
      </div>
      <div className="w-full flex flex-row">
        <Drop label="Hozzávalók" options={data?.getIngredients} />
      </div>
      <div className="w-full flex flex-row">
        <TextInput label="Lépések" />
      </div>
    </div>
  );
}
