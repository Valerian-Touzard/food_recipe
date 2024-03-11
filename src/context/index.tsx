import React, {
  useState,
  createContext,
  useContext,
} from "react";

///-----LE CONTEXT -----////
// Typage pour le context
export type ContextType = {
  searchParam: string;
  setSearchParam: (param: string) => void;
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

  return (
    <GlobalContext.Provider value={{ searchParam, setSearchParam }}>
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
