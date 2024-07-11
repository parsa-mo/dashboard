import React from "react";
import { Main, Container } from "../Styles/Universal";
import { NavLink } from "react-router-dom";
import { Electrolyzer } from "../Images/Images";

const Home = () => {
  return (
    <Main>
      <Container>
        <NavLink to={"/electrolyser"}>
          <img
            src={Electrolyzer}
            alt="Electrolyser"
            style={{ width: "400px" }}
          />
        </NavLink>
      </Container>
    </Main>
  );
};

export default Home;
