# D3.js
 - Data Visualiation tool
 - CDN: <script src="https://d3js.org/d3.v6.min.js"></script>

# D3 Selection
## D3 Select
 - grap hold of elements on the screen

## D3 Append
 - add SVGs onto your selection

## D3 Attr
 - set attributes of SVGs to make them appear on the screen



### D3 Select
 - d3.select("rect") : 모든 사각형 중 처음 나오는 것 선택
 - d3.select("#center") : id가 center인 것 선택
 - d3.selectAll("rect") : 모든 사각형 선택
 - d3.selectAll(".outside") : class가 outside인 것 선택 - d3.selectAll(".outside") : class가 outside인 것 선택

### ※D3 attributes
[Document][http://www.d3noob.org/2014/02/attributes-in-d3js.html]
#### 1. Rectangle
  - .attr("x", 100) : 객체의 x축 좌표
  - .attr("y", 50) : 객체의 y축 좌표
  - .attr("height", 100) : 객체의 높이
  - .attr("width", 200) : 객체의 너비
```
holder.append("rect")       // attach a rectangle
    .attr("x", 100)         // position the left of the rectangle
    .attr("y", 50)          // position the top of the rectangle
    .attr("height", 100)    // set the height
    .attr("width", 200);    // set the width
```
#### 2. line
 - .attr("x1", 100) : 시작점 x축 좌표
 - .attr("y1", 100) : 시작점 y축 좌표
 - .attr("x2", 100) : 끝점 x축 좌표
 - .attr("y2", 100) : 끝점 y축 좌표
```
holder.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 100)     // x1 position of the first end of the line
    .attr("y1", 50)      // y1 position of the first end of the line
    .attr("x2", 300)     // x2 position of the second end of the line
    .attr("y2", 150);    // y2 position of the second end of the line
```
#### 4. points
 - .attr("points", "100,50, 200,150, 300,50") : 좌표들
```
holder.append("polyline")      // attach a polyline
    .style("stroke", "black")  // colour the line
    .style("fill", "none")     // remove any fill colour
    .attr("points", "100,50, 200,150, 300,50");  // x,y points
```
#### 5. Ellipse
 - .attr("cx", 200) : 중심점 x 좌표
 - .attr("cy", 100) : 중심점 y 좌표
 - .attr("rx", 100) : x축 반지름
 - .attr("ry", 50) : y축 반지름
```
holder.append("ellipse")       // attach an ellipse
    .attr("cx", 200)           // position the x-centre
    .attr("cy", 100)           // position the y-centre
    .attr("rx", 100)           // set the x radius
    .attr("ry", 50);           // set the y radius
```
#### 6. Circle
 - .attr("cx", 200) : 중심점 x 좌표
 - .attr("cy", 100) : 중심점 y 좌표
 - .attr("r", 100) : 반지름
```
holder.append("circle")        // attach a circle
    .attr("cx", 200)           // position the x-center
    .attr("cy", 100)           // position the y-center
    .attr("r", 50);            // set the radius
```
#### 7. Text
 - .attr('dy', '.35em') : y위치로부터의 오프셋
```
holder.append("text")         // append text
    .style("fill", "black")   // fill the text with the colour black
    .attr("x", 200)           // set x position of left side of text
    .attr("y", 100)           // set y position of bottom of text
    .attr("dy", ".35em")           // set offset y position
    .attr("text-anchor", "middle") // set anchor y justification
    .attr("transform", "rotate(10)")
    .text("Hello World");          // define the text to displ
```


### D3 Append
 - element가 선택이 되면 child 노드를 append하는 것이 가능하다
 - 선택한 elementdml attribute를 변경하는 것이 가능하다
```
const svg = d3.select('#canvas')
const rect = svg.append("rect")
rect.attr("x", 25)
rect.attr("y", 0)
rect.attr("width", 150)
rect.attr("height", 60)
rect.attr("fill", "blue")
```
### D3 g
 - svg에서의 g와 동일하다
 - 그룹을 뜻한다. 하위노드들을 같이 움직일 때사용한다
 - 축 변경시 전체 움직여야 하니 자주 사용한다
```
const xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")
  .attr("class", "y axis")
```

### viewBox옵션
 - viewBox옵션을 주게 되면 chart가 responsive하게 변한다
```
width = 500; 
height = 500; 
const svg = d3 
  .select("#chart") 
  .append("svg") 
  .attr("viewBox", `0 0 ${width} ${height}`)

```

### D3 Array 데이터 불러오기
 - .data(변수명) 방식으로 불러오고
 - .enter() 방식으로 여러개의 노드들을 화면에 일괄 등록
```
const data = [25, 20, 10, 12, 15]

const svg = d3.select('#chart-area').append("svg")
    .attr("width", 400)    
    .attr("height", 400)

const circles = svg.selectAll('circle')
    .data(data)

circles.enter().append('circle')
    .attr('cx', (d, i) => (i * 50) + 50) // d: 아이템, i: 인덱스
    .attr('cy', 250)
    .attr('r', (d) => d) // d: 아이템
    .attr('fill', "blue")
```


### 외부 데이터 불러오기
 - 아래의 csv, tsv, json메소드를실행하여 데이터가 있으면 then()이 실행됨
 - .csv : Comma Separated Values
```
d3.csv("data/ages.csv").then(data => {});
```
 - .tsv : Tab Seperated Values
```
d3.tsv("data/ages.tsv").then(data => {});
```
 - .json : Javascript Object Notation
```
d3.json("data/ages.json").then(data => {});
```

### Scale
 - input된 데이터의 범위를 한정 및 변환하여 output으로 바꾸어준다

#### Linear Scale
```
const y = d3.scaleLinear()
  .domain([0, 828]) // input 범위
  .range([0, 400]) // output 범위

y(100) // input을 output으로
v.invert(48.3) // output을 input으로 
```

#### Log Scale
 - 지수단위로 급격하게 변화하는 데이터를 보여주는데 좋다
 - base value를 10으로 하면 1, 10, 100, 1000 이 동일한 간격으로 표시
 - 0을 포함하는 값이면 하면 안된다.(수렴하지 0에 도달하지는 않으므로)
```
const y = d3.scaleLog()
  .domain([0, 828]) // input 범위
  .range([0, 400]) // output 범위
  .base(10) // log 및 값

y(100) // input을 output으로
v.invert(48.3) // output을 input으로 
```
#### Time Scale
 - Linear Scale과 동일하나, input값이 시간값이다
 - Javascript Date Object를 사용한다
```
const y = d3.scaleTime()
  .domain([
    new Date(2000, 0, 1), // 시작일
    new Date(2001, 0, 1) // 종료일
   ]) // input 범위
  .range([0, 400]) // output 범위

y(new Date(2000, 7, 1)) // input을 output으로
v.invert(48.3) // output을 input으로 
```

#### Ordinal Scale
 - 색깔의 범위를 주고 싶을 때 사용
 - domain과 range의 인덱스에 따라서 매핑
 - 만약에 domain에 없는 값을 사용하였을 경우, 자동으로 domain에 추가된다
 - 만약 domain의 개수가 range보다 많으면 자동으로 range의 인덱스가 0부터 갱신하여 값을 반환한다
 - invert메소드가 없다
 - 기본 제공 컬러
   + d3.schemeCategory10
   + d3.schemeCategory20
   + d3.schemeCategory20b
   + d3.schemeCategory20c
```
const y = d3.scaleOrdinal()
  .domain([
    "AFICAL", "N. AMERICA", "EUROPE", "S.AMERICA", "ASIA", "ASTRALASIA"
   ]) // input 범위
  .range([
    "RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "GREY"
  ]) // output 범위

color("ASIA") // "BLUE", input을 output으로
-----
const y = d3.scaleOrdinal()
  .domain([
    "AFICAL", "N. AMERICA", "EUROPE", "S.AMERICA", "ASIA", "ASTRALASIA"
   ]) 
  .range(d3.chemeCategory10) // 기본으로 제공하는 컬러

color("ASIA") // "#9467bc"
```

##### ※ d3-scale-chromatic
 - 다양한 색깔 조합 사용가능하게 해줌
```
<script src="https://cdn.jsdelivr.net/npm/d3-color@3"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-interpolate@3"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-scale-chromatic@3"></script>
<script>

const yellow = d3.interpolateYlGn(0); // "rgb(255, 255, 229)"
const yellowGreen = d3.interpolateYlGn(0.5); // "rgb(120, 197, 120)"
const green = d3.interpolateYlGn(1); // "rgb(0, 69, 41)"

</script>
```

#### Band Scales
 - 아이템의 개수에 따라 가로의 간격을 조절
 - PaddingInner: 0 ~ 1.0
 - PaddingOuter: 0 ~ 1.0
```
const y = d3.scaleBand()
  .domain([
    "AFICAL", "N. AMERICA", "EUROPE", "S.AMERICA", "ASIA", "ASTRALASIA"
   ]) // input 범위
  .range([0, 400]) // output 범위
  .paddingInner(0.3)
  .paddingOuter(0.2)

x("S.AMERICA") // "209", input을 output으로
x.bandwidth() // 하나의 가로 간격 표시
```

#### Threshold Scale
 - d3.scaleThreshold( domain, range )
 -  범위를 설정하고 그 범위 내에서의 값으로 변환하여 반환한다
 -  기본값은 0 - 1범위에 0.5이다
```
    var color = d3.scaleThreshold()        
        .domain(d3.range(2, 10))
        .range(d3.schemeBlues[9]);
```

#### MIN, MAX and EXTENT 설정
 - domain에 모든 값들을 하나하나 설정하기 힘듬
 - min, max값으로 시작, 끝값 잡아두면 편함
 - extent는 배열로 [최소값, 최대값]을 나타냄
 - map은 discrete data를 나타냄
※ discrete data(이산형 데이터) : 양적이 값이 아닌 카테고리를 나타내는 값
```
const data = [
 { grade: "A", value: 3 },
 { grade: "B", value: 5 },
 { grade: "C", value: 2 } 
]

const min = d3.min(data, d => d.value) // 2
const max = d3.max(data, d => d.value) // 5
const extent = d3.extent(data, d => d.value) // [2, 5]
const grade = data.map(d => d.grade) // ["A", "B", "C"]

const y = d3.scaleLinear()
  .domain([
    d3.min(data, d => d.value),
    d3.max(data, d => d.value)
  ])
  .range([0, 400])
  

const y = d3.scaleLinear()
  .domain(d3.extent(data, d => d.value)
  .range([0, 400])


const y = d3.scaleLinear()
  .domain(d3.map(data, d => d.grade)
  .range([0, 400])
```
## SVG Groups
### transform
 - 그룹으로 묶어서 그룹 내 모든 객체를 움직이기 위해 사용
```
<svg width="600" height="600">
  <g transform="translate(200, 0)">
    <rect x="20" y="20" width="50" height="50" fill='blue"></rect>
    <rect x="80" y="80" width="50" height="50" fill='blue"></rect>
  </g>
</svg>
```
#### translate(x, y)
 - svg함수와 동일
 - transform으로 묶인 그룹을 x, y만큼 이동
 - 좌표계는 좌측 위가 (0,0)이므로 이를 중심으로 이동
 - label등을 표시하기 위하여 margin을 줄 때 사용
```
.append("g")
  .attr("transform", `translate(${MARGIN-LEFT}, ${MARGIN.TOP})`)
```
 - 좌표계가 bottomAxis, rightAxis등으로 바뀔 때 사용

### d3에서의 그루핑
```
const MARGIN = { LEFT: 10, RIGHT: 10, TOP: 10, BOTTOM: 10 }
const WIDTH = 960 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const g = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
.append("g")
  .attr("transform", `translate(${MARGIN-LEFT}, ${MARGIN.TOP})`)
  
```

## Axis
#### Axis Generators
 - 축을 설정한다
```
const leftAxis = d3.axisLeft(yScale) // 축을 설정하고
g.append("g")
  .attr("class", "left axis") // class는 의미가 없다. 하지만 어떤일을 하는지 명확하게 할대 
  .call(leftAxis) // 화면에 표시한다
  
const topAxis = d3.axisTop(xScale)
g.append("g")
  .attr("class", "top axis")
  .call(topAxis)

const bottomAxis = d3.axisBottom(xScale)
g.append("g")
  .attr("class", "bottom axis")
  .attr("transform", `translate(0, ${HEIGHT})`) // bottomAxis를 사용하려면 반드시 translate필요
  .call(bottomAxis)

const rightAxis = d3.axisRight(yScale)
g.append("g")
  .attr("class", "right axis")
  .attr("transform", `translate(0, ${WIDTH})`) // rightAxis를 사용하려면 반드시 translate필요
  .call(rightAxis)
  
```

## Tick
 - 축 안의 눈금 의 간격
#### Tick Sizing and Spacing
 - 바깥쪽에 선언된 것이 먼저 선언된 것을 취소시킨다
```
d3.axisButtom(xScale)
  .tickSize(VALUE) // 안쪽 바깥쪽 둘 다
  
d3.axisButtom(xScale)
  .tickSizeOuter(VALUE) // 바깥쪽
  
d3.axisButtom(xScale)
  .tickSizeInner(VALUE) // 안쪽

```
#### How many
```
d3.axisBottom(xScale)
  .ticks(10)
```
#### Text Format
```
d3.axisBottom(xScale) // floating point num, no dcimal points
  .tickFormat(d3.format(",.0f"))


d3.axisBottom(xScale) // Custom formatting
  .tickFormat(d => {
    return "Tick Text
  })
```

#### Explicit values
```
d3.axisBottom(xScale)
  .tickValues([1, 2, 3, 4, 5, 10, 20])
```

#### ※ Color picker
 - colorbrewer2.org

## Update 
 - 데이터를 동적으로 움직이게 하기 위하여 사용
 - interval함수를 이용하여 주기적으로 데이터를 갱신
```

d3.interval(() => {
  update(data);
}, 1000)
```
 - 한번만 불러오는 것(축, label, 데이터 로딩 등)을 분리하여 interval내에서 동적으로 필요한 부분만 적용

### D3 Update Pattern
 - d3에 Object를 선택하면(selectAll) 내부적으로 3가지 그룹을 포함하고 있다
   + _enter: data array안에 있지만 화면에 표시되지 않은 것
   + _exit: 화면에는 있지만 data array에는 없는 것, 화면에서 제거되어야 함
   + _groups: 화면에 존재하는 모든 object

#### 업데이트하기 위해서는 아래의 패턴을 따라야 한다
1. Data Join - select all matching elements on the screen with selectAll, and update the data that we're using.
```
const text = svg.selectAll("text")
  .data(data)
```
2. Exit - use the exit() selector to remove the elements that don't exist in our new array of data.
```
text.exit().remove()
```
3. Update - set attributes for existing elements on the screen.
```
text.attr('fill', 'red')
```
4. Enter - use the enter() selector to set attributes for new items in our data array. 
```
rects.enter().append("text")
  .attr("x", (d, i) => i* 32)
  .attr("y", 0)
  .attr("fill", "green")
  .text(d => d);
```
### D3 Transitions
 - duration을 설정함으로써 스무스하게 변경하게 해준다
```
rects.enter().append("rect")
  .attr("y", d => y(d.month))
  .attr("x", (d) => x(d.month))
  .attr("width", x.bandwidth)
  .attr("height", d => HEIGHT - y(d.revenue))
  .attr("fill", "gray")
  .attr("fill-opacity", 1) // 1 : invisible
  .transition(d3.transition().duration(500))
    .attr("y", d => y(d.revenue))
    .attr("fill-opacity", 0) // 0 : visible
```

#### merge()
 - transition시에 ENTER와 UPDATE를 같이 표시하기 위해 사용
 1. Before
```
  // UPDATE old elements present in new data.
  rects.transition(t)
    .attr("y", d => y(d[value]))
    .attr("x", (d) => x(d.month))
    .attr("width", x.bandwidth)
    .attr("height", d => HEIGHT - y(d[value]))

  // ENTER new elements present in new data.  
  rects.enter().append("rect")
    .attr("x", (d) => x(d.month))
    .attr("width", x.bandwidth)
    .attr("fill", "grey")
    .attr("y", y(0)) // initial value
    .attr("height", 0) // intial value
    .transition(t)
      .attr("y", d => y(d[value]))
      .attr("height", d => HEIGHT - y(d[value]))
```
 2. After
```
  // ENTER new elements present in new data.  
  rects.enter().append("rect")    
    .attr("fill", "grey")
    .attr("y", y(0)) // initial value
    .attr("height", 0) // intial value
    // UPDATE old elements present in new data.
    .merge(rects)
    .transition(t)
      .attr("x", (d) => x(d.month))
      .attr("width", x.bandwidth)
      .attr("y", d => y(d[value]))
      .attr("height", d => HEIGHT - y(d[value]))

```

#### ※ 데이터를 배열순서가 아닌 변수에 매칭시키기
 - .data()함수에서 두번째 파라미터로 매칭시킬 변수를 지정한다
 - 이렇게 하지 않으면 데이터의 배열 순서로 매칭이 되어, 2가지 이상의 데이터를 표시할 경우 배열순서가 맞지 않는다.
```
  const rects = g.selectAll("rect")
    .data(data, d => d.month) // 배열의 순서가 아닌 월로 x축 레이블 매칭시키기
```

## Legend
 - 텍스트와 rect등으로 추가
```
const continents = ["europe", "asia", "america", "africa"]

const legend = g.append("g")
    .attr("transform", `translate(${WIDTH - 10}, ${HEIGHT - 125})`)

continents.forEach((continent, i) => {
    const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`)

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(continent))

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize") // css 설정
        .text(continent)
})
```

## Format
 - 데이터 포맷을 정리한다
 - d3.format('포맷');
   + .0% : rounded percentage(0.123 -> 12%)
   + $.2f : localized fixed-point currency(-3.5 => $3.50)
   + +20 : space-filled and signed(+42 => "                 +42)
   + .^20 : dot-filled and centered(42 => ".........42.........")
   + .2s : SI-prefix with two significant digits(42e6 => 42M)
   + #x : prefixed lowercase hexadecimal(48879 => "0xbeef")
   + ,.2r : grouped thousands with two significant digits(4223 => 4,200)
```
const formatter = d3.format(".2f")

