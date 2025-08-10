const textoBtn = (libros, id, usuario) => {
  let str;

  libros.map((_) => {
    if (usuario.favoritos.includes(id)) {
      return (str = "Agregado a favoritos");
    } else {
      return (str = "Agregar a favoritos");
    }
  });

  return str;
};

export default textoBtn;
