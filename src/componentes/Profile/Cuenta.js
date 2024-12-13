import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Avatar from "./Avatar";
import Aviso from "../Others/Aviso";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Others/Spinner";

const Cuenta = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatar, guardarAvatar] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [account, setAcoount] = useState(null);
  const [chargeAccount, setChargeAccount] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/ingresar");
      return;
    }

    clienteAxios
      .get("/cuenta", {
        withCredentials:true
      })
      .then((res) => {
        setAcoount(res.data.user);
        setChargeAccount(true);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "¡No se puede acceder al perfil!",
          text: e.response?.data?.msg || "Error desconocido",
          icon: "error",
        });
        return navigate("/ingresar")
      });
  }, [user,navigate]);
 
  const subirAvatar = (e) => {
    guardarAvatar(e.target.files[0]);
  };

  const agregarAvatar = (e) => {
    e.preventDefault();

    if (!avatar) {
      return;
    }
    setIsLoad(true);
    const formData = new FormData();

    formData.append("file", avatar);

    clienteAxios
      .post(`/change-avatar/${user._id}`, formData)
      .then((res) => {
        user.avatar = res.data;
        localStorage.setItem("user", JSON.stringify(user));

        if (res.status === 200) {
          Swal.fire("Avatar actualizado Correctamente", "", "success");
          setIsLoad(false);
          navigate("/micuenta");
        }
      })
      .catch((e) => {
        console.log(e);

        Swal.fire({
          title: "No se pudo actualizar el avatar",
          text: e.response.data.msg,
          icon: "error",
        });

        setIsLoad(false);
      });

    guardarAvatar(null);
  };

  if (!chargeAccount) return <Spinner />;

  return (
    <>
      {user ? (
        <div className="book-container">
          <div className="myaccount">
            <div className="myUser">
              <div className="div-avatar">
                {account?.avatar.length ? (
                  <img
                    className="avatar"
                    src={account?.avatar}
                    alt="Avatar predeterminado"
                  />
                ) : (
                  <Avatar classAvatar={"no_avatar"} />
                )}
                <form
                  method="POST"
                  action="/upload-image"
                  encType="multipart/form-data"
                >
                  {!avatar && (
                    <label htmlFor="avatar" className="cambiar-avatar">
                      Cambiar Avatar
                    </label>
                  )}

                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    className="avatar-btn"
                    onChange={subirAvatar}
                    accept=".jpg, .jpeg, .png"
                  />
                  {avatar && (
                    <input
                      type="submit"
                      value="Actualizar avatar"
                      className="upload-avatar"
                      onClick={agregarAvatar}
                    />
                  )}
                </form>
              </div>
              <p className="datos_perfil">
                <span>Usuario</span> {account?.usuario}
              </p>
              <p className="datos_perfil">
                <span>Rango</span> {account?.rol?.slice(0, -5)}{" "}
              </p>
              <p className="datos_perfil">
                <span>Email</span> {account?.email}{" "}
              </p>
              <p className="datos_perfil">
                <span>Libros favoritos</span> {account?.favoritos?.length}
              </p>
              <Link to="/favoritos" className="btn-fav">
                Mis libros favoritos
              </Link>
              {isLoad && <p className="update">Actualizando Avatar...</p>}

              {account?.rol === "ADMIN_ROLE" && (
                <Link to="/administrador">
                  <li className="add-book">
                    <svg
                      className="icon icon-add"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="22px"
                    >
                      <linearGradient
                        id="dyoR47AMqzPbkc_5POASHa"
                        x1="9.858"
                        x2="38.142"
                        y1="-27.858"
                        y2="-56.142"
                        gradientTransform="matrix(1 0 0 -1 0 -18)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#9dffce" />
                        <stop offset="1" stopColor="#50d18d" />
                      </linearGradient>
                      <path
                        fill="#FFD700"
                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                      />
                      <path
                        d="M34,21h-7v-7c0-1.105-0.895-2-2-2h-2c-1.105,0-2,0.895-2,2v7h-7	c-1.105,0-2,0.895-2,2v2c0,1.105,0.895,2,2,2h7v7c0,1.105,0.895,2,2,2h2c1.105,0,2-0.895,2-2v-7h7c1.105,0,2-0.895,2-2v-2	C36,21.895,35.105,21,34,21z"
                        opacity=".05"
                      />
                      <path
                        d="M34,21.5h-7.5V14c0-0.828-0.672-1.5-1.5-1.5h-2	c-0.828,0-1.5,0.672-1.5,1.5v7.5H14c-0.828,0-1.5,0.672-1.5,1.5v2c0,0.828,0.672,1.5,1.5,1.5h7.5V34c0,0.828,0.672,1.5,1.5,1.5h2	c0.828,0,1.5-0.672,1.5-1.5v-7.5H34c0.828,0,1.5-0.672,1.5-1.5v-2C35.5,22.172,34.828,21.5,34,21.5z"
                        opacity=".07"
                      />
                      <linearGradient
                        id="dyoR47AMqzPbkc_5POASHb"
                        x1="22"
                        x2="26"
                        y1="24"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".824" stopColor="#135d36" />
                        <stop offset=".931" stopColor="#125933" />
                        <stop offset="1" stopColor="#11522f" />
                      </linearGradient>
                      <path
                        fill="url(#dyoR47AMqzPbkc_5POASHb)"
                        d="M23,13h2c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-2c-0.552,0-1-0.448-1-1V14	C22,13.448,22.448,13,23,13z"
                      />
                      <linearGradient
                        id="dyoR47AMqzPbkc_5POASHc"
                        x1="13"
                        x2="35"
                        y1="24"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".824" stopColor="#135d36" />
                        <stop offset=".931" stopColor="#125933" />
                        <stop offset="1" stopColor="#11522f" />
                      </linearGradient>
                      <path
                        fill="url(#dyoR47AMqzPbkc_5POASHc)"
                        d="M35,23v2c0,0.552-0.448,1-1,1H14c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h20	C34.552,22,35,22.448,35,23z"
                      />
                    </svg>
                    Agregar Libro
                  </li>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Aviso msg="Error 401- No autorizado para acceder a este enlace" />
      )}
    </>
  );
};

export default Cuenta;
