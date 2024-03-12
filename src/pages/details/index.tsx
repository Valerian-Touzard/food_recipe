import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../../context";

const Details = () => {
  const { id } = useParams();
  const { recipeDetail, favoritesList, setRecipeDetail, handleAddToFavorite } =
    useGlobalState();

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
          <button
            onClick={() => handleAddToFavorite(recipeDetail!.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
              (item) => item.id === recipeDetail!.recipe.id
            ) !== -1
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetail?.recipe.ingredients.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
