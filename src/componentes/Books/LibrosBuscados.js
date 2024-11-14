import React, { useContext } from "react";

import { ContextoBusqueda } from "../../context/search-context";
import Aviso from "../Others/Aviso";
import Book from "./Book";
import addFavorite from "../../helper/addFavorite";
import editarLibro from "../../helper/editarLibro";
import { useNavigate } from "react-router-dom";
import { ContextoAuth } from "../../context/auth-context";
import textoBtn from "../../helper/textBtn";

const LibrosBuscados = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { books } = useContext(ContextoBusqueda);
  const { guardarAuth } = useContext(ContextoAuth);
  const navigate = useNavigate();


  const path = "/busqueda";

  if (!user)
    return (
      <Aviso msg="Debes Ingresar/Registrarte para realizar una búsqueda." />
    );

  return (
    <div className="book-container">
      {books.length > 0 ? (
        books.map((libro) => (
          <Book
            key={libro._id}
            clase="book"
            enlace={libro.enlace}
            imagen={libro.imagen}
            titulo={libro.titulo}
            categoria={libro.categoria}
            btnfunc={() => addFavorite(user._id, libro._id, navigate, path)}
            text={textoBtn(books, libro._id, user)}
            editarLibro={() => editarLibro(libro._id, guardarAuth, navigate)}
          />
        ))
      ) : (
        <Aviso msg="No se encontraron resultados" />
      )}
    </div>
  );
};

export default LibrosBuscados;
