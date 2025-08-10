import { createContext, useState } from "react";

export const ContextoBusqueda = createContext();

export const SearchContext = ({ children }) => {
  const [books, busquedaLibros] = useState([]);

  return (
    <ContextoBusqueda.Provider value={{ books, busquedaLibros }}>
      {children}
    </ContextoBusqueda.Provider>
  );
};
