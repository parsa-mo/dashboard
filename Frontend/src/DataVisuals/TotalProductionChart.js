import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../Pages/Home"; // Import context from Home

const TotalProductionChart = () => {
  const svgRef = useRef();
  const width = window.innerWidth * 0.82;
  const height = window.innerHeight * 0.25;
  const marginTop = 40;
  const marginRight = 100;
  const marginLeft = 130;
  const marginBottom = 80;

  // Get real data from DataContext
  const data = useContext(DataContext);
  const oxygen = data?.data?.["oxygen"] ?? 0;
  const hydrogen = data?.data?.["h2"] ?? 0;

  // State to hold the production data with timestamps
  const [productionData, setProductionData] = useState([]);

  // State to track time increments
  const [time, setTime] = useState(0);

  // Append new data points as they come in
  useEffect(() => {
    if (oxygen === undefined || hydrogen === undefined) return;

    // Append new data point when new data comes in
    setProductionData((prevData) => [
      ...prevData,
      {
        time,
        oxygen,
        hydrogen,
        water: 0, // Use steam as the water value
      },
    ]);

    // Increment time for the next data point
    setTime((prevTime) => prevTime + 1);
  }, [oxygen, hydrogen]);

  // Effect to draw the chart whenever productionData changes
  useEffect(() => {
    if (!svgRef.current || productionData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Set up the X and Y scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(productionData, (d) => d.time)) // X-axis based on time
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(
          productionData,
          (d) => Math.min(d.water, d.oxygen, d.hydrogen) - 20,
        ),
        d3.max(
          productionData,
          (d) => Math.max(d.oxygen, d.hydrogen, d.water) + 20,
        ),
      ])
      .range([height - marginBottom, marginTop]);

    // Line generators for oxygen, hydrogen, and water
    const oxygenLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.oxygen));

    const hydrogenLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.hydrogen));

    const waterLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.water));

    // Append the oxygen line
    svg
      .append("path")
      .datum(productionData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", "3px")
      .attr("d", oxygenLine);

    // Append the hydrogen line
    svg
      .append("path")
      .datum(productionData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "3px")
      .attr("d", hydrogenLine);

    // Append the water line
    svg
      .append("path")
      .datum(productionData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "3px")
      .attr("d", waterLine);

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

    // Set X-axis style
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
      .text("Volume (L)")
      .style("font-size", "2em")
      .style("fill", "white");

    // Set Y-axis style
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

    // Create a legend for oxygen, hydrogen, and water
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - marginRight - 120}, ${marginTop})`,
      );

    // Oxygen legend
    legend
      .append("rect")
      .attr("x", 125)
      .attr("y", -10)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "green");

    legend
      .append("text")
      .attr("x", 145)
      .attr("y", 5)
      .attr("fill", "white")
      .text("O2")
      .style("font-size", "1.25em");

    // Hydrogen legend
    legend
      .append("rect")
      .attr("x", 125)
      .attr("y", 15)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 145)
      .attr("y", 30)
      .attr("fill", "white")
      .text("H")
      .style("font-size", "1.25em");

    // Water legend
    legend
      .append("rect")
      .attr("x", 125)
      .attr("y", 40)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "steelblue");

    legend
      .append("text")
      .attr("x", 145)
      .attr("y", 55)
      .attr("fill", "white")
      .text("H2O")
      .style("font-size", "1.25em");
  }, [productionData]); // Redraw the chart whenever the productionData changes

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default TotalProductionChart;