formatter(1000) // 1000.00
formatter(5.248) // 5.25
formatter(30.1) // 30.10
```
### d3 format specifier
 - [[fill]align][sign][symbol][0][width][,][.precision][type]
 - [sign]
   + - : nothing for zero or positive and a minus sign for negative(Default)
   + + : a plus sign for zero or positive and a minus for negative
   + ( : nothing for zero or positive and parentheses for negative
   +  (space) : a space fo zero or positive and a minus sign for negative
 - [symbol]
   + $ : apply currency symbols per the local definition
   + # : for binary, octal, hexadecimal notatoin => prefix byx 0b 0o 0x, respectively
 - [,] : adding a comma adds a group seperator(e.g. a comma for thousands)
 - [.percision] : decimal points
 - [type]
   + ![image](https://user-images.githubusercontent.com/22423285/116845333-7bbf5600-ac20-11eb-89e7-e768d76a4aa7.png)

### d3 Time format
 - Formatting: Date Object => String
```
%a - abbreviated weekday name.*
%A - full weekday name.*
%b - abbreviated month name.*
%B - full month name.*
%c - the locale’s date and time, such as %x, %X.*
%d - zero-padded day of the month as a decimal number [01,31].
%e - space-padded day of the month as a decimal number [ 1,31]; equivalent to %_d.
%f - microseconds as a decimal number [000000, 999999].
%g - ISO 8601 week-based year without century as a decimal number [00,99].
%G - ISO 8601 week-based year with century as a decimal number.
%H - hour (24-hour clock) as a decimal number [00,23].
%I - hour (12-hour clock) as a decimal number [01,12].
%j - day of the year as a decimal number [001,366].
%m - month as a decimal number [01,12].
%M - minute as a decimal number [00,59].
%L - milliseconds as a decimal number [000, 999].
%p - either AM or PM.*
%q - quarter of the year as a decimal number [1,4].
%Q - milliseconds since UNIX epoch.
%s - seconds since UNIX epoch.
%S - second as a decimal number [00,61].
%u - Monday-based (ISO 8601) weekday as a decimal number [1,7].
%U - Sunday-based week of the year as a decimal number [00,53].
%V - ISO 8601 week of the year as a decimal number [01, 53].
%w - Sunday-based weekday as a decimal number [0,6].
%W - Monday-based week of the year as a decimal number [00,53].
%x - the locale’s date, such as %-m/%-d/%Y.*
%X - the locale’s time, such as %-I:%M:%S %p.*
%y - year without century as a decimal number [00,99].
%Y - year with century as a decimal number, such as 1999.
%Z - time zone offset, such as -0700, -07:00, -07, or Z.
%% - a literal percent sign (%).
```

```
var formatTime = d3.timeFormat("%B %d %Y");

