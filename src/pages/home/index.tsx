import React, { useContext } from "react";
import { useGlobalState } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
  const { recipeList, loading } = useGlobalState();

  if(loading){
    return <div>Loading... Please wait!</div>
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {
        recipeList && recipeList.length > 0 ? 
        recipeList.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)
        : 
        <div><p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing to show. please search something</p></div>
      }
    </div>
  );
};

export default Home;
