import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const LineChart = () => {
  const width = 1400;
  const height = 800;
  const marginTop = 40;
  const marginRight = 150;
  const marginLeft = 100;
  const marginBottom = 100;
  const svgRef = useRef();

  const [data, setData] = useState([
    { time: 0, oxygen: 100, hydrogen: 100, water: 0 },
  ]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      setData((prevData) => {
        const lastEntry = prevData[prevData.length - 1];
        return [
          ...prevData,
          {
            time: lastEntry.time + 1,
            oxygen: lastEntry.oxygen - Math.floor(Math.random() * 5),
            hydrogen: lastEntry.hydrogen - Math.floor(Math.random() * 5),
            water: lastEntry.water + Math.floor(Math.random() * 5),
          },
        ];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [data, seconds]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.time))
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => Math.min(d.water, d.oxygen, d.hydrogen) - 20),
        d3.max(data, (d) => Math.max(d.oxygen, d.hydrogen, d.water) + 20),
      ])
      .range([height - marginBottom, marginTop]);

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

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", oxygenLine);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", hydrogenLine);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", waterLine);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("class", "xAxis")
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0),
      )
      .selectAll("text")
      .style("font-size", "2em")
      .style("font-weight", "bold")
      .style("fill", "white");

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

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 770)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text("Seconds")
      .style("font-size", "1.5em")
      .style("font-weight", "bold");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(height / 70))
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

    svg
      .select(".yAxis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - marginBottom) / 2)
      .attr("y", -60)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Volume (L)")
      .style("font-weight", "bold")
      .style("font-size", "2em")
      .style("fill", "white");

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

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - marginRight - 120}, ${marginTop})`,
      );

    legend
      .append("rect")
      .attr("x", 130)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "green");

    legend
      .append("text")
      .attr("x", 160)
      .attr("y", 15)
      .attr("fill", "white")
      .text("Oxygen")
      .style("font-size", "1.2em");

    legend
      .append("rect")
      .attr("x", 130)
      .attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 160)
      .attr("y", 45)
      .attr("fill", "white")
      .text("Hydrogen")
      .style("font-size", "1.2em");

    legend
      .append("rect")
      .attr("x", 130)
      .attr("y", 60)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "steelblue");

    legend
      .append("text")
      .attr("x", 160)
      .attr("y", 75)
      .attr("fill", "white")
      .text("Water")
      .style("font-size", "1.2em");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default LineChart;