formatTime(new Date()); // "June 30, 2015"
```

 - Parsing: String => Date Object
```
var parseTime d3.timeParse("%B %d, %Y");
parseTime("June 30, 2015")
```


## Tooltips
 - 3rd party addon
 - ![image](https://user-images.githubusercontent.com/22423285/116864200-72df7c00-ac42-11eb-831e-38990f29e8d6.png)

## Interactive
 - 이벤트 삽입 가능
```
let time = 0
let interval;
let formattedData;

function step() {
	// at the end of our data, loop back
	time = (time < 214) ? time + 1 : 0
	update(formattedData[time])
}

$("#play-button")
	.on('click', function() {
		const button = $(this)
		if(button.text() === 'Play') {
			button.text('Pause')
			interval = setInterval(step, 100)
		} else {
			button.text('Play')
			clearInterval(interval)
		}
	})

$('#reset-button')
	.on('click', () => {
		time = 0
		update(formattedData[0])
	})

$('#continent-select')
	.on('change', () => {
		update(formattedData[time])
	})

```
 - filter로 데이터 추출 가능
```
const continent = $('#continent-select').val()

	const filterdData = data.filter(d => {
		if(continent === 'all')
			return true
		else {
			return d.continent === continent
		}
	})

```


### ※ D3-tooltip
 - 3rd party opensource lib
 - [GitHub][https://github.com/caged/d3-tip]


### Slider
 - 외부 라이브러리를 써서 슬라이드의 값에 따라서 화면에 데이터 변화하여 표시
```

