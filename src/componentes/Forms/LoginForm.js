import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../Others/Spinner";

const LoginForm = ({ loginUser, leerInput, isLogin }) => {
  return (
    <div className="form-container">
      <form
        method="POST"
        action="/login-cuenta"
        className="formulario"
        onSubmit={loginUser}
      >
        <p className="form-title">
          <strong>Ingresa a tu cuenta</strong>
        </p>
        <input
          type="text"
          autoComplete="username"
          placeholder="Ingresa tu usuario"
          className="input"
          name="usuario"
          onChange={leerInput}
        ></input>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Ingresa tu password"
          className="input"
          name="password"
          onChange={leerInput}
        ></input>
        {isLogin && (
          <div className="login_active_contaienr">
            <Spinner />
            <p className="login_active">Ingresando a tu cuenta...</p>
          </div>
        )}
        <input
          type="submit"
          value="Ingresar"
          className="btn-send"
          onChange={leerInput}
        ></input>
        <div className="ingreso">
          <a href="/registro" className="option-form">
            <small>¿No tienes cuenta?</small>
          </a>
          <Link to="/form-password" className="option-form">
            <small>Olvidé mi cuenta</small>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
