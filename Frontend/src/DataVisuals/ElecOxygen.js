import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../Pages/Home"; // Import context from Home

const ElecOxygen = () => {
  const data = useContext(DataContext); // Get data from context
  const svgRef = useRef();

  const width = window.innerWidth * 0.82;
  const height = window.innerHeight * 0.25;
  const marginTop = 40;
  const marginRight = 100;
  const marginLeft = 130;
  const marginBottom = 80;

  // State to hold the ElecOxygen data points
  const [elecOxygenData, setElecOxygenData] = useState([]);
  const [time, setTime] = useState(0); // Track time to associate with data points
  const [lastElecOxygen, setLastElecOxygen] = useState(null); // Track the last ElecOxygen value to avoid duplicates

  useEffect(() => {
    // Ensure that we have valid data and that `ElecOxygen` exists in the data object
    if (!data || !data.data || typeof data.data["ElecOxygen"] === "undefined")
      return;

    // Only add new ElecOxygen data when it's different from the last value
    if (data.data.ElecOxygen !== lastElecOxygen) {
      setElecOxygenData((prevElecOxygenData) => [
        ...prevElecOxygenData,
        { time, ElecOxygen: data.data.ElecOxygen }, // Append new ElecOxygen data point with timestamp
      ]);
      setTime((prevTime) => prevTime + 1); // Increment time
      setLastElecOxygen(data.data.ElecOxygen); // Update last ElecOxygen value
    }
  }, [data, lastElecOxygen, time]); // This effect runs whenever `data` or `lastElecOxygen` changes

  // Effect to draw the chart when elecOxygenData changes
  useEffect(() => {
    if (!svgRef.current || elecOxygenData.length === 0) return; // Wait until data is available

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Set up the X and Y scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(elecOxygenData, (d) => d.time)) // X-axis based on time
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(elecOxygenData, (d) => d.ElecOxygen - 20), // Set a bit of padding
        d3.max(elecOxygenData, (d) => d.ElecOxygen + 20),
      ])
      .range([height - marginBottom, marginTop]);

    // Line generator for ElecOxygen
    const elecOxygenLine = d3
      .line()
      .x((d) => x(d.time)) // X is time
      .y((d) => y(d.ElecOxygen)); // Y is ElecOxygen value

    // Append the line path for ElecOxygen data
    svg
      .append("path")
      .datum(elecOxygenData) // Bind the data
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", "3px")
      .attr("d", elecOxygenLine); // Apply the line generator

    // Add the X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("class", "xAxis")
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 100)
          .tickSizeOuter(0),
      )
      .selectAll("text")
      .attr("dy", "20px")
      .style("font-size", "2em")
      .style("font-weight", "bold")
      .style("fill", "white");

    // Style the X-axis line and ticks
    svg
      .select(".xAxis")
      .selectAll("path")
      .style("stroke-width", "3px")
      .style("stroke", "white");
    svg
      .select(".xAxis")
      .selectAll(".tick line")
      .style("stroke-width", "3px")
      .style("stroke", "white");

    // X-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text("Seconds")
      .style("font-size", "1.5em");

    // Add the Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(height / 50))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .selectAll("text")
      .attr("dx", "-10px")
      .style("font-size", "1.75em")
      .style("font-weight", "bold")
      .style("fill", "white");

    // Y-axis label
    svg
      .select(".yAxis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - marginBottom) / 2)
      .attr("y", -75)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("ElecOxygen")
      .style("font-size", "2em")
      .style("fill", "white");

    // Style the Y-axis line and ticks
    svg
      .select(".yAxis")
      .selectAll("path")
      .style("stroke-width", "3px")
      .style("stroke", "white");
    svg
      .select(".yAxis")
      .selectAll(".tick line")
      .style("stroke-width", "3px")
      .style("stroke", "white");
  }, [elecOxygenData]); // Redraw the chart when the elecOxygenData changes

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default ElecOxygen;