<div id="slider-div">
	<label>Year: <span id="year">1800</span></label>
	<div id="date-slider"></div> <!-- Slider -->
</div>


$('#date-slider').slider({
	min: 1800,
	max: 2014,
	step: 1,
	slide: (event, ui) => {
		time = ui.value - 1800
		update(formattedData[time])
	}
})

	// update the time label
	timeLabel.text(String(time + 1800))
	$("#year")[0].innerHTML = String(time + 1800)
	$("#date-slider").slider('value', Number(time + 1800))

```

### bisector
 - Locate the insertion point for x in array to maintain sorted order.

```
var data = [2, 3, 4, 5, 6, 7, 8]
var bisect = d3.bisector(function(d) { return d.date; }).left;
var result = bisect(data, 3); // result: 2
```
### dy attribute
 - 상대적으로 한번 더 이동할 때 사용
 - y축을 이동시킨후 이동시킨 축을 기점으로 또다시 이동할 때사용
 - dx도 마찬가지
 -
## D3 Layout
 - 내장 함수 또는 3rd party함수로써 데이터를 그래프의 양식에 맞게 재가공해준다
 - d3.pie() : index, angle
 - d3.force()
 - d3.stack() : partial data
 - d3.treemap() : depth 추가
 - d3.layout.cloud()


### Data structures and D3의 nest function
 - 데이터 양식은 여러가지가 될 수 있으며, 가공하는 것이 필요
 - array로 온 데이터는 Key를 만들어주면 손쉽게 접근 가능하다
```
var array = [
  {id: 1, value='test1'},
  {id: 2, value='test2'},
]

