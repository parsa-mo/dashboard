import React from "react";
import { VoltageGauge } from "../DataVisuals/DataVisuals";
import { Container, VisualDiv, Title, Row } from "../Styles/Universal";
import {
  Voltmeter,
  VoltmeterSolar,
  VoltmeterAC,
  Ampmeter,
  AmpmeterAC,
  AmpmeterSolar,
} from "../Images/Images";

const Grid = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title style={{ fontSize: "4rem" }}>Grid Dashboard</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title> AC Power</Title>
          <VoltageGauge
            logo={{ voltmeter: VoltmeterAC, ampmeter: AmpmeterAC }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title> Solar</Title>
          <VoltageGauge
            logo={{ voltmeter: VoltmeterSolar, ampmeter: AmpmeterSolar }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title> Battery</Title>
          <VoltageGauge
            logo={{ voltmeter: Voltmeter, ampmeter: Ampmeter }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Grid;
