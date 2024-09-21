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
  GaugeOne,
  GaugeTwo,
  GaugeThree,
} from "../ChamberComponents/chamberComponents";

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

          <div
            style={{
              position: "absolute",
              top: "300px",
              left: "1530px",
            }}
          >
            <GaugeOne id="dial2" value="172.62" title="PSI" />
          </div>

          <div
            style={{
              position: "absolute",
              top: "1540px",
              left: "715px",
            }}
          >
            <GaugeTwo id="dial2" value="27" title="PSI" />
          </div>

          <div
            style={{
              position: "absolute",
              top: "1730px",
              left: "-160px",
            }}
          >
            <GaugeThree id="dial3" value="0" title="PSI" />
          </div>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Chamber;
