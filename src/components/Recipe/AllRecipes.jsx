import React from "react";
import Button from "../Button";

const AllRecipes = ({ listOfCakeId, setCakeId, setCurrentView, userId }) => {
  console.log(listOfCakeId);

  return (
    <div className="z-10 text-sm flex flex-col w-[84%] h-min-screen xl:w-[60%] my-[4vh] xl:p-[1vw] p-[2vw] bg-[#fff] backdrop-blur-lg rounded-lg box-shadow">
      <div className="h-[30vh] w-full flex flex-col justify-start mt-[2vh] pt-[1vh]">
        <div className="-translate-y-[3vh] h-[20vh] bg-pink bg-cover bg-no-repeat text-white uppercase rounded-md flex justify-center items-center">
          kép feltöltése
        </div>
        {/* headline */}
        <div className="w-full flex flex-row items-center">
          <h1 className="text-[5vh] flex-1 flex justify-start py-[2vw] text-stone-600">
            Összes recept
          </h1>
          <div className="w-[30%] flex flex-row items-center">
            <Button
              label="vissza a receptekhez"
              size="sm"
              variant="primary"
              onClick={() => {
                setCurrentView("search");
                setCakeId("");
              }}
            >
              search
            </Button>
          </div>
        </div>
        {/* sum of ingredients */}
        <div></div>
        {/* readviews */}
        
      </div>
    </div>
  );
};
export default AllRecipes;
