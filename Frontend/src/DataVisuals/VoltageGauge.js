import React, { useEffect, useState } from "react";
import {
  Img,
  Div,
  AmpText,
  VoltText,
  Container,
} from "../Styles/VoltageGaugeStyle";

const VoltageGauge = ({
  data = { voltage: 0, amps: 0 },
  logo = { voltmeter: "", ampmeter: "" },
}) => {
  const [Volt, setVolt] = useState(data.voltage);
  const [Amp, setAmp] = useState(data.amps);
  useEffect(() => {
    setAmp(data.amps);
    setVolt(data.voltage);
  }, [data]);

  return (
    <Div>
      <Container>
        <Img src={logo.voltmeter} alt="voltmeter" />
        <Img src={logo.ampmeter} alt="ampmeter" />
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