# map으로 변환
var array = {
  '1': {id: 1, value='test1'},
  '2': {id: 2, value='test2'},
}
```
 - D3의 nest() function을 이용하면 손쉽게 데이터를 재가공 해준다
![image](https://user-images.githubusercontent.com/22423285/119281038-ff43f400-bc6e-11eb-804a-4c677a31946c.png)


## Draw map(지형 그리는 방법)
 - GeoJSON : A JSON object that gives us information about places
   + D3.geoPath() 사용
 - TopoJSON : encodes topology(how high is a part of land), smaller size
   + TopoJSON.js 라이브러리 사용, topojson.feature(), topojson.mesh()
   + 주로 사용
 - 
## D3로 지도 그리는 방법
 - json보다 topojson을 더 많이 사용함
 - 
### json 사용 방식
```
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="//d3js.org/topojson.v2.min.js"></script>

<script>

    var width = 600,
        height = 400;

    // var projection = d3.geoConicEqualArea() // 북극을 중심으로 라운드되게 보여줌
    var projection = d3.geoMercator() // 4각형의 평면으로 보여줌
        .scale(153)
        .translate([width / 2, height / 2])        
        .precision(.1);

    var path = d3.geoPath()
        .projection(projection);

    var graticule = d3.geoGraticule();

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("data/world-110m.json").then(function(world){

        console.log(world)
        console.log(topojson.feature(world, world.objects.land))
        console.log(graticule)

        svg.append("path")
            .datum(topojson.feature(world, world.objects.land))
            .attr("class", "land")
            .attr("d", path)

        svg.append("path")
            .datum(topojson.mesh(world, world.objects.countries, function(a, b){
                return a !== b
            }))
            .attr("class", "boundary")
            .attr("d", path)

        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path)
    }).catch(function(error){
        console.log(error)
    });

    d3.select(self.frameElement).style("height", height + "px")

