import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ContextoUsuario } from '../../context/user-context'


const Login = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const { logoutUser } = useContext(ContextoUsuario)


  const cerrarSesion = () => {

    
    Swal.fire({
      title: '¿Desea cerrar la sesión?',
     showCancelButton: true,
      icon: "warning",
      confirmButtonColor: '#053F5E',
      confirmButtonText: 'Si, cerrar sesión',
     cancelButtonText: 'Cancelar',
     cancelButtonColor: '#ae2900'
     }).then((result) => {
      
      if (result.isConfirmed) {
        logoutUser()
      }
      })   
  }


  return (

    <div className='bar-login'>

        { user?
          <>
        <Link  to='/micuenta' className='enlace-be enlace-be-account'>
    
       { user.avatar  &&
        <img 
              className='avatar-min'
              src={user.avatar} alt="Avatar predeterminado"
        />
        }
              
           <p className='myaccount-enlace'>Mi Cuenta</p>
        </Link>

        <Link  to='/' className='enlace-be enlace-be-sesion' onClick={cerrarSesion}>
        <svg className='svg-icon'
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24"><path d="m2 12 5 4v-3h9v-2H7V8z"/><path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"/></svg>
        Salir
        </Link>
      
        </>
        :
         <>
        <Link  to='/registro' className='enlace-be enlace-be-login'>
        <svg className='svg-icon svg-icon-login'
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"/></svg>
            Registrarme
        </Link>

        <Link  to='/ingresar' className='enlace-be enlace-be-login'>
        <svg className='svg-icon svg-icon-login' 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24"><path d="m10.998 16 5-4-5-4v3h-9v2h9z"/><path d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"/></svg>
            Ingresar
        </Link>

        </>
      }
      

    </div>
  )
}

export default Login