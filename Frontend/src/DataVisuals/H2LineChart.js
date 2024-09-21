import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const H2LineChart = () => {
  const width = 1600;
  const height = 800;
  const marginTop = 40;
  const marginRight = 180;
  const marginLeft = 140;
  const marginBottom = 120;
  const svgRef = useRef();

  const [data, setData] = useState([{ time: 0, hydrogen: 100 }]);
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
            hydrogen: lastEntry.hydrogen - Math.floor(Math.random() * 5),
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
        d3.min(data, (d) => Math.min(d.hydrogen) - 20),
        d3.max(data, (d) => Math.max(d.hydrogen) + 20),
      ])
      .range([height - marginBottom, marginTop]);

    const hydrogenLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.hydrogen));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "5px")
      .attr("d", hydrogenLine);

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
      .attr("dy", "45px")
      .style("font-size", "4em")
      .style("font-weight", "bold")
      .style("fill", "white");

    svg
      .select(".xAxis")
      .selectAll("path")
      .style("stroke-width", "5px")
      .style("stroke", "white");
    svg
      .select(".xAxis")
      .selectAll(".tick line")
      .style("stroke-width", "5px")
      .style("stroke", "white");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 800)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text("Seconds")
      .style("font-size", "3.2em");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).ticks(height / 200))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .selectAll("text")
      .attr("dx", "-10px")
      .style("font-size", "4em")
      .style("font-weight", "bold")
      .style("fill", "white");

    svg
      .select(".yAxis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - marginBottom) / 2)
      .attr("y", -105)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Volume (L)")
      .style("font-size", "4em")
      .style("fill", "white");

    svg
      .select(".yAxis")
      .selectAll("path")
      .style("stroke-width", "5px")
      .style("stroke", "white");
    svg
      .select(".yAxis")
      .selectAll(".tick line")
      .style("stroke-width", "5px")
      .style("stroke", "white");

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - marginRight - 120}, ${marginTop})`,
      );

    legend
      .append("rect")
      .attr("x", 110)
      .attr("y", -15)
      .attr("width", 40)
      .attr("height", 40)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 160)
      .attr("y", 16)
      .attr("fill", "white")
      .text("Hydrogen")
      .style("font-size", "2em");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default H2LineChart;
