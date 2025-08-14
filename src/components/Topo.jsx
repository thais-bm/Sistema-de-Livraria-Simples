import React from 'react'
import Logo from './Logo.jsx'
import Navegacao from './Navegacao.jsx'

export const Topo = () => {
  return (
    <header className='topo'>
        <Logo />
        <Navegacao />
    </header>
  )
}

export default Topo;
