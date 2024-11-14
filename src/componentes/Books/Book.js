const Book = ({
  clase,
  enlace,
  imagen,
  btnfunc,
  text,
  editarLibro,
  borrarLibro,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="libro-contenedor">
      <div className={clase}>
        <a href={enlace} target="_blank" rel="noreferrer">
          <img src={imagen} alt="libro" />
        </a>
      </div>
      <button
        className={
          text === "Agregado a favoritos" ? "btn-add is-fav-button" : "btn-add"
        }
        onClick={btnfunc}
      >
        {text}
      </button>
      {user?.rol === "ADMIN_ROLE" && (
        <div className="div-btn">
          <button className="btn-edit" onClick={editarLibro}>
            Editar
          </button>
          <button className="btn-delete" onClick={borrarLibro}>
            Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Book;
