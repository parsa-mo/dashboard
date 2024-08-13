import React from "react";
import {
  Container,
  Row,
  VisualDiv,
  Title,
  SubTitle,
} from "../Styles/Universal";
import {
  TemperatureGauge,
  AreaChart,
  BarChart,
  DBGauge,
} from "../DataVisuals/DataVisuals";

const Environment = () => {
  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Environment</Title>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Temperature</SubTitle>
          <TemperatureGauge
            name="Temperature"
            optimalTemp={80}
            temperature={70}
          ></TemperatureGauge>
        </VisualDiv>
        <VisualDiv>
          <SubTitle>Noise</SubTitle>
          <DBGauge decibel={50}></DBGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Gas Flow</SubTitle>
          <BarChart
            data={[
              { Name: "Oxygen", FlowRate: 5 },
              { Name: "CO2", FlowRate: 2 },
            ]}
          ></BarChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Humidity</SubTitle>
          <AreaChart></AreaChart>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Environment;
