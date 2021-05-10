/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 3 - CoinStats
*/
		
const MARGIN = { LEFT: 20, RIGHT: 100, TOP: 50, BOTTOM: 100 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const targets = [
	'bitcoin',
	'ethereum',
	'bitcoin_cash',
	'litecoin',
	'ripple',
] 
const types = [
	'price_usd',
	'market_cap',
	'24h_vol'
]
let coin = {
	target: 'bitcoin',
	type: types[0],
	startDate: null,
	endDate: null
}
let coins = undefined

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// time parser for x-scale
const parseTime = d3.timeParse("%m/%d/%Y")
// for tooltip
const bisectDate = d3.bisector(d => d.year).left

// scales
const x = d3.scaleTime().range([0, WIDTH])
const y = d3.scaleLinear().range([HEIGHT, 0])

// axis generators
const xAxisCall = d3.axisBottom()
const yAxisCall = d3.axisLeft()
	.ticks(6)
	.tickFormat(d => `${parseInt(d / 1000)}k`)

// axis groups
const xAxis = g.append("g")
	.attr("class", "x axis")
	.attr("transform", `translate(0, ${HEIGHT})`)
const yAxis = g.append("g")
	.attr("class", "y axis")
    
// y-axis label
yAxis.append("text")
	.attr("class", "axis-title")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.attr("fill", "#5D6971")
	.text("Population)")

// line path generator
const line = d3.line()
	.x(d => x(d.year))
	.y(d => y(d.value))

d3.json("data/coins.json").then(theCoins => {

	
	// clean data
	Object.entries(theCoins).forEach(coin => {

		coin[1].forEach(c => {
			c['24h_vol'] = Number(c['24h_vol'])
			//c.24h_vol = Number(c.24h_vol);
			c.market_cap = Number(c.market_cap)
			c.price_usd = Number(c.price_usd)
			c.date = parseTime(c.date)
		})
	})

	coins = theCoins;
	
	let options = {
		target: targets[0],
		type: types[0],
		startDate: d3.max(coins[targets[0]], d => d.date),
		endDate: d3.min(coins[targets[0]], d => d.date)
	}

	changeGraph(options);
})


function changeGraph(options) {
	let coin = coins[options.target]	
	// set scale domains
	x.domain(d3.extent(data, d => d.date))
	y.domain([
		d3.min(data, d => d.value) / 1.005, 
		d3.max(data, d => d.value) * 1.005
	])

	// generate axes once scales have been set
	xAxis.call(xAxisCall.scale(x))
	yAxis.call(yAxisCall.scale(y))

	// add line to chart
	g.append("path")
		.attr("class", "line")
		.attr("fill", "none")
		.attr("stroke", "grey")
		.attr("stroke-width", "3px")
		.attr("d", line(data))
		

	/******************************** Tooltip Code ********************************/

	const focus = g.append("g")
		.attr("class", "focus")
		.style("display", "none")

	focus.append("line")
		.attr("class", "x-hover-line hover-line")
		.attr("y1", 0)
		.attr("y2", HEIGHT)

	focus.append("line")
		.attr("class", "y-hover-line hover-line")
		.attr("x1", 0)
		.attr("x2", WIDTH)

	focus.append("circle")
		.attr("r", 7.5)

	focus.append("text")
		.attr("x", 15)
		.attr("dy", ".31em")

	g.append("rect")
		.attr("class", "overlay")
		.attr("width", WIDTH)
		.attr("height", HEIGHT)
		.on("mouseover", () => focus.style("display", null))
		.on("mouseout", () => focus.style("display", "none"))
		.on("mousemove", mousemove)

	function mousemove() {
		const x0 = x.invert(d3.mouse(this)[0])
		const i = bisectDate(data, x0, 1)
		const d0 = data[i - 1]
		const d1 = data[i]
		const d = x0 - d0.year > d1.year - x0 ? d1 : d0
		focus.attr("transform", `translate(${x(d.year)}, ${y(d.value)})`)
		focus.select("text").text(d.value)
		focus.select(".x-hover-line").attr("y2", HEIGHT - y(d.value))
		focus.select(".y-hover-line").attr("x2", -x(d.year))
	}
	
	/******************************** Tooltip Code ********************************/



}