// src/CO2Gauge.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CO2Gauge = ({ co2 = 0, optimalCO2 = 1000, numLabels = 7 }) => {
  const ref = useRef();
  const minCO2 = 0;
  const maxCO2 = optimalCO2 * 3;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", window.innerWidth * 0.45)
      .attr("height", window.innerHeight * 0.175);

    svg.selectAll("*").remove(); // Clear previous content

    const width = window.innerWidth * 0.45;
    const height = window.innerHeight * 0.2;
    const innerRadius = 180;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const labelRadius = outerRadius + 40;

    // Define the gradient for CO2
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "co2-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    const optimalPercent = ((optimalCO2 - minCO2) / (maxCO2 - minCO2)) * 100;

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "green");
    gradient
      .append("stop")
      .attr("offset", `${optimalPercent - 5}%`)
      .attr("stop-color", "yellow");
    gradient
      .append("stop")
      .attr("offset", `${optimalPercent + 10}%`)
      .attr("stop-color", "orange");
    gradient
      .append("stop")
      .attr("offset", `${optimalPercent + 50}%`)
      .attr("stop-color", "red");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "darkred");

    // CO2 scale mapping to angles
    const co2Scale = d3
      .scaleLinear()
      .domain([minCO2, maxCO2])
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
      .attr("transform", `translate(${width / 2},${height / 1.5})`)
      .style("fill", "url(#co2-gradient)");

    // Needle
    const needleAngle = co2Scale(co2);
    const needleLength = innerRadius - 35;
    const needleWidth = 40;
    const needleHeadLength = 10;
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
      .curve(d3.curveNatural);

    svg
      .append("path")
      .datum(needleData)
      .attr("d", lineGenerator)
      .attr(
        "transform",
        `translate(${width / 2},${height / 1.5}) rotate(${(needleAngle * 180) / Math.PI})`,
      )
      .style("fill", "#000");

    // CO2 labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([minCO2, maxCO2]);

    for (let i = 0; i < numLabels; i++) {
      const co2Value = labelScale(i);
      const angle = co2Scale(co2Value);
      const xLabel = width / 2 + labelRadius * Math.cos(angle - Math.PI / 2);
      const yLabel = height / 1.5 + labelRadius * Math.sin(angle - Math.PI / 2);

      // Draw line from label to outer arc
      const lineLength = 0;

      const xArc =
        width / 2 + (outerRadius - lineLength) * Math.cos(angle - Math.PI / 2);
      const yArc =
        height / 1.5 +
        (outerRadius - lineLength) * Math.sin(angle - Math.PI / 2);

      svg
        .append("line")
        .attr("x1", xLabel)
        .attr("y1", yLabel)
        .attr("x2", xArc)
        .attr("y2", yArc)
        .style("stroke", "#ffffff");

      // Label text
      svg
        .append("text")
        .attr("x", xLabel)
        .attr("y", yLabel - 10)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text(`${Math.round(co2Value)}`)
        .style("font-size", "1.1rem")
        .style("fill", "#ffffff");
    }

    // CO2 text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("transform", `translate(${width / 2},${height / 1.4})`)
      .text(`${co2} ppm`)
      .style("font-size", "2rem")
      .style("fill", "#ffffff");
  }, [co2, minCO2, maxCO2, optimalCO2, numLabels]);

  return <svg ref={ref}></svg>;
};

export default CO2Gauge;