</script>

```

## D3 Queue
 - 여러개의 파일을 읽을 때 순차적으로 읽는다
 - 모든 파일이 로드 되면 시작한다
 - 동시에 파일들을 읽는다
 - D3 v5에서는 Promise를 사용한다
```
// d3 v3에서 사용한 방법
d3.queue()
  .defer(d3.json, "data/map.json")
  .defer(d3.csv, "data/example.csv")
  .await(function(map, example){
    // 
  });  
```
```
// D3 v5에서 사용하는 방법
var promises = [
  d3.json("data/map.json"),
  d3.csv("data/example.csv")
]

Promise.all(promises).then(function(allData){
  var map = allData[0];
  var example = allData[1];
  
}).catch(function(error){
  console.log(error);
});
```


## Choropleth Maps
 - map 위에 지역마다 다른 점을 색깔로 나타내는 것
![image](https://user-images.githubusercontent.com/22423285/120584986-e7891e80-c46b-11eb-929c-4411b452f20c.png)


## d3. force layout
 - it makes items wiggling over the map
 - repel : 다가가지 못하게 함(pull each other)
 - forceX forceY : very useful when grouping items

![image](https://user-images.githubusercontent.com/22423285/121101118-2fc28b00-c836-11eb-9300-26e14c60e025.png)

![image](https://user-images.githubusercontent.com/22423285/121101149-3c46e380-c836-11eb-80a5-c475bea70763.png)
![image](https://user-images.githubusercontent.com/22423285/121101275-7b753480-c836-11eb-90a8-31b3ee002a85.png)
![image](https://user-images.githubusercontent.com/22423285/121101466-dad34480-c836-11eb-9493-4eec5e36d46d.png)
![image](https://user-images.githubusercontent.com/22423285/121101522-f50d2280-c836-11eb-8709-ef849b1f2cde.png)


![image](https://user-images.githubusercontent.com/22423285/121101359-acee0000-c836-11eb-8054-cffb2b8aaff4.png)

![image](https://user-images.githubusercontent.com/22423285/121101292-8760f680-c836-11eb-905d-a9512878a3e3.png)


 - 예제 코드
```
<body>

    <nav class="navbar navbar-default"></nav>
    <svg width="600" height="600"></svg>

