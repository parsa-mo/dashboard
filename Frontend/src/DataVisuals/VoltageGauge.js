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

const VoltageGauge = ({ voltage = 0, amps = 0 }) => {
  const [Volt, setVolt] = useState(voltage);
  const [Amp, setAmp] = useState(amps);
  useEffect(() => {
    setAmp(amps);
    setVolt(voltage);
  }, [voltage, amps]);

  return (
    <Div>
      <Container>
        <Img src={Voltmeter} alt="voltmeter" />
        <Img src={Ampmeter} alt="ampmeter" />
        <VoltText>
          {Volt}
          {/*<Span>.0</Span>*/}
        </VoltText>
        <AmpText>{Amp}</AmpText>
      </Container>
    </Div>
  );
};

export default VoltageGauge;
