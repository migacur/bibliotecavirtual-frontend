import Back from "./Back";

const Formulario = ({ registarUser, leerInput, isRegister, errors }) => {
  return (
    <form
      method="POST"
      action="/crear-cuenta"
      className="formulario"
      onSubmit={registarUser}
    >
      <p className="form-title">
        <strong>Registra una cuenta</strong>
      </p>
      <input
        type="text"
        placeholder="Ingresa tu usuario"
        autoComplete="usuario"
        className="input"
        name="usuario"
        onChange={leerInput}
      ></input>
      <input
        type="email"
        placeholder="Ingresa tu email"
        autoComplete="email"
        className="input"
        name="email"
        onChange={leerInput}
      ></input>
      <input
        type="password"
        placeholder="Ingresa tu password"
        autoComplete="password"
        className="input"
        name="password"
        onChange={leerInput}
      ></input>
      <input
        type="password"
        placeholder="Repite la password"
        autoComplete="password"
        className="input"
        name="repeat"
        onChange={leerInput}
      ></input>
      {isRegister && (
        <div className="login_active_contaienr">
          <p className="login_active">Registrando su cuenta...</p>
        </div>
      )}
      {errors.map((error, index) => (
        <li key={index} className="form_error">
          {error.msg}
        </li>
      ))}
      <input type="submit" value="Registrarme" className="btn-send"></input>

      <Back />
    </form>
  );
};

export default Formulario;
