import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../../context/user-context";
import LoginForm from "./LoginForm";
import Aviso from "../Others/Aviso";

const Ingresar = () => {
  const { guardarUsuarios, autenticarUser } = useContext(ContextoUsuario);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      setTimeout(() => {
        return navigate("/");
      }, 2000);
  }, [user, navigate]);

  const [login, setLogin] = useState({
    usuario: "",
    password: "",
  });

  const leerInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  if (user)
    return (
      <Aviso msg="Ya tienes una sesión iniciada, redireccionando a la home..." />
    );

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLogin(true);
    try {
      const res = await clienteAxios.post("/loginaccount", login, {
        withCredentials: true,
      });
      if (res.status === 200) {
        Swal.fire(
          `¡Hola ${login.usuario}!`,
          "¡Has ingresado correctamente!",
          "success"
        );
        localStorage.setItem("user", JSON.stringify(res.data.userInfo));

        // Actualizar el estado del usuario en el contexto después de guardar en localStorage
        guardarUsuarios(res.data.userInfo);

        // Llamar a autenticarUser para sincronizar el estado de autenticación
        autenticarUser();

        navigate("/");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
        Swal.fire({
          title: "¡Error al ingresar!",
          text: error.response.data.msg || "Error desconocido del servidor",
          icon: "error",
        });
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        Swal.fire({
          title: "¡Error al ingresar!",
          text: "No se recibió respuesta del servidor",
          icon: "error",
        });
      } else {
        console.error(
          "Error en la configuración de la solicitud:",
          error.message
        );
        Swal.fire({
          title: "¡Error al ingresar!",
          text: error.message,
          icon: "error",
        });
      }
    }
    setIsLogin(false);
  };

  return (
    <LoginForm loginUser={loginUser} leerInput={leerInput} isLogin={isLogin} />
  );
};

export default Ingresar;
