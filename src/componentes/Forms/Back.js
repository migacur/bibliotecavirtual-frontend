import React from "react";
import { NavLink } from "react-router-dom";

const Back = () => {
  return (
    <div className="ingreso">
      <NavLink to="/ingresar" className="option-form">
        <small>Iniciar Sesión</small>
      </NavLink>
      <NavLink to="/" className="option-form">
        <small>Volver a inicio</small>
      </NavLink>
    </div>
  );
};

export default Back;
