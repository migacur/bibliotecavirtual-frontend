import clienteAxios from "../config/axios"
import parseJwt from "./parseJWT"

const llamarFavoritos = async({auth, favoritos}) => {
    const tokenID = await parseJwt(auth.token)
    const extraerID = tokenID.id
    const result = await clienteAxios.get(`/mostrarfavoritos/${extraerID}`)
    favoritos(result.data.favoritos)
}

export default llamarFavoritos;