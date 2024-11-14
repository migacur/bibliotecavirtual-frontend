import clienteAxios from "../config/axios"
import parseJwt from "./parseJWT"

const cargarFavoritos = async({auth, setFavorite}) => {
    const tokenID = await parseJwt(auth.token)
    const extraerID = tokenID.id
    const result = await clienteAxios.get(`/mostrarfavoritos/${extraerID}`)
    setFavorite(result.data.favoritos)
}

export default cargarFavoritos