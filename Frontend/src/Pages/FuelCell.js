import React from "react";
import {
  TemperatureGauge,
  VoltageGauge,
  HydrogenLineChart,
} from "../DataVisuals/DataVisuals";
import {
  Container,
  VisualDiv,
  Title,
  Row,
  SubTitle,
} from "../Styles/Universal";
import { AmpmeterAC, VoltmeterAC } from "../Images/Images";

const FuelCell = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Fuel Cell Dashboard</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Input Voltage/Current</SubTitle>
          <VoltageGauge
            logo={{ ampmeter: AmpmeterAC, voltmeter: VoltmeterAC }}
          ></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Temperature</SubTitle>
          <TemperatureGauge temperature={400} optimalTemp={400} numLabels={9} />
        </VisualDiv>
      </Row>

      <Row>
        <VisualDiv>
          <SubTitle>Hydrogen Input Rate</SubTitle>
          <HydrogenLineChart />
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default FuelCell;
