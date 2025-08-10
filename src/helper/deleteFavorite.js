import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const deleteFavorite = (userId, bookId, reload, setReload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  clienteAxios
    .put(
      `/borrar-favorito/${userId}`,
      { _id: bookId },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      user.favoritos.splice(bookId, 1);
      localStorage.setItem("user", JSON.stringify(user));
      if (res.status === 200) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Si, eliminar!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Eliminado!",
              "Este libro ya NO se encuentra en tus favoritos",
              "success"
            );
            setReload(!reload);
          }
        });
      }
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

export default deleteFavorite;
