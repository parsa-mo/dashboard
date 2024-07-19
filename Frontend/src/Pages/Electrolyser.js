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

const Electrolyser = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title style={{ fontSize: "4rem" }}>Electrolyser Dashboard</Title>
        </VisualDiv>
      </Row>

      <Row>
        <VisualDiv>
          <Title>Internal Temperature</Title>
          <TemperatureGauge
            name="InternalTemperature"
            temperature={750}
            optimalTemp={800}
          />
        </VisualDiv>
        <VisualDiv>
          <Title> Water Temperature</Title>
          <TemperatureGauge
            name="WaterTemperature"
            temperature={100}
            optimalTemp={50}
          />
        </VisualDiv>
      </Row>

      <Row>
        <VisualDiv>
          <AreaChart name="Humidity"></AreaChart>
        </VisualDiv>
        <VisualDiv>
          <Title>Rate of Production</Title>
          <BarChart name="GasFlow"></BarChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title>Total Production/Usage</Title>
          <LineChart name="Gas Production"></LineChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <Title>Power</Title>
          <VoltageGauge voltage={24} />
        </VisualDiv>
        <VisualDiv>
          <Title> Water Level</Title>
          <LiquidGauge water={60} />
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Electrolyser;
