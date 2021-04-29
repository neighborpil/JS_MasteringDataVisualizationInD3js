/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

$(window).on("resize", function() {
  var targetWidth = $(window).width();
  WIDTH = targetWidth - MARGIN.LEFT - MARGIN.RIGHT
  HEIGHT = Math.round(targetWidth / ASPECT);

  svg.attr('width', WIDTH) 
  svg.attr('height', HEIGHT)
});

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
var WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
var HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM
var ASPECT = WIDTH / HEIGHT 

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .attr('viewBox', "0, 0, " + (WIDTH + MARGIN.LEFT + MARGIN.RIGHT) + ", " + (HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)) 

const g = svg.append("g")
  .attr("transform", 'translate(' + MARGIN.LEFT + ', ' + MARGIN.TOP + ')')

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 110)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings")

// Y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)")

d3.json("data/buildings.json").then(function(data) {

  data.forEach(function(d) {
    return d.height = Number(d.height)
  })

  const x = d3.scaleBand()
    .domain(data.map(function(d) { return d.name }))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)

  // console.log(x("Burj Khalifa"))

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.height })])
    .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", 'translate(0, ' + HEIGHT + ')') 
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

  const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(function(d) { return d + "m" })    
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

  const rects = g.selectAll("rect")
    .data(data)
  
  rects.enter().append("rect")
    .attr("y", function(d) { return y(d.height) })
    .attr("x", function(d) { return x(d.name) })
    .attr("width", x.bandwidth)
    .attr("height", function(d) { return HEIGHT - y(d.height)})
    .attr("fill", "grey")
})