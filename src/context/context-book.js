import { createContext, useState } from "react";

export const Contexto = createContext()

export const Datos = ({ children }) => {

    const [libros, guardarLibros] = useState([])

    return (

        <Contexto.Provider value={ { libros, guardarLibros } }>
            {children}
        </Contexto.Provider>
    )
}