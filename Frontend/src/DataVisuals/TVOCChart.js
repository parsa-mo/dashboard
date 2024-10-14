import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../Pages/Home"; // Import the context from Home

const TVOCChart = () => {
  const data = useContext(DataContext); // Get the data from context
  const svgRef = useRef();

  const width = window.innerWidth * 0.82;
  const height = window.innerHeight * 0.25;
  const marginTop = 40;
  const marginRight = 100;
  const marginLeft = 130;
  const marginBottom = 80;

  // State to hold the TVOC data with timestamps
  const [TVOCData, setTVOCData] = useState([]);
  const [time, setTime] = useState(0); // Track time to associate with data points
  const [lastTVOCValue, setLastTVOCValue] = useState(null); // Track the last TVOC value to avoid duplicates

  // Effect to append new data when `data.data["TVOC"]` changes
  useEffect(() => {
    // Ensure that we have valid data and that `TVOC` exists in the data object
    if (!data || !data.data || typeof data.data.TVOC === "undefined") return;

    // Only add new TVOC data when it's different from the last value
    if (data.data.TVOC !== lastTVOCValue) {
      setTVOCData((prevTVOCData) => [
        ...prevTVOCData,
        { time, TVOC: data.data.TVOC }, // Append new TVOC data point with timestamp
      ]);
      setTime((prevTime) => prevTime + 1); // Increment time
      setLastTVOCValue(data.data.TVOC); // Update last TVOC value
    }
  }, [data, lastTVOCValue, time]); // This effect runs whenever `data` or `lastTVOCValue` changes

  // Effect to draw the chart when TVOC data changes
  useEffect(() => {
    if (!svgRef.current || TVOCData.length === 0) return; // Wait until data is available

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Set up the X and Y scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(TVOCData, (d) => d.time)) // X-axis based on time
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(TVOCData, (d) => d.TVOC - 20), // Set a bit of padding
        d3.max(TVOCData, (d) => d.TVOC + 20),
      ])
      .range([height - marginBottom, marginTop]);

    // Line generator for TVOC
    const TVOCLine = d3
      .line()
      .x((d) => x(d.time)) // X is time
      .y((d) => y(d.TVOC)); // Y is TVOC value

    // Append the line path for TVOC data
    svg
      .append("path")
      .datum(TVOCData) // Bind the data
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", "3px")
      .attr("d", TVOCLine); // Apply the line generator

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
      .text("(mg/m³)")
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
  }, [TVOCData]); // Redraw the chart when the TVOC data changes

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default TVOCChart;
