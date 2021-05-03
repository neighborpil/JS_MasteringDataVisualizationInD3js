const MARGIN = { LEFT: 40, RIGHT: 30, TOP: 20, BOTTOM: 30 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

data = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000},
  {year: 1996, efficiency: 28.5, sales: 8479000},
  {year: 1997, efficiency: 28.7, sales: 8217000},
  {year: 1998, efficiency: 28.8, sales: 8085000},
  {year: 1999, efficiency: 28.3, sales: 8638000},
  {year: 2000, efficiency: 28.5, sales: 8778000},
  {year: 2001, efficiency: 28.8, sales: 8352000},
  {year: 2002, efficiency: 29, sales: 8042000},
  {year: 2003, efficiency: 29.5, sales: 7556000},
  {year: 2004, efficiency: 29.5, sales: 7483000},
  {year: 2005, efficiency: 30.3, sales: 7660000},
  {year: 2006, efficiency: 30.1, sales: 7762000},
  {year: 2007, efficiency: 31.2, sales: 7562000},
];


x = d3.scaleBand()
.domain(data.map(d => d.year))
.rangeRound([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
.padding(0.1)

y1 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .rangeRound([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])

y2 = d3.scaleLinear()
  .domain(d3.extent(data, d => d.efficiency))
  .rangeRound([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])

line = d3.line()
  .x(d => x(d.year) + x.bandwidth() / 2)
  .y(d => y2(d.efficiency))

xAxis = g => g
  .attr("transform", `translate(0,${HEIGHT - MARGIN.BOTTOM})`)
  .call(d3.axisBottom(x)
      .tickValues(d3.ticks(...d3.extent(x.domain()), WIDTH / 40).filter(v => x(v) !== undefined))
      .tickSizeOuter(0))


y1Axis = g => g
  .attr("transform", `translate(${MARGIN.LEFT},0)`)
  .style("color", "steelblue")
  .call(d3.axisLeft(y1).ticks(null, "s"))
  .call(g => g.select(".domain").remove())
  .call(g => g.append("text")
      .attr("x", -MARGIN.LEFT)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(data.y1))

y2Axis = g => g
.attr("transform", `translate(${WIDTH - MARGIN.RIGHT},0)`)
.call(d3.axisRight(y2))
.call(g => g.select(".domain").remove())
.call(g => g.append("text")
    .attr("x", MARGIN.RIGHT)
    .attr("y", 10)
    .attr("fill", "currentColor")
    .attr("text-anchor", "end")
    .text(data.y2))


const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

  svg.append("g")
      .attr("fill", "steelblue")
      .attr("fill-opacity", 0.8)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.year))
      .attr("width", x.bandwidth())
      .attr("y", d => y1(d.sales))
      .attr("height", d => y1(0) - y1(d.sales));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 3)
      .attr("d", line(data));

  svg.append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.year))
      .attr("width", x.bandwidth())
      .attr("y", 0)
      .attr("height", HEIGHT)
    .append("title")
      .text(d => `${d.year}
${d.sales.toLocaleString("en")} new cars sold
${d.efficiency.toLocaleString("en")} mpg average fuel efficiency`);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(y1Axis);

  svg.append("g")
      .call(y2Axis);


//data = Object.assign(d3.csvParse(await FileAttachment("new-passenger-cars.csv").text(), d3.autoType), {y1: "↑ New cars sold", y2: "Avg. fuel efficiency (mpg) ↑"})





//d3 = require("d3@6")