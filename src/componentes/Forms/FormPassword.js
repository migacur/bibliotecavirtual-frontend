import React, { useRef, useState } from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import Spinner from '../Others/Spinner';

const FormPassword = () => {

  const [email, setEmail] = useState('')
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate()
  const  inputEmail = useRef()

    const readEmail = e => setEmail(e.target.value)
    
    const sendCode = async e => {
        e.preventDefault()
        setIsReady(true)
        if(!email){
          Swal.fire({
            title: 'Ha ocurrido un error',
            text: 'Debes agregar un email válido y registrado en la web.',
            icon: 'error',
          })

          return;
        }

        try {
          const res = await clienteAxios.post('/forgot-password', {email: email})

          if(res.status === 200){
            Swal.fire(
              'Código Enviado',
              'Revise la bandeja de su correo electrónico',
              'success'
            )
            setIsReady(false)
            setEmail('')
            inputEmail.current.value = ''
            navigate("/recover-pass")
          }

        } catch (e) {
          console.log(e);
          Swal.fire({
            title: 'Ha ocurrido un error',
            text: e.response.data.msg,
            icon: 'error',
          })
        }
        setIsReady(false)
    }

    

  return (
    <div className='book-container'>
    <div className='form-recover'>
    <form 
    method="POST" 
    action="/forgot-password" 
    className="form-password"
    onSubmit={sendCode}>
    <p className='form-title'><strong>Recuperar mi cuenta</strong></p>
    <div className='form-box'>
    {isReady && (
          <div className="login_active_contaienr">
            <Spinner />
            <p className="login_active">Enviando Código...</p>
          </div>
        )}
    <input type="email" 
    placeholder="Ingresa tu email registrado" 
    className="input" 
    name="email"
    ref={inputEmail}
    onChange={readEmail}></input>
    <input 
    type="submit" 
    value="Enviar Código de recuperación" 
    className="btn-send"></input>
</div>
  </form>
  </div>
  </div>
  )
}

export default FormPassword