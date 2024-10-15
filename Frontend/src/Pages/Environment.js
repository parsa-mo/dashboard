import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  VisualDiv,
  Title,
  SubTitle,
  Circle,
} from "../Styles/Universal";
import {
  TemperatureGauge,
  MoistureGauge,
  PMOne,
  PMTen,
  PMTwoFive,
  TVOCGauge,
  H2Gauge,
  HumidityGauge,
  OxygenGauge,
  CO2Gauge,
} from "../DataVisuals/DataVisuals";
import { DataContext } from "./Home";

const Environment = () => {
  const data = useContext(DataContext);
  const temp = data?.data?.["temperature"] ?? 0;
  const hallEffect = data?.data?.["hallEffect"] ?? 0;
  const irProximity = data?.data?.["irProximity"] ?? 0;
  const pmOne = data?.data?.["PM1.0"] ?? 0;
  const pmTen = data?.data?.["PM10.0"] ?? 0;
  const pmTwoFive = data?.data?.["PM2.5"] ?? 0;
  const humidity = data?.data?.["humidity"] ?? 0;
  const moisture = data?.data?.["steam"] ?? 0;
  const h2 = data?.data?.["h2"] ?? 0;
  const oxygen = data?.data?.["oxygen"] ?? 0;
  const tvoc = data?.data?.["TVOC"] ?? 0;
  const co2 = data?.data?.["CO2"] ?? 0;

  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Environment</Title>{" "}
          <Circle ir={irProximity} hall={hallEffect}></Circle>
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
              <PMOne value={pmOne}></PMOne>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM10.0</SubTitle>
              <PMTen value={pmTen}></PMTen>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM2.5</SubTitle>
              <PMTwoFive value={pmTwoFive}></PMTwoFive>
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
            temperature={temp}
          ></TemperatureGauge>
        </VisualDiv>
        <VisualDiv>
          <SubTitle>Humidity</SubTitle>
          <HumidityGauge humidity={humidity}></HumidityGauge>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <VisualDiv
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              paddingTop: "40px",
            }}
          >
            <VisualDiv>
              <SubTitle>Moisture</SubTitle>
              <MoistureGauge moisture={moisture}></MoistureGauge>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>H2</SubTitle>
              <H2Gauge h2={h2}></H2Gauge>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>Oxygen</SubTitle>
              <OxygenGauge oxygen={oxygen}></OxygenGauge>
            </VisualDiv>
          </VisualDiv>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>TVOC</SubTitle>
          <TVOCGauge tvoc={tvoc}></TVOCGauge>
        </VisualDiv>
        <VisualDiv>
          <SubTitle>CO2</SubTitle>
          <CO2Gauge co2={co2}></CO2Gauge>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Environment;
