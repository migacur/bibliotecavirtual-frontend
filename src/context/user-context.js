import { createContext, useCallback, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useLocation } from "react-router-dom";

export const ContextoUsuario = createContext();

export const Usuarios = ({ children }) => {
    const [usuario, guardarUsuarios] = useState(() => {
        // Obtener el usuario de localStorage al cargar el componente
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const location = useLocation();

    const autenticarUser = useCallback(() => {
        clienteAxios.get('/verify', {
            withCredentials: true
        })
        .then(res => {
            guardarUsuarios(res.data);
        })
        .catch(e => {
            console.log(e);
            if (location.pathname !== "/") {
                logoutUser();
            }
        });
    }, [location.pathname]);

    const logoutUser = () => {
        localStorage.removeItem("user");
        guardarUsuarios(null);
        window.location.href = "/";
    };

    useEffect(() => {
        autenticarUser();
    }, [autenticarUser]);

    return (
        <ContextoUsuario.Provider value={{ usuario, autenticarUser, guardarUsuarios, logoutUser }}>
            {children}
        </ContextoUsuario.Provider>
    );
};
