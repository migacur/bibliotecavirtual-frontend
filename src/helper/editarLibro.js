import clienteAxios from "../config/axios";

const editarLibro = async (id, saveBook, redirect) => {
  const accesToken = localStorage.getItem('token')

    await clienteAxios.get(`/mostrar-libro/${id}`, {
      headers: { Authorization: `Bearer ${accesToken}` }
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