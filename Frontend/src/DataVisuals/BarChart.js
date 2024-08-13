import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const BarChart = ({
  data = [
    { Name: "Oxygen", FlowRate: 3 },
    { Name: "Hydrogen", FlowRate: 4 },
  ],
}) => {
  const margin = { top: 20, right: 30, bottom: 55, left: 70 };
  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const ref = useRef(null);

  useEffect(() => {
    // Clear previous content
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x_scale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.4)
      .domain(data.map((d) => d.Name));

    const maxFlowRate = d3.max(data, (d) => d.FlowRate);
    const yMaxValue = maxFlowRate + maxFlowRate * 0.1;

    const y_scale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);

    // Adding the bars to show data
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d.Name))
      .attr("y", (d) => y_scale(d.FlowRate))
      .attr("width", x_scale.bandwidth())
      .attr("height", (d) => height - y_scale(d.FlowRate))
      .attr("fill", (d) => (d.Name === "Oxygen" ? "steelblue" : "red"))
      .attr("rx", 10) // Horizontal radius for rounded corners
      .attr("ry", 10); // Vertical radius for rounded corners

    // Update bars with new data
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .duration(2000) // Animation duration in milliseconds
      .attr("y", (d) => y_scale(d.FlowRate))
      .attr("height", (d) => height - y_scale(d.FlowRate));

    // Flow number label inside each bar
    svg
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x_scale(d.Name) + x_scale.bandwidth() / 2)
      .attr("y", (d) => y_scale(d.FlowRate) + 30) // Adjust the position as needed
      .style("font-size", "1.2em")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .style("fill", "white") // Set text color to white
      .text((d) => d.FlowRate + " L/min");

    // Adding the x-axis
    const xAxis = d3.axisBottom(x_scale);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("class", "xAxis")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "2.5em")
      .style("font-weight", "bold")
      .style("fill", "white"); // Set text color to white

    svg
      .select(".xAxis")
      .selectAll("path")
      .style("stroke-width", "3px")
      .style("stroke", "white"); // Set axis line color to white
    svg
      .select(".xAxis")
      .selectAll(".tick line")
      .style("stroke-width", "3px")
      .style("stroke", "white"); // Set tick line color to white

    // Adding the y-axis
    const yAxis = d3.axisLeft(y_scale).ticks(6);
    svg
      .append("g")
      .call(yAxis)
      .attr("class", "yAxis")
      .selectAll("text")
      .attr("x", -15)
      .style("font-size", "2em")
      .style("padding-right", "10px")
      .style("fill", "white"); // Set text color to white

    svg
      .select(".yAxis")
      .selectAll("path")
      .style("stroke-width", "3px")
      .style("stroke", "white"); // Set axis line color to white
    svg
      .select(".yAxis")
      .selectAll(".tick line")
      .style("stroke-width", "3px")
      .style("stroke", "white"); // Set tick line color to white

    // Adding the y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "1.5em")
      .style("font-weight", "bold")
      .style("fill", "white") // Set text color to white
      .text("Gas Flow (L/min)");
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
