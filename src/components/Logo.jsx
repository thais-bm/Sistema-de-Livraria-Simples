// Logo.js
import React from 'react'
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <div className='logo'>
        <img src="/imagens/logo.png" alt="logo" />
      </div>
    </Link>
  )
}

export default Logo;

