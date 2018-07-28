/**
 *
 * Source code from https://www.jianshu.com/p/88f305000465
 *
 */
(function () {
  'use strict';

  // 创建比例尺
  const data = [
    {x: "上海", y: 100},
    {x: "北京", y: 200},
    {x: "天津", y: 280},
    {x: "西安", y: 100},
    {x: "武汉", y: 240},
    {x: "长沙", y: 210},
    {x: "深圳", y: 100},
    {x: "郑州", y: 220},
    {x: "驻马店", y: 410},
    {x: "信阳", y: 100},
    {x: "漯河", y: 220},
    {x: "商丘", y: 210},
    {x: "南阳", y: 100},
    {x: "纽约", y: 220},
    {x: "南昌", y: 210}
  ];

  var initWidth = 300;
  var initHeight = 500;

  var padding = {left: 40, top: 20, right: 10, bottom: 20};

  var height = initWidth - padding.top - padding.bottom;
  var width = initHeight - padding.left - padding.right;

  var svg = d3.select("body").
    append("svg").
    attr("width", width).
    attr("height", height).
    style("padding-left", padding.left).
    style("padding-right", padding.right).
    style("padding-top", padding.top).
    style("padding-bottom", padding.bottom);

  // y比例尺
  let ydata = data.map(function (e, i) { return e.y; });
  let yScale = d3.scaleLinear().domain([0, d3.max(ydata)]).range([height, 0]);

  let _yScale = d3.scaleLinear().domain([0, d3.max(ydata)]).range([0, height]);

  let yAxis = d3.axisLeft(yScale);

  svg.append('g').
    attr('class', 'axis').
    attr('transform', `translate(0,0)`).
    call(yAxis);

  //x轴比例尺
  let xData = data.map(function (e, i) { return e.x;});
  let xScale = d3.scaleBand()  //定义序数比例尺
    .domain(xData).rangeRound([0, width]).padding(0.1);
  //定义x轴
  let xAxis = d3.axisBottom(xScale);

  //添加x轴
  svg.append("g").
    attr("class", "axis--x").
    attr("transform", "translate(" + "0 ," + height + ")").
    call(xAxis);

  var rect = svg.selectAll("rect").
    data(data).
    enter().
    append("rect")
    .attr("x", function (d, i) {
      return xScale(d.x);
    })
    .attr("y", function (d) {
      return height - _yScale(d.y);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return _yScale(d.y);
    })
    .attr("fill", "steelBlue")
    .on("mouseover",function(){
      d3.select(this).attr("fill", "yellow")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill","steelBlue")
    });

  var text = svg.append("g").
    selectAll("text").
    data(data).
    enter().
    append("text").
    attr("x", function (d, i) {
      return xScale(d.x);
    }).
    attr("y", function (d) {
      return height - _yScale(d.y);
    }).
    attr("dy", "1em").
    attr("dx", xScale.bandwidth() / 2).
    attr("text-anchor", "middle").
    attr("font-size", '14px').
    attr("fill", "#fff").
    text(function (d) {
      return d.y;
    });


})();
