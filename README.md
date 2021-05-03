# D3.js
 - Data Visualiation tool
 - CDN: <script src="https://d3js.org/d3.v6.min.js"></script>


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
var formatTime = d3.timeFormat("%B %d %Y");

formatTime(new Date()); // "June 30, 2015"
```

 - Parsing: String => Date Object
```
var parseTime d3.timeParse("%B %d, %Y");
parseTime("June 30, 2015")
```
![image](https://user-images.githubusercontent.com/22423285/116845620-423b1a80-ac21-11eb-8ccc-9589595c23f1.png)

## Tooltips
 - 3rd party addon
 - ![image](https://user-images.githubusercontent.com/22423285/116864200-72df7c00-ac42-11eb-831e-38990f29e8d6.png)

