import React, { useEffect } from "react";
import { Square, Div, HR, P } from "../Styles/WaterDashStyles";

const WaterDash = ({ PH = 7, Pressure = 20 }) => {
  const [pH, setPH] = React.useState(PH);
  const [pressure, setPressure] = React.useState(Pressure);

  useEffect(() => {
    setPH(PH);
    setPressure(Pressure);
  }, [PH, Pressure]);

  return (
    <Div>
      <Square>
        <Div>
          <P>{pH}</P>
          <P>pH</P>
        </Div>
        <HR />
        <Div>
          <P>{pressure} </P>
          <P>psi</P>
        </Div>
      </Square>
    </Div>
  );
};

export default WaterDash;
