import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const AreaChart = () => {
  const width = 1200;
  const height = 600;
  const marginTop = 40;
  const marginRight = 80;
  const marginLeft = 150;
  const marginBottom = 130;
  const svgRef = useRef();

  // Initial Data
  const [data, setData] = useState([{ time: 0, humidity: 0 }]);
  const [seconds, setSeconds] = useState(0);

  // Generate new data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      setData((prevData) => [
        ...prevData,
        {
          time: seconds + 1,
          humidity: Math.floor(Math.random() * 25),
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [seconds]);

  // Update chart when data changes
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Horizontal SCALE, X-AXIS
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.time))
      .range([marginLeft, width - marginRight]);

    // Vertical SCALE, Y-AXIS
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.humidity)])
      .range([height - marginBottom, marginTop]);

    // Area generator
    const area = d3
      .area()
      .x((d) => x(d.time))
      .y0(y(0))
      .y1((d) => y(d.humidity));

    // Append a path for the area (under the axes)
    svg.append("path").datum(data).attr("fill", "steelblue").attr("d", area);

    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("class", "xAxis")
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 250)
          .tickSizeOuter(0),
      )
      .selectAll("text")
      .attr("dy", "45")
      .style("font-size", "5em")
      .style("font-weight", "bold")
      .style("fill", "white");

    //Make axis lines and ticks white
    svg
      .select(".xAxis")
      .selectAll("path")
      .style("stroke-width", "5px")
      .style("stroke", "white"); // Set axis line color to white
    svg
      .select(".xAxis")
      .selectAll(".tick line")
      .style("stroke-width", "5px")
      .style("stroke", "white"); // Set tick line color to white

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 600)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text("Seconds")
      .style("font-size", "3em");

    // Add the y-axis, add grid lines and a label
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(height / 250))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .selectAll("text")
      .style("font-size", "5em")
      .style("font-weight", "bold")
      .style("fill", "white");

    svg
      .select(".yAxis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - marginBottom) / 2)
      .attr("y", -90)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Humidity")
      .style("font-size", "4em")
      .style("fill", "white");

    //Make y-axis line and ticks white
    svg
      .select(".yAxis")
      .selectAll("path")
      .style("stroke-width", "5px")
      .style("stroke", "white"); // Set axis line color to white
    svg
      .select(".yAxis")
      .selectAll(".tick line")
      .style("stroke-width", "5px")
      .style("stroke", "white"); // Set tick line color to white
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default AreaChart;
