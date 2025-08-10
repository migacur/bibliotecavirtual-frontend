import clienteAxios from "../config/axios";

const consultarAPI = async (categoria, guardarLibros) => {
  await clienteAxios
    .get(`/libros/${categoria}`)
    .then((res) => {
      guardarLibros(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default consultarAPI;
