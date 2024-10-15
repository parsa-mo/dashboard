// src/MoistureGauge.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MoistureGauge = ({ moisture = 0, numLabels = 5 }) => {
  const ref = useRef();
  const minMoisture = 0;
  const maxMoisture = 100;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", window.innerWidth * 0.25)
      .attr("height", window.innerHeight * 0.1);

    svg.selectAll("*").remove(); // Clear previous content

    const width = window.innerWidth * 0.25;
    const height = window.innerHeight * 0.09;
    const innerRadius = 75;
    const outerRadius = Math.min(width - 125, height) / 2;
    const labelRadius = outerRadius + 20;

    // Define the gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "moisture-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "lightblue");
    gradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "dodgerblue");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "blue");

    // Moisture scale mapping to angles
    const moistureScale = d3
      .scaleLinear()
      .domain([minMoisture, maxMoisture])
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
      .style("fill", "url(#moisture-gradient)");

    // Needle
    const needleAngle = moistureScale(moisture);
    const needleLength = innerRadius - 25;
    const needleWidth = 15;
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

    // Moisture labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([minMoisture, maxMoisture]);

    for (let i = 0; i < numLabels; i++) {
      const moistureValue = labelScale(i);
      const angle = moistureScale(moistureValue);
      const xLabel = width / 2 + labelRadius * Math.cos(angle - Math.PI / 2);
      const yLabel = height / 1.5 + labelRadius * Math.sin(angle - Math.PI / 2);

      // Draw line from label to outer arc
      const lineLength = 0; // Adjust this value to control line length

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
        .text(`${Math.round(moistureValue)}`)
        .style("font-size", "1.1rem")
        .style("fill", "#ffffff");
    }

    // Moisture text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.7em")
      .attr("transform", `translate(${width / 2},${height / 1.4})`)
      .text(`${moisture}`)
      .style("font-size", "2rem")
      .style("fill", "#ffffff");
  }, [moisture, minMoisture, maxMoisture, numLabels]);

  return <svg ref={ref}></svg>;
};

export default MoistureGauge;
