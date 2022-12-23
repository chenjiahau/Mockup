const dimension = {
  width: 600,
  height: 600,
  margin: {
    top: 50,
    left: 50
  },
  svg: {
    width: 600 - 50 * 2,
    height: 600 - 50 * 2
  }
};

const drawChart = async () => {
  const data = await d3.json('data.json');

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimension.width)
    .attr('height', dimension.height);

  const ctr = svg.append('g')
    .attr('width', dimension.svg.width)
    .attr('height', dimension.svg.height)
    .attr('transform', `translate(${dimension.margin.top}, ${dimension.margin.left})`);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['download_time'])])
    .range([dimension.svg.height, 0]);

  const x = d3.scaleBand()
    .domain(data.map(item => item['app_name']))
    .range([0, dimension.svg.width])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  ctr.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr("height", d => dimension.svg.height - y(d['download_time']))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d['app_name']))
    .attr('y', d => y(d['download_time']));

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y)
    .tickFormat(d => d / 100);

  const xAxisGroup = ctr.append('g')
    .attr('transform', `translate(0, ${dimension.svg.height})`)

  xAxisGroup.append('text')
    .attr('x', dimension.svg.width - 20)
    .attr('y', 40)
    .attr('fill', 'black')
    .html('App name');

  const yAxisGroup = ctr.append('g');

  yAxisGroup.append('text')
    .attr('x', 40)
    .attr('y', -10)
    .attr('fill', 'black')
    .html('Times(x100)');

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll('text')
    .classed('x-tick-label', true)
}

drawChart();