import React from "react";
import {
  TemperatureGauge,
  VoltageGauge,
  BarChart,
  AreaChart,
  LineChart,
} from "../DataVisuals/DataVisuals";
import { Container, VisualDiv, Title, Row } from "../Styles/Universal";

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
          <Title> Solar Battery</Title>
          <VoltageGauge></VoltageGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title> Power Source</Title>
          <VoltageGauge></VoltageGauge>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Grid;
