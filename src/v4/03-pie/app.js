(function () {
  'use strict';

  const width = 300;
  const height = 300;
  const innerRadius = width / 8;
  const outerRadius = width / 3;

  const innerRadiusFinal = width / 10;
  const outerRadiusFinal = width / 2.8;
  // 进行数据转换
  var pie = d3.pie().sort(null).value(function (d) { return d[1]; });

  const data = [
    ["香蕉", 150],
    ["苹果", 200],
    ["菠萝", 190],
    ["南瓜", 250],
    ["雪梨", 350],
    ["西红柿", 190]
  ]
  var pieData = pie(data);

  var svg = d3.select("body").
    append("svg").
    attr("width", width).
    attr("height", height);

  //创建一个弧生成器
  var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  // for animation
  var arcFinal = d3.arc().
    innerRadius(innerRadiusFinal).
    outerRadius(outerRadiusFinal);

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  //添加路径
  //添加对应的弧组，即对应的弧元素<g>
  var arcs = svg.selectAll("g").
    data(pieData).
    enter().
    append("g").
    attr("transform", function () {
      return `translate(${ width / 2 }, ${ height / 2})`;
    });
  //添加弧的路径元素
  arcs.append("path").
    attr("fill", function (d, i) { return color(i);}).
    attr("d", function (d) { return arc(d); }).
    on("click", function (d) {
      console.log(d.data);
    }).
    on("mouseover", function (d) {
      tooltip.html(d.data[0] + ":" + d.data[1]).
        style("left", d3.event.pageX + 20 + "px").
        style("top", d3.event.pageY + 20 + "px").
        style("opacity", 1);
      d3.select(this).transition().duration(150).attr("d", arcFinal);
    }).
    on("mouseout", function () {
      d3.select(this).transition().duration(150).attr("d", arc);
      tooltip.style("opacity", 0);
    });

  //添加文字
  arcs.append("text").
    attr("transform", function (d) {
      var x = arc.centroid(d)[0];
      var y = arc.centroid(d)[1];
      return `translate(${x}, ${y})`;
    }).
    text(function (d) {
      var percent = Number(d.value) /
        d3.sum(data, function (d) { return d[1];}) * 100;
      return percent.toFixed(2) + "%";
    }).
    attr("text-anchor", "middle").
    attr("fill", "#fff").
    style("font-size", "10px");

  //添加提示框
  var tooltip = d3.select("body").
    append("div").
    attr("class", "tooltip").
    style("opacity", 0);

})();