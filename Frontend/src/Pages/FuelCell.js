import React from "react";
import {
  TemperatureGauge,
  LiquidGauge,
  VoltageGauge,
  BarChart,
  AreaChart,
  LineChart,
} from "../DataVisuals/DataVisuals";
import { Container, VisualDiv, Title, Row } from "../Styles/Universal";

const FuelCell = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title style={{ fontSize: "4rem" }}>Fuel Cell Dashboard</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title>Hydrogen Level</Title>
        </VisualDiv>
        <VisualDiv>
          <Title>Oxygen Level</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title>Power</Title>
          <VoltageGauge></VoltageGauge>
        </VisualDiv>
        <VisualDiv>
          <Title>Temperature</Title>
          <TemperatureGauge temperature={400} optimalTemp={400} numLabels={9} />
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title>Production/Usage Rate</Title>
          <LineChart></LineChart>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default FuelCell;
