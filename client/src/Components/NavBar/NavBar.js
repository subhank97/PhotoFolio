import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import { ImInstagram } from 'react-icons/im';


function NavBar({ user }) {

  
  return (
    <>
    <Nav>
      <NavLink to="/">
        <ImInstagram size={50}/>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/profile">
          Profile
        </NavLink>
        <NavBtn>
          <NavBtnLink to="/login"> Login </NavBtnLink>
        </NavBtn>
      </NavMenu>
    </Nav>
  </>
  )
}

export default NavBar