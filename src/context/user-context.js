import { createContext, useCallback, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContextoUsuario = createContext()

export const Usuarios = ({ children }) => {

    const [usuario, guardarUsuarios] = useState(null)
    const navigate = useNavigate()

    const autenticarUser = useCallback(() => {
     
            clienteAxios.get('/verify', {
               withCredentials:true
            })
            .then(res => {
                guardarUsuarios(res.data)
            })
            .catch(error => {
                Swal.fire({
                    title: 'Su sesión ha expirado',
                   showCancelButton: false,
                    icon: "warning",
                    confirmButtonColor: '#053F5E',
                    confirmButtonText: 'Entendido, volver a ingresar',
                   }).then((result) => {
                    if (result.isConfirmed) {
                      logoutUser()
                    } 
                    })  

            })
        
    },[navigate])

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