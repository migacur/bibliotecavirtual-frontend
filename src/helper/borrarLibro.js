import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const borrarLibro = (bookID) => {
  Swal.fire({
    title: "¿Desea borrar el libro seleccionado?",
    showCancelButton: true,
    icon: "warning",
    confirmButtonColor: "#053F5E",
    confirmButtonText: "Si, borrar libro",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#ae2900",
  }).then((result) => {
    if (result.isConfirmed) {
      clienteAxios
        .delete(`/delete-libro/${bookID}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            Swal.fire("", "El libro fue eliminado correctamente", "success");
          }
        })
        .catch((e) => {
          console.log(e);
          Swal.fire({
            title: "Ocurrió un error al eliminar el libro",
            text: e.res.data.msg,
            icon: "error",
          });
        });
    }
  });
};

export default borrarLibro;
