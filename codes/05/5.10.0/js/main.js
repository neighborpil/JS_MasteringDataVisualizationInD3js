/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

let year = 1800
let continents = new Set()

// svg
const svg = d3.select("#chart-area").append("svg")
	.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

// g
const g = svg.append('g')
	.attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
	.attr('class', 'x axis-label')
	.attr('x', WIDTH / 2)
	.attr('y', HEIGHT + 60)
	.attr('font-size', '20px')
	.attr('text-anchor', 'middle')
	.text('GDP Per Capita ($)')

// Y label
g.append('text')
	.attr('class', 'y axis-label')
	.attr('x', -(HEIGHT / 2))
	.attr('y', -60)
	.attr('font-size', '20px')
	.attr('text-anchor', 'middle')
	.attr('transform', 'rotate(-90)')
	.text('Life Expectancy (Years)')
	
// Year label
var yearLabel = g.append('text')
	.attr('class', 'year label')
	.attr('x', WIDTH - 40)
	.attr('y', HEIGHT - 20)
	.attr('stroke', 'black')
	.attr('stroke-width', '.2px')

const x = d3.scaleLog()
	.base(10)
	.range([0, WIDTH])
	.domain([100, 150000])

const y = d3.scaleLinear()
	.range([HEIGHT, 0])
	.domain([0, 90])

const r = d3.scaleLinear()
	.range([5, 25])

const xAxisGroup = g.append("g")
	.attr("class", "x axis")
	.attr('transform', `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")
	.attr('class', 'y axis')
	
let continentColor = undefined;

d3.json("data/data.json").then(function(data){
	console.log(data);

	var newData = []

	data.forEach(d => {
		var newCountries = d.countries.filter(
			c => typeof(c.income) === 'number' 
			&& typeof(c.life_exp) === 'number' 
			&& typeof(c.population) === 'number')

		newData.push({year: d.year, countries: newCountries})
	})


	newData.forEach(d => {

		d.countries.forEach(c => {

			if(!continents.has(c.continent)){
				continents.add(c.continent)
			}
		})
	})
	
	continentColor = d3.scaleOrdinal()
		.domain(Array.from(continents))
		.range(d3.schemeCategory10)

	d3.interval(() => {
		update(newData.filter(d => Number(d.year) === year)[0]);
		year++

		if(year === 2014){
			year = 1800
		}
	}, 100)
})

function update(data) {
	console.log(data)

	r.domain([0, d3.max(data.countries, c=> c.population)])

	// transition
	const xAxisCall = d3.axisBottom(x)
		.ticks(3)
		.tickValues([400, 4000, 40000])
		.tickFormat(d => d + '$')
	xAxisGroup.call(xAxisCall)
		.selectAll('text')
			.attr('x', '0')
			.attr('y', '10')
			.attr('text-anchor', 'center')
	const yAxisCall = d3.axisLeft(y)
		.ticks(10)
		.tickFormat(d => d)
	yAxisGroup.call(yAxisCall)

	const circles = g.selectAll('circle')
		.data(data.countries)

	circles.exit().remove()

	circles.enter().append('circle')
		.attr('fill', d => continentColor(d.population))		
		.attr('r', 0)
		.merge(circles)
			.attr('cx', d => x(d.income))
			.attr('cy', d => y(d.life_exp))
			.attr('r', d => r(d.population))

	yearLabel.text(data.year)
}