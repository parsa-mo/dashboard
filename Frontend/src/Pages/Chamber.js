import React, { useContext, useState } from "react";
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
import { DataContext } from "./Home";

const Chamber = () => {
  const data = useContext(DataContext);
  const tap1 = data?.data?.["Tap1"] ?? 0;
  const tap2 = data?.data?.["Tap2"] ?? 0;
  const tap3 = data?.data?.["Tap3"] ?? 0;
  const tap4 = data?.data?.["Tap4"] ?? 0;
  const tap5 = data?.data?.["Tap5"] ?? 0;
  const tap6 = data?.data?.["Tap6"] ?? 0;
  const tap7 = data?.data?.["Tap7"] ?? 0;
  const tap8 = data?.data?.["Tap8"] ?? 0;
  const tap9 = data?.data?.["Tap9"] ?? 0;
  const tap10 = data?.data?.["Tap10"] ?? 0;
  const tap11 = data?.data?.["Tap11"] ?? 0;

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

          <Valve1 state={tap1} />
          <Valve2 state={tap2} />
          <Valve3 state={tap3} />
          <Valve4 state={tap4} />
          <Valve5 state={tap5} />
          <Valve6 state={tap6} />
          <Valve7 state={tap7} />
          <Valve8 state={tap8} />
          <Valve9 state={tap9} />
          <Valve10 state={tap10} />
          <Valve11 state={tap11} />

          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "755px",
            }}
          >
            <GaugeOne id="dial2" value="0" title="PSI" />
          </div>

          <div
            style={{
              position: "absolute",
              top: "625px",
              left: "352px",
            }}
          >
            <GaugeTwo id="dial2" value="0" title="PSI" />
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
