import React from "react";
import { Main, Container } from "../Styles/Universal";
import { NavLink } from "react-router-dom";
import { Electrolyzer } from "../Images/Images";

const Home = () => {
  return (
    <Main>
      <Container>
        <NavLink to={"/electrolyzer"}>
          <img
            src={Electrolyzer}
            alt="Electrolyzer"
            style={{ width: "400px" }}
          />
        </NavLink>
      </Container>
    </Main>
  );
};

export default Home;
