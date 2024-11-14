import React, { useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import Aviso from '../Others/Aviso';

const Agregar = () => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const accesToken = localStorage.getItem('token')
  const [libro, guardarLibro] = useState({
    titulo: '',
    imagen: '',
    enlace: '',
    categoria: ''
});
// archivo = state, guardarArchivo = setState
const [imagen, guardarImagen] = useState('');
const [category, setCategory] = useState('')

if(!user) return <Aviso msg="Error 401 - No tienes permiso para acceder a esta ruta"/>

// almacena el nuevo producto en la base de datos.
const agregarLibro = async e => {
    e.preventDefault();

    if(!libro.titulo || !imagen || !libro.enlace || !category){
      Swal.fire({
        title: '',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
      })
      return;
    } 

    // crear un formdata
    const formData = new FormData();
    formData.append('titulo', libro.titulo);
    formData.append('file', imagen);
    formData.append('enlace', libro.enlace);
    formData.append('categoria', category);


    // almacenarlo en la BD
    try {
        const res = await clienteAxios.post('/add-libro', formData, {
          headers: { Authorization: `Bearer ${accesToken}` }
      });

        if(res.status === 200) {
            Swal.fire(
              '',
              'El libro fue agregado correctamente',
              'success'
            )
        }

        navigate("/")

    } catch (e) {
        console.log(e);
        Swal.fire({
          title: '',
          text: e.response.data.msg,
          icon: 'error',
        })
    }
}

 
  const leerCampo = e => {
    guardarLibro({
      // obtener una copia del state y agregar el nuevo
      ...libro,
      [e.target.name] : e.target.value
    })
  }

  const leerSelect = e => setCategory(e.target.value)
 
  const subirPortada = e => {
    guardarImagen( e.target.files[0] );
  }

  return (
    <div className='form-container'>
    <form 
    method="POST" 
    action="/add-libro" 
    encType='multipart/form-data'
    className="formulario"
    onSubmit={agregarLibro}>
   
    <p className='form-title'><strong>Agrega un libro</strong></p>
    <input 
    type="text" 
    placeholder="Ingresa el nombre o título" 
    className="input" 
    name="titulo"
    onChange={leerCampo}></input>
    <input type="text" 
    placeholder="Ingresa el enlace" 
    className="input" 
    name="enlace"
    onChange={leerCampo}></input>
 
 <label className='category-title'>Elige la categoría:</label>
  <select onChange={leerSelect} className='select-book'>
  <option value="">--- Elige la categoría ---</option>
    <option value="diversificado">Ciclo Diversificado</option>
    <option value="mecanica">Núcleo Mecánico</option>
    <option value="quimica">Núcleo Químico</option>
    <option value="hidrocarburos">Núcleo Hidrocarburos</option>
    <option value="electricidad">Núcleo Eléctrico</option>
  </select>


  <label htmlFor="portada" className='cambiar-portada'>
              Elige la portada
   </label>
              
             
             <input type="file" 
             id="portada" 
             name="portada" 
             className='avatar-btn'
             onChange={subirPortada}
             accept=".jpg, .jpeg, .png" />
    <input 
    type="submit" 
    value="Agregar libro" 
    className="btn-send"></input>


  </form>
  </div>
  )
}

export default Agregar