import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavContainer,
  NavLogo,
  NavLine,
  NavButtonDiv,
  ButtonsDiv,
} from "../Styles/NavStyle";
import { Logo, HomeIcon } from "../Images/Images";
import HomeIcon1 from "../Images/HomeIcon1.png";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavLink to="/">
          <NavLogo src={Logo} alt="Logo"></NavLogo>
        </NavLink>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ButtonsDiv>
            <NavLink to="/chamber">
              <NavButtonDiv>
                <button className="button-82-pushable" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">Chamber</span>
                </button>
              </NavButtonDiv>
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
          </ButtonsDiv>
          <ButtonsDiv>
            <NavLink to="/">
              <NavButtonDiv>
                <button className="button-82-pushable" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">
                    <img src={HomeIcon1} style={{ width: "120px" }} />
                  </span>
                </button>
              </NavButtonDiv>
            </NavLink>
          </ButtonsDiv>
        </div>
      </NavContainer>
      <NavLine />
    </>
  );
};

export default Navbar;
