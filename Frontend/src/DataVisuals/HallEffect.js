import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { DataContext } from "../Pages/Home";

const HallEffect = ({ value = 0, optimalRange = 600, numLabels = 7 }) => {
  const ref = useRef();
  const min = -optimalRange;
  const max = optimalRange * 3;

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

    // Define the gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    const optimalPercent = ((optimalRange - min) / (max - min)) * 100;

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

    // scale mapping to angles
    const Scale = d3
      .scaleLinear()
      .domain([min, max])
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
      .style("fill", "url(#gradient)");

    // Needle
    const needleAngle = Scale(value);
    const needleLength = innerRadius - 35;
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
        `translate(${width / 2},${height / 1.5}) rotate(${(needleAngle * 180) / Math.PI})`,
      )
      .style("fill", "#000");

    // labels and lines
    const labelScale = d3
      .scaleLinear()
      .domain([0, numLabels - 1])
      .range([min, max]);

    for (let i = 0; i < numLabels; i++) {
      const val = labelScale(i);
      const angle = Scale(val);
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
        .text(`${Math.round(val)}°`)
        .style("font-size", "1.1rem")
        .style("fill", "#ffffff");
    }

    // Temperature text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("transform", `translate(${width / 2},${height / 1.4})`)
      .text(`${value}°C`)
      .style("font-size", "2rem")
      .style("fill", "#ffffff");
  }, [value, min, max, optimalRange, numLabels]);

  return <svg ref={ref}></svg>;
};

export default HallEffect;
