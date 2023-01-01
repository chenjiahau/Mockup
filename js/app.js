const dimension = {
  width: 800,
  height: 600,
  margin: 50
};

const drawChart = async () => {
  let data = await d3.json('data.json');
  for (let index in data) {
    data[index].date = new Date(data[index].timestamp * 1000).toString();
  }
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimension.width)
    .attr('height', dimension.height);

  const graph = svg.append('g')
    .attr('width', dimension.width - dimension.margin * 2)
    .attr('height', dimension.height - dimension.margin * 2)
    .attr('transform', `translate(${dimension.margin}, ${dimension.margin})`);

  const x = d3.scaleTime().range([0, dimension.width - dimension.margin * 2]);
  const y = d3.scaleLinear().range([dimension.height - dimension.margin * 2, 0]);

  x.domain(d3.extent(data, d => new Date(d.date)));
  y.domain([0, d3.max(data, d => d.min)]);

  const path = graph.append('path');
  const line = d3.line()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.min));

  path.data([data])
    .attr('fill', 'none')
    .attr('stroke', '#000000')
    .attr('stroke-width', '2')
    .attr('d', line);

  const circles = graph.selectAll('circle')
    .data(data);

  circles.enter()
    .append('circle')
    .attr('r', '10')
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.min))

  const xAxis = d3.axisBottom(x)
    .ticks(4)
    .tickFormat(d3.timeFormat("%y/%m/%d"));

  const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + ' min');

  const xAxisGroup = graph.append('g')
    .attr('transform', "translate(0," + (dimension.height - dimension.margin * 2) + ")");

  const yAxisGroup = graph.append('g');

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end');

  const dottedLines = graph.append('g')
    .style('opacity', 0);

  const xDottedLine = dottedLines.append('line')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', 0);

  const yDottedLine = dottedLines.append('line')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', 0);

  const div = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  graph.selectAll('circle')
    .on('mouseover', (e, d) => {
      d3.select(e.currentTarget)
        .transition().duration(100)
        .attr('r', 10)
        .attr('fill', '#ff0000');

      xDottedLine
        .attr('x1', x(new Date(d.date)))
        .attr('x2', x(new Date(d.date)))
        .attr('y1', dimension.height - dimension.margin * 2)
        .attr('y2', y(d.min));

      yDottedLine
        .attr('x1', 0)
        .attr('x2', x(new Date(d.date)))
        .attr('y1', y(d.min))
        .attr('y2', y(d.min));

      dottedLines.style('opacity', 1);

      div.transition()
        .duration(1000)
        .style('opacity', .9);

      div.html(d.min)
        .style('left', (e.pageX - 14) + 'px')
        .style('top', (e.pageY - 14) + 'px');
    })
    .on('mouseout', (e, d) => {
      d3.select(e.currentTarget)
        .transition().duration(100)
        .attr('r', 4)
        .attr('fill', '#000000');

      dottedLines.style('opacity', 0);

      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
}

drawChart()
