import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../../context/user-context";
import LoginForm from "./LoginForm";
import Aviso from "../Others/Aviso";

const Ingresar = () => {
  const { autenticarUser } = useContext(ContextoUsuario);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      setTimeout(() => {
        return navigate("/");
      }, 2000);
  }, [user]);

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
      const res = await clienteAxios.post("/loginaccount", login);
      if (res.status === 200) {
        Swal.fire(
          `¡Hola ${login.usuario}!`,
          "¡Has ingresado correctamente!",
          "success"
        );
     
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userInfo));

        autenticarUser();

        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        title: "¡Error al ingresar!",
        text: error.response.data.msg,
        icon: "error",
      });
    }
    setIsLogin(false);
  };

  return (
    <LoginForm loginUser={loginUser} leerInput={leerInput} isLogin={isLogin} />
  );
};

export default Ingresar;
