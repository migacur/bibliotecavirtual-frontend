import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { ContextoBusqueda } from "../../context/search-context";
import Spinner from "../Others/Spinner";

const Buscador = () => {
  const { busquedaLibros } = useContext(ContextoBusqueda);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const input = useRef();
  const [isLoad, setIsLoad] = useState(false);

  const buscarItem = (e) => {
    setBusqueda(e.target.value.trim());
  };

  const enviarBusqueda = (e) => {
    e.preventDefault();

    if (busqueda.length < 3) {
      Swal.fire({
        title: "Error en la búsqueda",
        text: "Debes ingresar al menos 3 caracteres",
        icon: "error",
      });
      setBusqueda("");
      input.current.value = "";
      return;
    }

    clienteAxios
      .get(`buscar/${busqueda}`, {
        withCredentials: true,
      })
      .then((res) => {
        busquedaLibros(res.data);
        setIsLoad(true);

        setBusqueda("");
        input.current.value = "";

        navigate("/busqueda");
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "Tienes que ingresar para realizar esta acción",
          icon: "error",
        });
        setBusqueda("");
        input.current.value = "";
      });

    if (!isLoad) return <Spinner />;
  };

  return (
    <form className="form-search" onSubmit={enviarBusqueda}>
      <input
        type="search"
        onChange={buscarItem}
        className="input-search"
        ref={input}
        placeholder="Buscar libro..."
      />
      <button className="search-icon" type="submit" aria-label="Buscar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
        </svg>
      </button>
    </form>
  );
};

export default Buscador;
