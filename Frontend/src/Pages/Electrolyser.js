import React, { useContext } from "react";
import {
  TemperatureGauge,
  LiquidGauge,
  VoltageGauge,
  Scale,
  WaterDash,
  DecibelGauge,
  VibrationGauge,
  ElecOxygenGauge,
} from "../DataVisuals/DataVisuals";
import {
  Container,
  VisualDiv,
  Title,
  Row,
  SubTitle,
} from "../Styles/Universal";
import { Voltmeter, Ampmeter } from "../Images/Images";
import { DataContext } from "./Home";

const Electrolyser = () => {
  const data = useContext(DataContext);
  const internalTemp = data?.data?.["IntTemperature"] ?? 0;
  const waterTemp = data?.data?.["WaterTemp"] ?? 0;
  const sound = data?.data?.["sound"] ?? 0;
  const weight = data?.data?.["weight"] ?? 0;
  const pH = data?.data?.["pH"] ?? 0;
  const pressure = data?.data?.["pressure"] ?? 0;
  const sharpIRRaw = data?.data?.["sharpIR"] ?? 0;
  const sharpIR = (1 - sharpIRRaw / 300) * 100;
  const vibration = data?.data?.["vibration"] ?? 0;
  const elecOxygen = data?.data?.["ElecOxygen"] ?? 0;

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
            temperature={internalTemp}
            optimalTemp={50}
          />
        </VisualDiv>
        <VisualDiv>
          <SubTitle> Water Temperature</SubTitle>
          <TemperatureGauge
            name="WaterTemperature"
            temperature={waterTemp}
            optimalTemp={50}
          />
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
              <SubTitle>Noise </SubTitle>
              <DecibelGauge decibel={sound}></DecibelGauge>{" "}
            </VisualDiv>
            <VisualDiv>
              <SubTitle>Vibration </SubTitle>
              <VibrationGauge vibration={vibration}></VibrationGauge>
            </VisualDiv>
            <VisualDiv>
              <SubTitle>Oxygen</SubTitle>
              <ElecOxygenGauge elecOxygen={elecOxygen}></ElecOxygenGauge>
            </VisualDiv>
          </VisualDiv>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle> Weight </SubTitle>
          <Scale Weight={weight}></Scale>
        </VisualDiv>

        <VisualDiv>
          <SubTitle> Water Level</SubTitle>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LiquidGauge WaterLevel={sharpIR} WaterPH={pH} />
            <WaterDash PH={pH} Pressure={pressure}></WaterDash>
          </div>
        </VisualDiv>
      </Row>
      <Row>
        <VisualDiv>
          <SubTitle>Power</SubTitle>
          <VoltageGauge
            data={{ voltage: 0, amps: 0 }}
            logo={{ voltmeter: Voltmeter, ampmeter: Ampmeter }}
          />
        </VisualDiv>
      </Row>
      {/*<Row>*/}
      {/*  <VisualDiv>*/}
      {/*    <SubTitle>Total Production/Usage</SubTitle>*/}
      {/*    <TotalProductionChart name="Gas Production"></TotalProductionChart>*/}
      {/*  </VisualDiv>*/}
      {/*</Row>*/}
    </Container>
  );
};

export default Electrolyser;
