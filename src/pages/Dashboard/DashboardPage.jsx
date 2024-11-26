import React from "react";
import { useQuery } from "@apollo/client";
import {GET_INGREDIENTS} from '../../utils/graphql/queries'
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Center from "./Center";

export default function DashboardPage() {

  const { loading, error, data } = useQuery(GET_INGREDIENTS);

  console.log(loading,error,data?.getIngredients.map(el => el.name));
  

  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center font-parkinsans">
      <LeftColumn/>
      <Center />
      <RightColumn/>
    </div>
  );
}
