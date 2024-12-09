import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const confirmarCorreo = async(userId, navigate, estado)=> {
    estado(true)

    await clienteAxios.put(`/confirmar-correo/${userId}`, {
        withCredentials:true
    })
    .then(res => {
        if(res.status === 200){
            Swal.fire(
                'Código enviado',
                'El código se te ha enviado, ya puedes confirmar tu correo',
                'success'
              )
        }
        estado(false)
        navigate("/confirmar-password")
    })
    .catch(e => {
        console.log(e)
        Swal.fire({
            title: 'Ha ocurrido un error',
            text: e.response.data.msg,
            icon: 'error',
          })
        estado(false)
    })
}

export default confirmarCorreo;