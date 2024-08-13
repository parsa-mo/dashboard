import React from "react";
import { VoltageGauge } from "../DataVisuals/DataVisuals";
import {
  Container,
  VisualDiv,
  Title,
  Row,
  SubTitle,
} from "../Styles/Universal";
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
          <Title>Grid Dashboard</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle> AC Power</SubTitle>
          <VoltageGauge
            logo={{ voltmeter: VoltmeterAC, ampmeter: AmpmeterAC }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle> Solar</SubTitle>
          <VoltageGauge
            logo={{ voltmeter: VoltmeterSolar, ampmeter: AmpmeterSolar }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle> Battery</SubTitle>
          <VoltageGauge
            logo={{ voltmeter: Voltmeter, ampmeter: Ampmeter }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Grid;
