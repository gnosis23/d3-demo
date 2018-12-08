/**
 *
 * Source code from https://www.jianshu.com/p/869f79e8bb39
 *
 */
(function () {
  'use strict';

  const width = 500,
    height = 500;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var nodes = [
    { name: "XiaMen" },
    { name: "BeiJing" },
    { name: "XiAn" },
    { name: "HangZhou" },
    { name: "ShangHai" },
    { name: "QingDao" },
    { name: "NanJing" },
    { name: "QueShan" }

  ];

  var links = [
    { source: 'BeiJing', target: "XiaMen" },
    { source: 'BeiJing', target: "XiAn" },
    { source: 'BeiJing', target: "XiaMen" },
    { source: 'BeiJing', target: "HangZhou" },
    { source: 'BeiJing', target: "ShangHai" },
    { source: 'BeiJing', target: "QingDao" },
    { source: 'BeiJing', target: "NanJing" },
    { source: 'QueShan', target: "XiaMen" },
    { source: 'QueShan', target: "XiAn" },
    { source: 'QueShan', target: "XiaMen" },
    { source: 'QueShan', target: "HangZhou" },
    { source: 'QueShan', target: "ShangHai" },
    { source: 'QueShan', target: "QingDao" },
    { source: 'QueShan', target: "NanJing" }
  ];

  var simulation = d3.forceSimulation(nodes) // 根据指定的节点数组创建一个没有作用力的仿真
    .force("link", d3.forceLink(links).distance(100).strength(1).id((d) => d.name))
    // 连线作用力
    .force("charge", d3.forceManyBody())  // 节点间的作用力
    .force("center", d3.forceCenter(width / 2, height / 2));
  //重力，布局的参考位置，力导向图的中心点

  console.log(nodes);

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var svg_links = svg.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .style('stroke', '#ccc')
    .style('stroke-width', 1);

  var svg_nodes = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .style('fill', (d, i) => color(i))
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  var svg_text = svg.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .style('fill', '#000')
    .attr('font-size', '12px')
    .attr('dx', 0)
    .attr('dy', 20)
    .attr('text-anchor', 'middle')
    .text(d => d.name);

  function draw() {
    svg_nodes
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });

    svg_text
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y; });

    svg_links
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });
  }

  simulation.on("tick", draw);

})();
