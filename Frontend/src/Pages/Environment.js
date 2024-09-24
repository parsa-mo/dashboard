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
  PMOne,
  PMTen,
  PMTwoFive,
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
          <SubTitle>Particle Matter</SubTitle>
          <VisualDiv
            style={{ flexDirection: "row", backgroundColor: "transparent" }}
          >
            <VisualDiv>
              <SubTitle>PM1.0</SubTitle>
              <PMOne value={5}></PMOne>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM10.0</SubTitle>
              <PMTen value={50}></PMTen>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM2.5</SubTitle>
              <PMTwoFive value={20}></PMTwoFive>
            </VisualDiv>
          </VisualDiv>
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
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Moisture</SubTitle>
          <AreaChart></AreaChart>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Environment;
