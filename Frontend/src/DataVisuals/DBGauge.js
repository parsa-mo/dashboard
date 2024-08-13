// src/DecibelGauge.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DBGauge = ({ decibel, numLabels = 5 }) => {
  const ref = useRef();
  const minDb = 0;
  const maxDb = 100;

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 500).attr("height", 400);

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
      .attr("id", "db-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "green");
    gradient.append("stop").attr("offset", "30%").attr("stop-color", "yellow");
    gradient.append("stop").attr("offset", "70%").attr("stop-color", "orange");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "red");

    // Decibel scale mapping to angles
    const decibelScale = d3
      .scaleLinear()
      .domain([minDb, maxDb])
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
      .style("fill", "url(#db-gradient)");

    // Needle
    const needleAngle = decibelScale(decibel);
    const needleLength = innerRadius - 15;
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
        `translate(${width / 2},${height / 2}) rotate(${(needleAngle * 180) / Math.PI})`,
      )
      .style("fill", "#000");

    // Decibel labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([minDb, maxDb]);

    for (let i = 0; i < numLabels; i++) {
      const db = labelScale(i);
      const angle = decibelScale(db);
      const xLabel = width / 2 + labelRadius * Math.cos(angle - Math.PI / 2);
      const yLabel = height / 2 + labelRadius * Math.sin(angle - Math.PI / 2);

      // Label text
      svg
        .append("text")
        .attr("x", xLabel)
        .attr("y", yLabel - 10)
        .attr("text-anchor", "middle")
        .attr("dy", "0.90em")
        .text(`${Math.round(db)}`)
        .style("font-size", "1.1rem")
        .style("fill", "#ffffff");
    }

    // Decibel text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("transform", `translate(${width / 2},${height / 2 + 30})`)
      .text(`${decibel} dB`)
      .style("font-size", "3rem")
      .style("fill", "#ffffff");
  }, [decibel, minDb, maxDb, numLabels]);

  return <svg ref={ref}></svg>;
};

export default DBGauge;
