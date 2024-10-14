import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../Pages/Home"; // Import context from Home component

const Humidity = () => {
  const data = useContext(DataContext); // Access data from DataContext
  const [humidityData, setHumidityData] = useState([]); // State to hold humidity data with timestamps
  const [lastSteamValue, setLastSteamValue] = useState(null); // To track the last steam value
  const svgRef = useRef(); // Ref for D3 to bind to

  const width = window.innerWidth * 0.6;
  const height = window.innerHeight * 0.2;
  const marginTop = 10;
  const marginRight = 60;
  const marginLeft = 100;
  const marginBottom = 70;

  const [time, setTime] = useState(0); // State to track the time

  useEffect(() => {
    // Check if we have new data and valid `steam` value
    if (!data || !data.data || typeof data.data.humidity === "undefined")
      return;

    // Check if the steam value has changed
    if (data.data.humidity !== lastSteamValue) {
      // Update the humidity data and time only if a new steam value is received
      setHumidityData((prevHumidityData) => [
        ...prevHumidityData,
        { time, humidity: data.data.humidity }, // Append new data point with the current time
      ]);

      // Increment the time for the next data point
      setTime((prevTime) => prevTime + 1);

      // Save the current steam value to detect future changes
      setLastSteamValue(data.data.humidity);
    }
  }, [data, lastSteamValue]); // This effect runs every time `data` or `lastSteamValue` changes

  // D3 chart update when `humidityData` changes
  useEffect(() => {
    if (!svgRef.current || humidityData.length === 0) return; // Only draw when data is available

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Horizontal SCALE, X-Axis (based on time)
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(humidityData, (d) => d.time)]) // X-axis based on time
      .range([marginLeft, width - marginRight]);

    // Vertical SCALE, Y-Axis (based on humidity)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(humidityData, (d) => d.humidity)])
      .range([height - marginBottom, marginTop]);

    // Area generator for the humidity area
    const area = d3
      .area()
      .x((d) => x(d.time))
      .y0(y(0)) // Baseline (y = 0)
      .y1((d) => y(d.humidity)); // Height based on humidity value

    // Append a path for the area
    svg
      .append("path")
      .datum(humidityData)
      .attr("fill", "steelblue")
      .attr("d", area);

    // Add the x-axis
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
      .attr("dy", "20")
      .style("font-size", "2em")
      .style("font-weight", "bold")
      .style("fill", "white");

    // Set x-axis line and ticks to white
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

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 360)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text("Seconds")
      .style("font-size", "1.25em");

    // Add the y-axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(height / 100))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .selectAll("text")
      .style("font-size", "2em")
      .style("font-weight", "bold")
      .style("fill", "white");

    // Add y-axis label
    svg
      .select(".yAxis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - marginBottom) / 2)
      .attr("y", -55)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Humidity")
      .style("font-size", "2em")
      .style("fill", "white");

    // Set y-axis line and ticks to white
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
  }, [humidityData]); // Redraw chart when `humidityData` changes

  // Conditionally render SVG only if data is available
  if (humidityData.length === 0) {
    return <div>Loading...</div>; // Display a loading state if there's no data yet
  }

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default Humidity;
