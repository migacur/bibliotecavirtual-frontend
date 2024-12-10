import { createContext, useCallback, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useLocation, useNavigate } from "react-router-dom";

export const ContextoUsuario = createContext()

export const Usuarios = ({ children }) => {

    const [usuario, guardarUsuarios] = useState(null)
    const navigate = useNavigate()
    const location = useLocation();

    const autenticarUser = useCallback(() => {
     
            clienteAxios.get('/verify', {
               withCredentials:true
            })
            .then(res => {
                guardarUsuarios(res.data)
            })
            .catch(e => {
              console.log(e)
              if(location.pathname !== "/"){
                logoutUser()
              }
            })
        
    },[])

    const logoutUser = () => {

        localStorage.removeItem("user")
        guardarUsuarios(null)
        navigate("/ingresar")
    }

    useEffect(() => {
        autenticarUser()
    },[autenticarUser])


    return (

        <ContextoUsuario.Provider value={
             { usuario, autenticarUser, guardarUsuarios, logoutUser } }>
            {children}
        </ContextoUsuario.Provider>
    )
}