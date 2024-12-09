import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const addFavorite = (userId, bookId, navigate, path) => {

  const user = JSON.parse(localStorage.getItem("user"));
 
    clienteAxios.post(`/usuario-favoritos/${userId}`, {_id: bookId}, {
     withCredentials:true
    })
    .then(res => {
      if(res.status === 200){
        user.favoritos.push(bookId)
        localStorage.setItem("user", JSON.stringify(user))
       Swal.fire(
          '',
          res.data.msg,
          'success'
        )
        navigate(path)
      }
      }).catch(e => {
        Swal.fire({
          title: '¡Error!',
          text: e.response.data.msg,
          icon: 'error'
      }) 
    });
  }

export default addFavorite;
  