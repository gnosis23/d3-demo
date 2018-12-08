/**
 *
 * Source code from https://www.jianshu.com/p/869f79e8bb39
 *
 */
(function () {
  'use strict';

  const line_data = [
    {
      country: "china",
      gdp: [
        [2008, 2033],
        [2009, 2400],
        [2010, 4333],
        [2011, 5600],
        [2012, 6500],
        [2013, 6700],
        [2014, 6933],
        [2015, 7400],
        [2016, 7733],
        [2017, 8200]
      ]
    },
    {
      country: "japan",
      gdp: [
        [2008, 3333],
        [2009, 4400],
        [2010, 5233],
        [2011, 5800],
        [2012, 6333],
        [2013, 6400],
        [2014, 6533],
        [2015, 6700],
        [2016, 7033],
        [2017, 7200]
      ]
    }
  ];

  const data = line_data;

  const initWidth = 960;
  const initHeight = 500;

  const margin = { left: 70, top: 20, right: 20, bottom: 50 };

  const height = initHeight - margin.top - margin.bottom;
  const width  = initWidth - margin.left - margin.right;

  const svg = d3.select('body')
    .append('svg')
    .attr('id', 'chart')
    .attr('width', initWidth)
    .attr('height', initHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.bottom})`);

  // y轴比例尺
  let nums = [...data[0].gdp, ...data[1].gdp].map(x => x[1]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(nums)])
    .range([height, 0]); // y轴是从上到下是递增的

  // 研究下 v4 的坐标轴
  let yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format('d'));

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,0)`)
    .call(yAxis);

  // x轴比例尺
  let years = data[0].gdp.map(x => x[0]);

  let xScale = d3.scaleLinear()
    .domain([2008, 2017])
    .rangeRound([0, width]);

  let xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format('d'));

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  // gridlines
  function make_x_gridlines() {
    return d3.axisBottom(xScale).ticks(years.length);
  }

  const grid = svg.append('g')
    .attr('id', 'grid')
    .attr('transform', `translate(0, ${height})`)
    .call(make_x_gridlines()
      .tickSize(-height)
      .tickFormat("")
    )

  const linePath = d3.line()
    .curve(d3.curveCardinal.tension(0.5))
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  const colors = ['rgb(0,188,212)', 'rgb(255, 64, 129)'];

  svg.append('g').selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('transform', 'translate(0,0)')
    .attr('d', d => linePath(d.gdp))
    .attr('fill', 'none')
    .attr('stroke-width', '2px')
    .attr('stroke', (d,i) => colors[i])


})();