<script src="https://d3js.org/d3.v5.min.js"></script>

<script>

var svg = d3.select('svg')
    width = svg.attr('width')
    height = svg.attr('height');

var color = d3.scaleOrdinal(d3.schemeCategory10)

// Add "forces" to the simulation here
var simulation = d3.forceSimulation()
    .force('center', d3.forceCenter(width / 2, height / 2)) 
    .force('charge', d3.forceManyBody().strength(-50)) // repel each other
    .force('collide', d3.forceCollide(10).strength(0.9))
    .force('link', d3.forceLink().id(function(d) { return d.id; }));

d3.json('data/force.json').then(function(graph){

    console.log(graph.links)

    // Add lines for every link in the dataset
    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
            .attr('stroke-width', function(d) { return Math.sqrt(d.value); }) // 라인이 너무 굵어지는것 막음

        // Add circles for every node in the dataset
        var node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(graph.nodes)
            .enter().append('circle')
                .attr('r', 5)
                .attr('fill', function(d) { return color(d.group); })
                .cal음(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

        // Basic tooltips
        node.append('title')
            .text(function(d){ return d.id; })

        // Attach nodes to the simulation, add listener on the "tick" event
        simulation
            .nodes(graph.nodes)
            .on('tick', ticked)

        // Associate the lines with the "link" force
        simulation.force('link')
            .links(graph.links)
            
        // Dynamically update the position of the nodes/links as time passes
        function ticked() {
            link
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);

            node
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);
        }

}).catch(function(error) {
    console.log(error);
})

