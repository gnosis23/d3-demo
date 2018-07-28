/**
 *
 * Source code from https://www.jianshu.com/p/9a8284269cae
 *
 */
(function () {
  'use strict';

  // 创建比例尺
  var data = [12, 25, 13, 23, 24, 55, 25, 30];

  //创建一个值域的线性比例尺
  var dataRange = d3.scaleLinear()
    .domain([0,100])
    .range([0, 300]);

  //创建一个颜色的线性比例尺
  var colorRange = d3.scaleLinear()
    .domain([0, 100])
    .range(['#29B6F6', '#01579B']);

  function render (data) {
    // Enter  当前选择中存在但是当前DOM元素中还不存在的每个数据元素的占位符节点。
    d3.select('body').selectAll('div.rect')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'rect')
      .append('span');

    // update
    d3.select('body').selectAll('div.rect')
      .data(data)
      .style('width', function(d) {
        return dataRange(d) + 'px'
      })
      .style('background-color', function (d) {
        return colorRange(d);
      })
      .select('span')
      .text(function (d) {
        return d;
      });

    // exit
    d3.select('body').selectAll('div.rect')
      .data(data)
      .exit()
      .remove();
  }

  render(data);

  d3.interval(function () {
    data.shift();
    data.push(Math.round(Math.random() * 100));
    render(data);
  }, 5000);
})();
