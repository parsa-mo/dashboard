import React, { useEffect, useRef, useState } from "react";
import { Img, Div, Text, Container, Span } from "../Styles/VoltageGaugeStyle";
import Voltmeter from "../Images/Voltmeter.png";

const VoltageGauge = ({ voltage = 0 }) => {
  const [Volt, setVolt] = useState(0);
  useEffect(() => {
    setVolt(voltage);
  }, [voltage]);
  return (
    <Div>
      <Container>
        <Img src={Voltmeter} alt="Description" />
        <Text>
          {Volt}
          {/*<Span>.0</Span>*/}
        </Text>
      </Container>
    </Div>
  );
};

export default VoltageGauge;
