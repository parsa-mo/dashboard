import React from "react";
import { TemperatureGauge } from "../DataVisuals/DataVisuals";
import { Container, VisualDiv, Title } from "../Styles/Universal";

const Electrolyser = () => {
  return (
    <Container>
      <VisualDiv>
        <Title>Internal Temperature</Title>
        <TemperatureGauge
          name="InternalTemperature"
          temperature={700}
          optimalTemp={800}
        />
      </VisualDiv>
      <VisualDiv>
        <Title> Water Temperature</Title>
        <TemperatureGauge
          name="Water Temperature"
          temperature={100}
          optimalTemp={50}
        />
      </VisualDiv>
    </Container>
  );
};

export default Electrolyser;
