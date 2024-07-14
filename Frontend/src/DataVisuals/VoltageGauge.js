import React, { useEffect, useState } from "react";
import {
  Img,
  Div,
  AmpText,
  VoltText,
  Container,
} from "../Styles/VoltageGaugeStyle";
import Voltmeter from "../Images/Voltmeter.png";
import Ampmeter from "../Images/Ampmeter.png";

const VoltageGauge = ({ voltage = 0 }) => {
  const [Volt, setVolt] = useState(voltage);
  useEffect(() => {
    setVolt(voltage);
  }, [voltage]);

  return (
    <Div>
      <Container>
        <Img src={Voltmeter} alt="voltmeter" />
        <Img src={Ampmeter} alt="ampmeter" />
        <VoltText>
          {Volt}
          {/*<Span>.0</Span>*/}
        </VoltText>
        <AmpText>40</AmpText>
      </Container>
    </Div>
  );
};

export default VoltageGauge;
