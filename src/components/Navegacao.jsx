// Navegacao.js
import React from "react";
import { NavLink } from "react-router-dom";

const linkCorrente =({isActive}) => ({
  color:isActive ? "#027399" : "inherit",
  fontWeight: isActive ? "bold" : "normal",
});

const itemEstilo = {

}

const Navegacao = () => (
  <nav aria-label="Navegação principal">
    <ul id="nav-bar">
      <li className="nav-bar-item">
        <NavLink
          to='/'
          style={linkCorrente}
          end
          aria-current='page'
        >
          Home
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink
          to='/frontend'
          style={linkCorrente}          
        >
          Frontend
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink
          to='/programacao'
          style={linkCorrente}          
        >
          Programação
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink
          to='/design'
          style={linkCorrente}          
        >
          Design
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink
          to='/catalogo'
          style={linkCorrente}          
        >
          Catálogo
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink
          to='/carrinho'
          style={linkCorrente}          
        >
          Carrinho
        </NavLink>
      </li>
    </ul>
  </nav>
);


export default Navegacao;