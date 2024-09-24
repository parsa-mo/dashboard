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
        <VisualDiv
          style={{
            backgroundColor: "white",
            position: "relative",
            width: "80vw",
          }}
        >
          <img src={chambers} alt="chambers" style={{ width: "90vw" }} />

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
              top: "30px",
              left: "755px",
            }}
          >
            <GaugeOne id="dial2" value="172.62" title="PSI" />
          </div>

          <div
            style={{
              position: "absolute",
              top: "625px",
              left: "352px",
            }}
          >
            <GaugeTwo id="dial2" value="27" title="PSI" />
          </div>

          <div
            style={{
              position: "absolute",
              top: "713px",
              left: "-63px",
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
