import React from "react";
import { NavLink } from "react-router-dom";
import { NavContainer, NavLogo, NavLine } from "../Styles/NavStyle";
import { Logo } from "../Images/Images";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavLink to="/">
          <NavLogo src={Logo} alt="Logo"></NavLogo>
        </NavLink>
        <NavLine />
      </NavContainer>
    </>
  );
};

export default Navbar;
