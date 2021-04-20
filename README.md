# D3.js
 - Data Visualiation tool
 - CDN: <script src="https://d3js.org/d3.v6.min.js"></script>


### D3 Select
 - d3.select("rect") : 모든 사각형 중 처음 나오는 것 선택
 - d3.select("#center") : id가 center인 것 선택
 - d3.selectAll("rect") : 모든 사각형 선택
 - d3.selectAll(".outside") : class가 outside인 것 선택 - d3.selectAll(".outside") : class가 outside인 것 선택

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

### D3 Array 데이터 불러오기
 - .data(변수명) 방식으로 불러오고
 - .enter() 방식으로 여러개 등록 가능(람다 필요)
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
### Time Scale
 - Linear Scale과 동일하나, input값이 시간값이다
 - Javascript Date Object를 사용한다
```
const y = d3.scaleTime()
  .domain([
    new Date(2000, 0, 1), // 시작일
    new Date(2001, 0, 1) // 종료일
   ]) // input 범위
  .range([0, 400]) // output 범위

y(100) // input을 output으로
v.invert(48.3) // output을 input으로 
```

### Ordinal Scale
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

### Band Scales
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
