import React, { useContext, useEffect, useState } from "react";
import Book from "./Book";
import Spinner from "../Others/Spinner";
import addFavorite from "../../helper/addFavorite";
import { useNavigate, useParams } from "react-router-dom";
import borrarLibro from "../../helper/borrarLibro";
import { ContextoAuth } from "../../context/auth-context";
import editarLibro from "../../helper/editarLibro";
import clienteAxios from "../../config/axios";
import textoBtn from "../../helper/textBtn";
import Swal from "sweetalert2";

const Categorias = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { guardarAuth } = useContext(ContextoAuth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [libros, guardarLibros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { nombre } = useParams();
  
  const consultarAPI = async (page) => {
    try {
      const response = await clienteAxios.get(
        `/libros/${nombre}?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      guardarLibros(response.data.findBooks);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      Swal.fire({
        title: "¡Error!",
        text: "Debes Ingresar/Registrarte para tener acceso a los libros.",
        icon: "error",
      });

      return navigate("/");
    }
  };

  useEffect(() => {
    consultarAPI(1);
  }, [navigate]);

  const handlePageChange = (page) => {
    consultarAPI(page);
  };

  const path = `${window.location.pathname}?page=${currentPage}`;

  if (!libros.length) return <Spinner />;

  return (
    <>
      <div className="book-container">
        {user &&
          libros.map((libro) => (
            <Book
              key={libro._id}
              clase="book"
              enlace={libro.enlace}
              imagen={libro.imagen}
              titulo={libro.titulo}
              categoria={libro.categoria}
              btnfunc={() => addFavorite(user._id, libro._id, navigate, path)}
              text={textoBtn(libros, libro._id, user)}
              borrarLibro={() => borrarLibro(libro._id)}
              editarLibro={() => editarLibro(libro._id, guardarAuth, navigate)}
            />
          ))}
      </div>
      {user && (
        <div className="container-pages">
          {currentPage > 1 && (
            <button
              className="btn-page btn-page-previos"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className="btn-page btn-page-next"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Categorias;
