// src/ElecOxygenGauge.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ElecOxygenGauge = ({ elecOxygen = 0, numLabels = 5 }) => {
  const ref = useRef();
  const minElecOxygen = 0;
  const maxElecOxygen = 100;

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

    // ElecOxygen scale mapping to angles
    const elecOxygenScale = d3
      .scaleLinear()
      .domain([minElecOxygen, maxElecOxygen])
      .range([-Math.PI / 2, Math.PI / 2]);

    // Background arc (all green)
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
      .style("fill", "green");

    // Needle
    const needleAngle = elecOxygenScale(elecOxygen);
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

    // ElecOxygen labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([minElecOxygen, maxElecOxygen]);

    for (let i = 0; i < numLabels; i++) {
      const elecOxygenValue = labelScale(i);
      const angle = elecOxygenScale(elecOxygenValue);
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
        .text(`${Math.round(elecOxygenValue)}`)
        .style("font-size", "1.1rem")
        .style("fill", "#ffffff");
    }

    // ElecOxygen text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.7em")
      .attr("transform", `translate(${width / 2},${height / 1.4})`)
      .text(`${elecOxygen} `)
      .style("font-size", "2rem")
      .style("fill", "#ffffff");
  }, [elecOxygen, minElecOxygen, maxElecOxygen, numLabels]);

  return <svg ref={ref}></svg>;
};

export default ElecOxygenGauge;
