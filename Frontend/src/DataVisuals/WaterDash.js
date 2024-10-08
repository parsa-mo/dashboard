import React, { useEffect } from "react";
import { Square, Div, HR, P } from "../Styles/WaterDashStyles";

const WaterDash = ({ Purity = 100, PH = 7, Pressure = 20 }) => {
  const [purity, setPurity] = React.useState(Purity);
  const [pH, setPH] = React.useState(PH);
  const [pressure, setPressure] = React.useState(Pressure);

  useEffect(() => {
    setPurity(Purity);
    setPH(PH);
    setPressure(Pressure);
  }, [Purity, PH, Pressure]);

  return (
    <Div>
      <Square>
        <Div>
          <P>{pH}</P>
          <P>pH</P>
        </Div>
        <HR />
        <Div>
          <P>N/A </P>
          <P>psi</P>
        </Div>
      </Square>
    </Div>
  );
};

export default WaterDash;
