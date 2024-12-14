import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import deleteFavorite from "../../helper/deleteFavorite";
import Aviso from "../Others/Aviso";
import borrarLibro from "../../helper/borrarLibro";
import editarLibro from "../../helper/editarLibro";
import { ContextoAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Book from './../Books/Book';
import Spinner from "../Others/Spinner";


const Favoritos = () => {
  const [favorite, setFavorite] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { guardarAuth } = useContext(ContextoAuth);
  const [reload, setReload] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const mostrarFavoritos = async () => {
      if (!user) return navigate("/ingresar");

      if (favorite)
        await clienteAxios
          .get(`mostrarfavoritos/${user._id}`, {
            withCredentials:true
          })
          .then((res) => {
            setFavorite(res.data);
            setIsLoad(true);
          })
          .catch((e) => {
            console.log(e);
            Swal.fire({
              title: "¡Error!",
              text: e.response.data.msg,
              icon: "error",
            });
          });
    };

    mostrarFavoritos();
  }, [reload,navigate,user]);

  if (!user)
    return <Aviso msg="Error 401- No autorizado para acceder a esta ruta" />;
  if (!isLoad) return <Spinner />;

  return (
    <div className="book-container">
      {favorite.length > 0 ? (
        favorite.map((libro) => (
          <Book
            key={libro._id}
            clase="book"
            enlace={libro.enlace}
            imagen={libro.imagen}
            btnfunc={() =>
              deleteFavorite(user._id, libro._id, reload, setReload)
            }
            text="Eliminar de favoritos"
            borrarLibro={() => borrarLibro(libro._id)}
            editarLibro={() => editarLibro(libro._id, guardarAuth, navigate)}
          />
        ))
      ) : (
        <p className="aviso-favoritos">No hay libros agregados a favoritos</p>
      )}
    </div>
  );
};

export default Favoritos;
