import { createContext, useState } from "react";

export const FavoriteContext = createContext()

export const FavoriteBooks = ({ children }) => {

    const [favorite, setFavorite] = useState([])

    return (

        <FavoriteContext.Provider value={ { favorite, setFavorite } }>
            {children}
        </FavoriteContext.Provider>
    )
}