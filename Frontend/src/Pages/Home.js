import React from "react";
import { Main, Container, Wire1, Wire2, Wire3 } from "../Styles/Universal";
import { NavLink } from "react-router-dom";
import { Electrolyzer, cell, Grid } from "../Images/Images";

const Home = () => {
  return (
    <Main>
      <Container
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <NavLink to={"/grid"}>
          <img src={Grid} alt="Grid" style={{ width: "400px" }} />
        </NavLink>
        <NavLink to={"/electrolyser"}>
          <img
            src={Electrolyzer}
            alt="Electrolyser"
            style={{ width: "400px" }}
          />
        </NavLink>
      </Container>
      <Container
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <NavLink to={"/fuel_cell"}>
          <img src={cell} alt="Cell" style={{ width: "400px" }} />
        </NavLink>
      </Container>
    </Main>
  );
};

export default Home;
