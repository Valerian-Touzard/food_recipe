import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { RecipeDetail, RecipeDetailType, RecipeType } from "../models/recipeType";


///-----LE CONTEXT -----////
// Typage pour le context
export type ContextType = {
  searchParam: string;
  setSearchParam: (param: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  recipeList: RecipeType[];
  recipeDetail: RecipeDetail | null;
  setRecipeDetail: Dispatch<SetStateAction<null>>;
  handleAddToFavorite: (item: RecipeDetailType | undefined) => void,
  favoritesList: RecipeDetailType[]
};

// On exporte le context pour y accèder dans l'application
export const GlobalContext = createContext<ContextType | undefined>(undefined);
///-----LE CONTEXT -----////

// Ceci est le fournisseur de context
// il permet de passer des informations sans avoir besoins de passer par les props
// dans notre application, il est utilisé au niveaux du fichier "index.tsx"
// Afin de l'utiliser sur l'entièreté de l'application
export const GlobalState = ({ children }: React.PropsWithChildren) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [favoritesList, setFavoritesList] = useState<RecipeDetailType[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSearchParam("");
    }
  };

  const handleAddToFavorite = (getCurrentItem : RecipeDetailType | undefined) =>{
    let cpyFavoriteList = [...favoritesList];
    const index = cpyFavoriteList.findIndex(item => item.id === getCurrentItem?.id);

    if(index === -1){
      cpyFavoriteList.push(getCurrentItem as RecipeDetailType);
    }else{
      cpyFavoriteList.splice(index)
    }
    setFavoritesList(cpyFavoriteList);
  }

  console.log(favoritesList);
  

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetail,
        setRecipeDetail,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte dans les composants enfants
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
