import React, { useEffect, useState } from 'react'
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useNavigate  } from "react-router-dom";
import Formulario from './Formulario';
import Aviso from '../Others/Aviso';


const Registro = () => {

 const user = JSON.parse(localStorage.getItem("user"));
 const [isRegister,setIsRegister]=useState(false)
 const [errors, setErrors] = useState([]);
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

    } catch (e) {
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      }if(e.response.data.msg){
        Swal.fire({
          title: "",
          text: e.response.data.msg,
          icon: "error",
        });
      }
      
  }
    setIsRegister(false)
  }
console.log(errors)
  return (
    
    <div className='form-container'>
      { user?
          <Aviso msg="Ya tienes una sesión iniciada, redireccionando..."/>
          :       
          <Formulario registarUser={registarUser}
                      leerInput={leerInput} 
                      isRegister={isRegister}
                      errors={errors}
          />
      }


  </div>
  

  )
}

export default Registro