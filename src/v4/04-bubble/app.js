/**
 *
 * Source code from https://www.jianshu.com/p/88f305000465
 *
 */
(function () {
  'use strict';

  const circle_data =[
    {
      apple: [
        [0.5, 0.5],
        [1.6, 0.6],
        [1.2, 1.7],
        [1.5, 1.8],
        [1.9, 0.6],
        [1.4, 2],
        [2, 2.5],
        [2.1, 2]
      ]
    } ,
    {
      banana: [
        [1.1, 2.3],
        [1.8, 1.8],
        [1.1, 2],
        [1.3, 4],
        [1.7, 0.8],
        [1.2, 4.3],
        [2.5, 2.5],
        [3.5, 3.5],
        [5, 5]
      ]
    }
  ];

  const data = circle_data;
  var initWidth = 340;
  var initHeight = 500;

  var padding = { left:40, top:20, right:20, bottom: 20};

  var height = initWidth - padding.top - padding.bottom;
  var width  = initHeight - padding.left - padding.right;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('padding-left', padding.left)
    .style('padding-right', padding.right)
    .style('padding-top', padding.top)
    .style('padding-bottom', padding.bottom);

  let nums = [];
  data.forEach((e) => {
    for(var v in e) {
      nums = [...nums, ...e[v]]
    }
  });

  // ===========================================================================
  // y 轴
  // ===========================================================================

  // y 轴比例尺

  let ydata = nums.map(e => e[1]);
  let yScale = d3.scaleLinear()
    .domain([d3.min(ydata), d3.max(ydata)])
    .range([height, 0]);

  let _yScale = d3.scaleLinear()
    .domain([d3.min(ydata), d3.max(ydata)])
    .range([0, height]);
  console.log(yScale);

  // 定义 y 轴
  let yAxis = d3.axisLeft(yScale);

  // 添加 y 轴
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,0)')
    .call(yAxis);

  // ===========================================================================
  // x 轴
  // ===========================================================================

  // 定义 x 轴
  let xData = nums.map((e, i) => e[0]);
  let xScale = d3.scaleLinear()
    .domain([d3.min(xData), d3.max(xData)])
    .range([0, width]);

  let xAxis = d3.axisBottom(xScale);

  svg.append('g')
    .attr('class', 'axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);

  // ===========================================================================
  // 网格
  // ===========================================================================
  function make_x_gridlines () {
    return d3.axisBottom(xScale)
      .ticks(10);
  }

  function make_y_gridlines () {
    return d3.axisLeft(yScale)
      .ticks(10);
  }

  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height})`)
    .call(make_x_gridlines()
      .tickSize(-height)
      .tickFormat("")
    );

  svg.append('g')
    .attr('class', 'grid')
    .call(make_y_gridlines()
      .tickSize(-width)
      .tickFormat('')
    );

  // ===========================================================================
  // 圆圈
  // ===========================================================================
  const colors = ['rgba(245,0,87,0.75)', 'rgba(63,81,181,0.75)'];

  let showtext = svg.append('text')
    .text('')
    .attr('font-size', '14px');

  const cover = svg.append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('class', function(d, i){
      return Object.keys(d)[0];
    });

  cover.selectAll('circle')
    .data(d => {
      return Object.values(d)[0]
    })
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => height - _yScale(d[1]))
    .attr('r', () => {
      let t = Math.random() * 20;
      return t > 8 ? t : t + 8;
    })
    .attr('class', function() {
      return 'circle_' + d3.select(d3.select(this)._groups[0][0].parentNode).attr('class')
    })
    .attr('fill', function() {
      console.log(d3.select(this));
      let t = d3.select(d3.select(this)._groups[0][0].parentNode).attr('class');
      console.log(t);
      data.forEach((e, i) => {
        for (let v in e) v === t ? t = i : ''
      });
      return colors[t];
    })
    .on('mouseover', function (d) {
      let self = this;
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d3.select(this).attr('r') * 1.6);
      showtext
        .attr('x', () => xScale(d[0]))
        .attr('y', () => height - _yScale(d[1]) - d3.select(self).attr('r') * 1.6)
        .text(() => String(d3.select(self).attr('class').split('_')[1]))
        .attr('text-anchor', 'middle')
        .attr('fill', () => {
          let t = d3.select(d3.select(self)._groups[0][0].parentNode).attr('class')
          data.forEach(function(e, i) {
            for (let v in e) v === t ? t = i : ''
          });
          return colors[t];
        })
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d3.select(this).attr('r') / 1.6)
      showtext.text('')
    })
    ;
})();
