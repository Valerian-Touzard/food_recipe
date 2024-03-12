import React from "react";
import { useGlobalState } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Favorites = () => {
  const { favoritesList } = useGlobalState();

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((favorite) => (
          <RecipeItem key={favorite.id} recipe={favorite} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
