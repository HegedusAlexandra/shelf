import React from "react";
import Calendar from "../../components/Calendar";
import { useQuery } from "@apollo/client";
import {GET_BOOKS} from '../../utils/graphql/queries'

export default function DashboardPage() {

  const { loading, error, data } = useQuery(GET_BOOKS);

  console.log(loading,error,data?.getBooks[0]);
  

  return (
    <div className="w-full bg-amber-50 p-[2vw] flex flex-col justify-center items-center">
      <Calendar />
    </div>
  );
}
