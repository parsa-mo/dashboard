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

  const [data, setData] = useState([{ time: 0, oxygen: 0, hydrogen: 0 }]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      setData((prevData) => [
        ...prevData,
        {
          time: seconds + 1,
          oxygen: Math.floor(Math.random() * 25),
          hydrogen: Math.floor(Math.random() * 25),
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [seconds]);

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
      .domain([0, d3.max(data, (d) => Math.max(d.oxygen, d.hydrogen))])
      .range([height - marginBottom, marginTop]);

    const oxygenLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.oxygen));

    const hydrogenLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.hydrogen));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
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
      .text("Volume Produced (L)")
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
      .attr("fill", "steelblue");

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

    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip
      .append("rect")
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 150)
      .attr("height", 70)
      .attr("fill", "rgba(0,0,0,0.7)")
      .style("pointer-events", "none");

    const tooltipText = tooltip
      .append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "white")
      .style("font-size", "12px")
      .style("font-weight", "bold");

    const focus = svg.append("g").style("display", "none");

    focus.append("circle").attr("r", 5).attr("fill", "white");

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        focus.style("display", null);
        tooltip.style("display", null);
      })
      .on("mouseout", () => {
        focus.style("display", "none");
        tooltip.style("display", "none");
      })
      .on("mousemove", function (event) {
        if (data.length < 2) return;

        const x0 = x.invert(d3.pointer(event)[0]);
        const bisect = d3.bisector((d) => d.time).left;
        const i = bisect(data, x0, 1);
        const d = data[i];

        if (!d) return;

        focus.attr("transform", `translate(${x(d.time)},${y(d.oxygen)})`);
        tooltip.attr(
          "transform",
          `translate(${x(d.time)},${y(d.oxygen) - 80})`,
        );

        const text = `Time: ${d.time}, Oxygen: ${d.oxygen}, Hydrogen: ${d.hydrogen}`;
        tooltipText.text(text);

        const bbox = tooltipText.node().getBBox();
        tooltip
          .select("rect")
          .attr("width", bbox.width + 20)
          .attr("height", bbox.height + 20);
      });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default LineChart;
