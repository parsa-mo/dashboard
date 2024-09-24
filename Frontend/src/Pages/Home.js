import React from "react";
import { Main, Container, Divider } from "../Styles/Universal";
import { NavLink } from "react-router-dom";
import { Chamber, Grid, Environment, Electrolyser } from "../Pages/Pages";

const Home = () => {
  return (
    <Main>
      <Divider />
      <Grid></Grid>
      <Divider />
      <Electrolyser></Electrolyser>
      <Divider />
      <Environment></Environment>
      <Divider />
      <Chamber></Chamber>
    </Main>
  );
};

export default Home;
