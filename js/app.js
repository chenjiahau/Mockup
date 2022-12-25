const dimension = {
  // svg的寬、高
  svg: {
    width: 600,
    height: 600,
  },
  // SVG內的container的寬、高
  container: {
    width: 600 - 50 * 2,
    height: 600 - 50 * 2
  },
  // SVG與container的間距
  margin: {
    top: 50,
    left: 50
  },
};

const drawChart = async () => {
  const data = await d3.json('data.json'); // get data

  // 1. Select the element and append a SVG inside
  const svg = d3.select('#chart') // select chart element
    .append('svg') // append SVG
    .attr('width', dimension.svg.width) // width for SVG
    .attr('height', dimension.svg.height); // height for SVG

  // 2. Append a g group into SVG
  const ctr = svg.append('g') // SVG append g group(container)
    .attr('width', dimension.container.width) // width for container
    .attr('height', dimension.container.height) // height for container
    // move y coordinate to 50 from top to bottom
    // move x coordinate to 50 from left to right
    .attr('transform', `translate(${dimension.margin.top}, ${dimension.margin.left})`);

  // 3-1. Create a y-scale function
  const y = d3.scaleLinear() // set scaleLinear
    .domain([0, d3.max(data, d => d['download_time'])]) // set doamin
    .range([dimension.container.height, 0]); // set range

  // 3-2. Create a x-scale function
  const x = d3.scaleBand() // set scaleBand
    .domain(data.map(item => item['app_name'])) // set doamin
    .range([0, dimension.container.width]) // set range
    .paddingInner(0.2) // 內縮
    .paddingOuter(0.2); // 外縮

  // 3-3. Generate bars and connect with x-scale and y-scale
  ctr.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr("height", d => dimension.container.height - y(d['download_time']))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d['app_name']))
    .attr('y', d => y(d['download_time']));

  // 4-1. Create a axisBottom function
  const xAxis = d3.axisBottom(x);

  // 4-2/ Create a axisLeft function
  const yAxis = d3.axisLeft(y)
    .tickFormat(d => d / 100);

  // 4-3. Append a g group for x-axis
  const xAxisGroup = ctr.append('g')
    .attr('transform', `translate(0, ${dimension.container.height})`)

  // (Optional) the unit of x axis
  xAxisGroup.append('text')
    .attr('x', dimension.container.width - 20)
    .attr('y', 40)
    .attr('fill', 'black')
    .html('App name');

  // 4-4. Append a g group for y-axis
  const yAxisGroup = ctr.append('g');

  // (Optional) the unit of y axis
  yAxisGroup.append('text')
    .attr('x', 40)
    .attr('y', -10)
    .attr('fill', 'black')
    .html('Times(x100)');

  // 4-5. Connect x axis and y axis function
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // (Optional) the style of ticks
  xAxisGroup.selectAll('text')
    .classed('x-tick-label', true)
}

drawChart();