import React, { useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RecoverPass = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const leerEmail = (e) => setEmail(e.target.value);
  const leerCodigo = (e) => setCode(e.target.value);
  const leerPassword = (e) => setPassword(e.target.value);
  const leerPasswordRepeat = (e) => setRepeatPassword(e.target.value);

  const actualizarPassword = async (e) => {
    e.preventDefault();

    if (!email || !code || !password || !repeatPassword) {
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Debes rellenar los campos correctamente",
        icon: "error",
      });
      return;
    }

    try {
      const res = await clienteAxios.post("/reset-password", {
        email,
        code,
        password,
        repeatPassword,
      });

      console.log(res.data.msg);
      if (res.status === 200) {
        Swal.fire(
          "",
          "Se ha realizado el cambio de contraseña, ya puedes ingresar",
          "success"
        );
        navigate("/ingresar");
      }
    } catch (e) {
      Swal.fire({
        title: "Ha ocurrido un error",
        text: e.response.data.msg,
        icon: "error",
      });
    }
  };

  return (
    <div className="book-container">
      <div className="form-recover">
        <form
          method="POST"
          action="/reset-password"
          className="form-password"
          onSubmit={actualizarPassword}
        >
          <p className="form-title">
            <strong>Recuperar mi cuenta</strong>
          </p>
          <div className="form-box">
            <input
              type="email"
              placeholder="Vuelve a ingresar tu email registrado"
              className="input"
              name="email"
              onChange={leerEmail}
            ></input>
            <input
              type="text"
              placeholder="Ingresa el código de recuperación"
              className="input"
              name="code"
              onChange={leerCodigo}
            ></input>

            <input
              type="text"
              placeholder="Ingresa la nueva contraseña"
              className="input"
              name="password"
              onChange={leerPassword}
            ></input>
            <input
              type="text"
              placeholder="Repite la nueva contraseña"
              className="input"
              name="repeatPassword"
              onChange={leerPasswordRepeat}
            ></input>

            <input
              type="submit"
              value="Cambiar la contraseña"
              className="btn-send"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPass;
