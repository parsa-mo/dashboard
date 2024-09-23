import { color } from "d3-color";
import LiquidFillGauge from "react-liquid-gauge";
import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";

const LiquidGuage = ({ WaterLevel = 50, WaterPH }) => {
  const [state, setState] = useState(WaterLevel);
  const [waterPH, setWaterPH] = useState(WaterPH);

  useEffect(() => {
    setState(WaterLevel);
    setWaterPH(WaterPH);
  }, [WaterLevel, WaterPH]);

  const radius = 150;

  // Define a color scale for pH value
  const pHColorScale = scaleLinear()
    .domain([0, 7, 14])
    .range(["red", "green", "blue"]);

  const fillColor = pHColorScale(waterPH);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  return (
    <div style={{ paddingBottom: "30px", paddingLeft: "30px" }}>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={state}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={25}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          const valueStyle = {
            fontSize: textPixels,
          };
          const percentStyle = {
            fontSize: textPixels * 0.6,
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {value}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={1.5}
        waveAmplitude={4}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: "#ffffff", // Set fill to "none" to remove the outer circle fill
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textStyle={{
          fill: color("#444").toString(),
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Arial",
        }}
      />
    </div>
  );
};

export default LiquidGuage;
