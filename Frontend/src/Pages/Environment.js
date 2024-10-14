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
  Moisture,
  PMOne,
  PMTen,
  PMTwoFive,
  HallEffect,
  TVOCChart,
  ElecOxygen,
} from "../DataVisuals/DataVisuals";
import { DataContext } from "./Home";

const Environment = () => {
  const data = useContext(DataContext);
  const temp = data?.data?.["temperature"] ?? 0;
  const hallEffect = data?.data?.["hallEffect"] ?? 0;
  const irProximity = data?.data?.["irProximity"] ?? 0;

  return (
    <Container>
      <Row>
        <VisualDiv>
          <Title>Environment</Title> <Circle status={irProximity}></Circle>
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
              <PMOne value={0}></PMOne>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM10.0</SubTitle>
              <PMTen value={0}></PMTen>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>PM2.5</SubTitle>
              <PMTwoFive value={0}></PMTwoFive>
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
          <SubTitle>HallEffect</SubTitle>
          <HallEffect value={hallEffect}></HallEffect>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Moisture</SubTitle>
          <Moisture></Moisture>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>TVOC</SubTitle>
          <TVOCChart></TVOCChart>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>ElecOxygen</SubTitle>
          <ElecOxygen></ElecOxygen>
        </VisualDiv>
      </Row>
    </Container>
  );
};

export default Environment;
