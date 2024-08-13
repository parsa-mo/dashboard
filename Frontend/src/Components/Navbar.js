import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavContainer,
  NavLogo,
  NavLine,
  NavButtonDiv,
} from "../Styles/NavStyle";
import { Logo } from "../Images/Images";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavLink to="/">
          <NavLogo src={Logo} alt="Logo"></NavLogo>
        </NavLink>
        <NavLink to="/environment">
          <NavButtonDiv>
            <button className="button-82-pushable" role="button">
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Environment</span>
            </button>
          </NavButtonDiv>
        </NavLink>
      </NavContainer>
      <NavLine />
    </>
  );
};

export default Navbar;
