import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import LiquidFillGauge from "react-liquid-gauge";

import React from "react";

const LiquidGuage = ({ water }) => {
  const state = {
    value: water,
  };
  const startColor = "#6495ed"; // cornflowerblue
  const endColor = "rgb(7, 94, 155)"; // crimson

  const radius = 200;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(state.value / 100);
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
    <div>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={state.value}
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
          fill: fillColor,
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
      <div
        style={{
          margin: "20px auto",
          width: 120,
        }}
      ></div>
    </div>
  );
};

export default LiquidGuage;
