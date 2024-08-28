import React from "react";
import {
  TemperatureGauge,
  LiquidGauge,
  VoltageGauge,
  BarChart,
  AreaChart,
  LineChart,
  Scale,
  WaterDash,
} from "../DataVisuals/DataVisuals";
import {
  Container,
  VisualDiv,
  Title,
  Row,
  SubTitle,
} from "../Styles/Universal";
import { Voltmeter, Ampmeter } from "../Images/Images";

const Electrolyser = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Electrolyser Dashboard</Title>
        </VisualDiv>
      </Row>

      <Row>
        <VisualDiv>
          <SubTitle>Internal Temperature</SubTitle>
          <TemperatureGauge
            name="InternalTemperature"
            temperature={750}
            optimalTemp={800}
          />
        </VisualDiv>
        <VisualDiv>
          <SubTitle> Water Temperature</SubTitle>
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
          <SubTitle>Rate of Production</SubTitle>
          <BarChart name="GasFlow"></BarChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Total Production/Usage</SubTitle>
          <LineChart name="Gas Production"></LineChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Power</SubTitle>
          <VoltageGauge
            voltage={24}
            logo={{ voltmeter: Voltmeter, ampmeter: Ampmeter }}
          />
        </VisualDiv>
        <VisualDiv>
          <SubTitle> Water Level</SubTitle>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LiquidGauge WaterLevel={50} WaterPH={9} />
            <WaterDash></WaterDash>
          </div>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle> Unit Weight </SubTitle>
          <Scale></Scale>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Electrolyser;
