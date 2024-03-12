import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../../context";

const Details = () => {
  const { id } = useParams();
  const { recipeDetail, setRecipeDetail } = useGlobalState();

  useEffect(() => {
    getRecipeDetails();
  }, []);

  const getRecipeDetails = async () => {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();

    if (data?.data) {
      setRecipeDetail(data?.data);
    }
  };

  console.log(recipeDetail);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetail?.recipe.image_url}
            alt={recipeDetail?.recipe.title}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-cyan-700 font-medium">
            {recipeDetail?.recipe.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-black">
            {recipeDetail?.recipe.title}
          </h3>
        </div>
        <div>
          <button className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">Save as favorites</button>
        </div>
        
      </div>
    </div>
  );
};

export default Details;
