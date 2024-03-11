import React, {
  useState,
  createContext,
  useContext,
  FormEventHandler,
} from "react";

///-----LE CONTEXT -----////
// Typage pour le context
export type ContextType = {
  searchParam: string;
  setSearchParam: (param: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};

// On exporte le context pour y accèder dans l'application
export const GlobalContext = createContext<ContextType | undefined>(undefined);
///-----LE CONTEXT -----////


// Ceci est le fournisseur de context
// il permet de passer des informations sans avoir besoins de passer par les props
// dans notre application, il est utilisé au niveaux du fichier "index.tsx"
// Afin de l'utiliser sur l'entièreté de l'application
export const GlobalState = ({ children }: React.PropsWithChildren) => {
  const [searchParam, setSearchParam] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte dans les composants enfants
export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
