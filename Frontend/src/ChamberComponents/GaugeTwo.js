import React from "react";
import { Chart } from "react-google-charts";

const styles = {
  dial: {
    width: `auto`,
    height: `auto`,
    color: "#000",
    padding: "2px",
    fontSize: "50px",
  },
  title: {
    fontSize: "2em",
    color: "#000",
  },
};

const GaugeTwo = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <Chart
        height={150}
        chartType="Gauge"
        loader={<div></div>}
        data={[
          ["Label", "Value"],
          [title, Number(value)],
        ]}
        options={{
          redFrom: 90,
          redTo: 200,
          yellowFrom: 50,
          yellowTo: 90,
          minorTicks: 5,
          min: -200,
          max: 200,
          gauge: {},
          majorTicks: {
            textStyle: {
              fontSize: 100, // Tick font size
            },
          },
          value: {
            textStyle: {
              fontSize: 50, // Value font size
            },
          },
        }}
      />
    </div>
  );
};

export default GaugeTwo;
