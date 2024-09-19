import React, { useState } from "react";
import {
  Container,
  VisualDiv,
  Title,
  Row,
  SubTitle,
} from "../Styles/Universal";
import chambers from "../Images/chambers.png";
import {
  Valve1,
  Valve2,
  Valve3,
  Valve4,
  Valve5,
  Valve6,
  Valve7,
  Valve8,
  Valve9,
  Valve10,
  Valve11,
} from "../Valves/valves";

const Chamber = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Chamber</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv style={{ backgroundColor: "white", position: "relative" }}>
          <img src={chambers} alt="chambers" />

          <Valve1 />
          <Valve2 />
          <Valve3 />
          <Valve4 />
          <Valve5 />
          <Valve6 />
          <Valve7 />
          <Valve8 />
          <Valve9 />
          <Valve10 />
          <Valve11 />
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Chamber;
