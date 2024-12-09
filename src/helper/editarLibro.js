import clienteAxios from "../config/axios";

const editarLibro = async (id, saveBook, redirect) => {

    await clienteAxios.get(`/mostrar-libro/${id}`, {
      withCredentials:true
    })
    .then(res => {
        saveBook(res.data[0]);
        redirect("/editar-libro")
    })
    .catch(e => {
      console.log(e)
    })
  }

  export default editarLibro;