// Change the value of alpha, so things move around when we drag a node
function dragstarted(d) {
    if(!d3.event.active)
        simulation.alphaTarget(0.7).restart(); // 처음 시작하면 alpha값이 1에서 0으로 떨어지며 움직임이 서서히 멈춘다
    d.fx = d.x;                                // 드래그를 시자하면 0.7부터 시작하여 움직이고
    d.fy = d.y;                                // 드래그 종료(dragended)에서 0으로 alpha값이 변하며 움직임을 멈춘다
}

// Fix the position of the node that we are looking at
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

// Let the node do what it wants again once we've looked at it
function dragended(d) {
    if(!d3.event.active)
        simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
</script>
</body>
```

## Hirarchical Data
 - 용어 정리
![image](https://user-images.githubusercontent.com/22423285/121443375-5c0e1100-c9c8-11eb-9c03-9695ee0ac63f.png)

### D3 Hirarchy
 - d3.hierarchy(data[, children])
![image](https://user-images.githubusercontent.com/22423285/121443514-95468100-c9c8-11eb-8c07-fa51e69ffce6.png)

### D3 Stratify
 - d3.stratify()
 - 데이터를 계층화시켜준다
![image](https://user-images.githubusercontent.com/22423285/121443572-b4dda980-c9c8-11eb-9318-6ced30c89c53.png)

