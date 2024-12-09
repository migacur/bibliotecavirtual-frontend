import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ContextoAuth } from "../../context/auth-context";
import Aviso from "../Others/Aviso";

const Editar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { auth, guardarAuth } = useContext(ContextoAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    }
  }, [auth,navigate]);



  const [imagen, guardarImagen] = useState("");
  const [category, setCategory] = useState(auth?.categoria);

  const editarLibro = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", auth.titulo);
    formData.append("file", imagen);
    formData.append("enlace", auth.enlace);
    formData.append("categoria", category);

    try {
      const res = await clienteAxios.put(
        `/update-book/${auth?._id}`,
        formData,
        {
          "Content-Type": "multipart/form-data",
         withCredentials:true
        }
      );
      if (res.status === 200) {
        Swal.fire("", "El libro fue editado correctamente", "success");
      }

      navigate("/");
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "",
        text: e.response.data.msg,
        icon: "error",
      });
    }
  };

  const leerCampo = (e) => {
    guardarAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const subirPortada = (e) => {
    guardarImagen(e.target.files[0]);
  };

  const cambiarCategoria = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="form-container">
      {user?.rol === "ADMIN_ROLE" && auth ? (
        <form
          method="PUT"
          encType="multipart/form-data"
          className="formulario"
          onSubmit={editarLibro}
        >
          <p className="form-title">
            <strong>Editar libro</strong>
          </p>
          <small className="subform">
            Modifica los campos que deseas actualizar
          </small>
          <input
            type="text"
            placeholder="Ingresa el nombre o título"
            className="input"
            defaultValue={auth?.titulo}
            name="titulo"
            onChange={leerCampo}
          ></input>
          <input
            type="text"
            placeholder="Ingresa el enlace"
            defaultValue={auth?.enlace}
            className="input"
            name="enlace"
            onChange={leerCampo}
          ></input>

          <label className="category-title">Elige la categoría:</label>
          <select
            onChange={cambiarCategoria}
            defaultValue={auth?.categoria}
            className="select-book"
          >
            <option value="">--- Elige la categoría ---</option>
            <option value="diversificado">Ciclo Diversificado</option>
            <option value="mecanica">Núcleo Mecánico</option>
            <option value="quimica">Núcleo Químico</option>
            <option value="hidrocarburos">Núcleo Hidrocarburos</option>
            <option value="electricidad">Núcleo Eléctrico</option>
          </select>

          {auth?.imagen ? (
            <img
              src={`${auth.imagen}`}
              alt="imagen"
              className="book-look"
              width="130"
            />
          ) : (
            <small className="image-error">
              Error al cargar la imagen actual
            </small>
          )}

          <label htmlFor="portada" className="cambiar-portada cambiar-btn">
            Cambiar Imagen
          </label>

          <input
            type="file"
            id="portada"
            name="portada"
            className="avatar-btn"
            onChange={subirPortada}
            accept=".jpg, .jpeg, .png"
          />
          <input
            type="submit"
            value="Editar libro"
            className="btn-send"
          ></input>
        </form>
      ) : (
        <Aviso
          msg="Ha ocurrido un error al editar el libro, 
    redireccionando al home de la web..."
        />
      )}
    </div>
  );
};

export default Editar;
