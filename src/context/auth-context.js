import { createContext, useState } from "react";

export const ContextoAuth = createContext()

export const Auth = ({ children }) => {

    const [auth, guardarAuth] = useState(null)


    return (

        <ContextoAuth.Provider value={ { auth, guardarAuth } }>
            {children}
        </ContextoAuth.Provider>
    )
}