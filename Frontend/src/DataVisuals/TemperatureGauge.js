// src/TemperatureGauge.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TemperatureGauge = ({ temperature, optimalTemp = 90, numLabels = 7 }) => {
  const ref = useRef();
  const minTemp = -optimalTemp;
  const maxTemp = optimalTemp * 3;
  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 500).attr("height", 350);

    svg.selectAll("*").remove(); // Clear previous content

    const width = 500;
    const height = 500;
    const innerRadius = 180;
    const outerRadius = Math.min(width, height) / 2 - 40;
    const labelRadius = outerRadius + 20;

    // Define the gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "temp-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    const optimalPercent =
      ((optimalTemp - minTemp) / (maxTemp - minTemp)) * 100;

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
    gradient
      .append("stop")
      .attr("offset", `${optimalPercent - 25}%`)
      .attr("stop-color", "yellow");
    gradient
      .append("stop")
      .attr("offset", `${optimalPercent}%`)
      .attr("stop-color", "green");

    gradient
      .append("stop")
      .attr("offset", `${optimalPercent}%`)
      .attr("stop-color", "green");

    gradient
      .append("stop")
      .attr("offset", `${optimalPercent + 25}%`)
      .attr("stop-color", "yellow");

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "red");

    // Temperature scale mapping to angles
    const temperatureScale = d3
      .scaleLinear()
      .domain([minTemp, maxTemp])
      .range([-Math.PI / 2, Math.PI / 2]);

    // Background arc
    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    svg
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .style("fill", "url(#temp-gradient)");

    // Needle
    const needleAngle = temperatureScale(temperature);
    const needleLength = innerRadius - 15;
    const needleWidth = 40;
    const needleHeadLength = 10; // Length of the rounded head
    const needleData = [
      { x: 0, y: -needleLength }, // Tip of the needle
      { x: -needleWidth / 2, y: -needleHeadLength }, // Top left of the head
      { x: 0, y: 0 }, // Middle bottom
      { x: needleWidth / 2, y: -needleHeadLength }, // Top right of the head
      { x: 0, y: -needleLength }, // Tip of the needle (back to start)
    ];

    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveNatural); // Use a natural curve for smooth edges

    svg
      .append("path")
      .datum(needleData)
      .attr("d", lineGenerator)
      .attr(
        "transform",
        `translate(${width / 2},${height / 2}) rotate(${(needleAngle * 180) / Math.PI})`,
      )
      .style("fill", "#000");

    // Temperature labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([minTemp, maxTemp]);

    for (let i = 0; i < numLabels; i++) {
      const temp = labelScale(i);
      const angle = temperatureScale(temp);
      const xLabel = width / 2 + labelRadius * Math.cos(angle - Math.PI / 2);
      const yLabel = height / 2 + labelRadius * Math.sin(angle - Math.PI / 2);

      // Draw line from label to outer arc
      const lineLength = 30; // Adjust this value to control line length

      const xArc =
        width / 2 + (outerRadius - lineLength) * Math.cos(angle - Math.PI / 2);
      const yArc =
        height / 2 + (outerRadius - lineLength) * Math.sin(angle - Math.PI / 2);

      svg
        .append("line")
        .attr("x1", xLabel)
        .attr("y1", yLabel)
        .attr("x2", xArc)
        .attr("y2", yArc)
        .style("stroke", "#000000");

      // Label text
      svg
        .append("text")
        .attr("x", xLabel)
        .attr("y", yLabel - 10)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text(`${Math.round(temp)}°`)
        .style("font-size", "1rem")
        .style("fill", "#333");
    }

    // Temperature text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("transform", `translate(${width / 2},${height / 2 + 30})`)
      .text(`${temperature}°C`)
      .style("font-size", "3rem")
      .style("fill", "#333");
  }, [temperature, minTemp, maxTemp, optimalTemp, numLabels]);

  return <svg ref={ref}></svg>;
};

export default TemperatureGauge;