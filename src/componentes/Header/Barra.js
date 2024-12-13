import React from 'react'
import Login from '../Forms/Login'


const Barra = ({changeMenu, menuAnimated}) => {
  return (
    <div className='barra'>
    <div className='barra-content'>
    <Login/>
    <button 
    onClick={changeMenu}
    ref={menuAnimated}
    type='button'
    aria-label="Menu"
    className='hamburger'>
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
    </button>
  </div>


</div>
  )
}

export default Barra