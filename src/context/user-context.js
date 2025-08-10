import { createContext, useCallback, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContextoUsuario = createContext();

export const Usuarios = ({ children }) => {
  const [usuario, guardarUsuarios] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const autenticarUser = useCallback(() => {
    clienteAxios
      .get("/verify", {
        withCredentials: true,
      })
      .then((res) => {
        guardarUsuarios(res.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.msg) {
          Swal.fire({
            title: "¡Ha ocurrido un error!",
            text: e.response.data.msg,
            icon: "error",
          });
        }
        logoutUser();
      });
  }, [location.pathname]);

  const logoutUser = () => {
    localStorage.removeItem("user");
    guardarUsuarios(null);
    navigate("/ingresar");
  };

  useEffect(() => {
    if (usuario) {
      autenticarUser();
    }
  }, [usuario, autenticarUser]);

  return (
    <ContextoUsuario.Provider
      value={{ usuario, autenticarUser, guardarUsuarios, logoutUser }}
    >
      {children}
    </ContextoUsuario.Provider>
  );
};
