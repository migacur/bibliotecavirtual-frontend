import React from 'react'
import Back from './Back'
import Spinner from '../Others/Spinner';

const Formulario = ({registarUser, leerInput,isRegister }) => {


  return (
    <form 
    method="POST" 
    action="/crear-cuenta" 
    className="formulario"
    onSubmit={registarUser}>
   
    <p className='form-title'><strong>Registra una cuenta</strong></p>
    <input 
    type="text" 
    placeholder="Ingresa tu usuario" 
    className="input" 
    name="usuario"
    onChange={leerInput}></input>
    <input type="email" 
    placeholder="Ingresa tu email" 
    className="input" 
    name="email"
    onChange={leerInput}></input>
    <input type="password" 
    placeholder="Ingresa tu password" 
    className="input" 
    name="password"
    onChange={leerInput}></input>
    <input type="password" 
    placeholder="Repite la password" 
    className="input" 
    name="repeat"
    onChange={leerInput}></input>
    { isRegister &&
     <div className="login_active_contaienr">
     <Spinner />
     <p className="login_active">Registrando su cuenta...</p>
   </div>

    }
    <input 
    type="submit" 
    value="Registrarme" 
    className="btn-send"></input>

   
    <Back/>

  </form>
  )
}

export default Formulario