import React from "react";
import { NavContainer, NavLogo } from "../Styles/NavStyle";
import { Logo, HomeIcon } from "../Images/Images";
import { transition } from "d3";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavLogo src={Logo} alt="Logo"></NavLogo>
        <h1
          style={{
            color: "crimson",
            fontSize: "3.5rem",
            fontWeight: "bolder",
            marginRight: "33%",
          }}
        >
          Hydrogen 4.0
        </h1>

        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    flexDirection: "row",*/}
        {/*    alignItems: "center",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <ButtonsDiv>*/}
        {/*    <NavLink to="/chamber">*/}
        {/*      <NavButtonDiv>*/}
        {/*        <button className="button-82-pushable" role="button">*/}
        {/*          <span className="button-82-shadow"></span>*/}
        {/*          <span className="button-82-edge"></span>*/}
        {/*          <span className="button-82-front text">Chamber</span>*/}
        {/*        </button>*/}
        {/*      </NavButtonDiv>*/}
        {/*    </NavLink>*/}
        {/*    <NavLink to="/environment">*/}
        {/*      <NavButtonDiv>*/}
        {/*        <button className="button-82-pushable" role="button">*/}
        {/*          <span className="button-82-shadow"></span>*/}
        {/*          <span className="button-82-edge"></span>*/}
        {/*          <span className="button-82-front text">Environment</span>*/}
        {/*        </button>*/}
        {/*      </NavButtonDiv>*/}
        {/*    </NavLink>*/}
        {/*  </ButtonsDiv>*/}
        {/*  <ButtonsDiv>*/}
        {/*    <NavLink to="/">*/}
        {/*      <NavButtonDiv>*/}
        {/*        <button className="button-82-pushable" role="button">*/}
        {/*          <span className="button-82-shadow"></span>*/}
        {/*          <span className="button-82-edge"></span>*/}
        {/*          <span className="button-82-front text">*/}
        {/*            <img src={HomeIcon1} style={{ width: "80px" }} />*/}
        {/*          </span>*/}
        {/*        </button>*/}
        {/*      </NavButtonDiv>*/}
        {/*    </NavLink>*/}
        {/*  </ButtonsDiv>*/}
        {/*</div>*/}
      </NavContainer>
    </>
  );
};

export default Navbar;
