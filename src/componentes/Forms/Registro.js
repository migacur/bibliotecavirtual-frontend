import React, { useEffect, useState } from 'react'
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useNavigate  } from "react-router-dom";
import Formulario from './Formulario';
import Aviso from '../Others/Aviso';


const Registro = () => {

 const user = JSON.parse(localStorage.getItem("user"));
 const [isRegister,setIsRegister]=useState(false)
  const navigate = useNavigate();
  
  const [data, guardarData] = useState({
    usuario: '',
    email: '',
    password: '',
    repeat: ''
  })

  useEffect(()=> {
    if(user) 
    setTimeout(()=> {
      return navigate("/")
    },2000)
  },[user,navigate])

      const leerInput = e => {
 
        guardarData({...data, 
          [e.target.name] : e.target.value})

    }

  const registarUser = async e => {
    e.preventDefault()  
    setIsRegister(true)
    try {
      await clienteAxios.post('/crear-cuenta', data,{
        withCredentials:true
      })

      Swal.fire(
        `Usuario ${data.usuario} creado`,
        '¡Ya puedes ingresar!',
        'success'
      )  
      navigate("/ingresar")

    } catch (error) {
      console.log(error)
   
      Swal.fire({
        title: '¡Error!',
        text: error.response.data.msg,
        icon: 'error',
    }) 
    navigate("/ingresar")
    }
    setIsRegister(false)
  }

  return (
    
    <div className='form-container'>
      { user?
          <Aviso msg="Ya tienes una sesión iniciada, redireccionando..."/>
          :       
          <Formulario registarUser={registarUser}
                      leerInput={leerInput} 
                      isRegister={isRegister}
          />
      }


  </div>
  

  )
}

export default Registro