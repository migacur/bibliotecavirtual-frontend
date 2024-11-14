import React, { useState } from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ConfirmarPass = () => {

    const token = localStorage.getItem('token')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [isReady, setIsReady] = useState(false)

    const leerEmail = e => setEmail(e.target.value)
    const leerCodigo = e => setCode(e.target.value)   
    const navigate = useNavigate()

    const confirmarEmail = async e => {
        e.preventDefault()
        setIsReady(true)
        try {
            const res = await clienteAxios.put('codigo-confirmacion', {email, code}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if(res.status === 200){
                Swal.fire(
                    'Correo confirmado',
                    'Tu correo ha sido confirmado existosamente!',
                    'success'
                  )
                  setIsReady(false)
                  navigate("/micuenta")
            }
        } catch (e) {
            Swal.fire({
                title: 'Ha ocurrido un error',
                text: e.response.data.msg,
                icon: 'error',
              })
              setIsReady(false)
        }      
    }


  return (
    <div className='book-container'>
         <div className='form-recover'>
    <form 
  method="PUT" 
  action="/codigo-confirmacion" 
  className="form-password"
  onSubmit={confirmarEmail}>
  <p className='form-title'><strong>Confirma tu correo electrónico</strong></p>
  <div className='form-box'>
  <input type="email" 
  placeholder="Vuelve a ingresar tu email registrado" 
  className="input" 
  name="email"
  onChange={leerEmail}></input>
  <input type="text" 
  placeholder="Ingresa el código de recuperación" 
  className="input" 
  name="code"
  onChange={leerCodigo}></input>
  <input 
  type="submit" 
  value="Confirmar Correo" 
  className="btn-send"></input>
  {isReady && <p>Enviando...</p>}
</div>
</form>
</div>
  </div>
  )
}

export default ConfirmarPass