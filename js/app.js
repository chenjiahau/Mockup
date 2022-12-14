const dimension = {
  width: 800,
  height: 800,
  margin: {
    top: 50,
    left: 50
  }
};

const drawChart = async () => {
  const data = await d3.json('data.json');

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimension.width)
    .attr('height', dimension.height);

  // ctr === container
  const ctr = svg.append('g')
    .attr('transform', `translate(${dimension.margin.top}, ${dimension.margin.left})`);

  console.log(ctr);
  ctr
    .selectAll() // 沒有selectAll會append到body外？用select也不行
    .data(data)
    .join('circle')
    .attr('cx', (d) => d.currently.humidity)
    .attr('cy', (d) => d.currently.apparentTemperature)
    .attr('r', 10)
    .attr('fill', '#ff0000')
}

drawChart()